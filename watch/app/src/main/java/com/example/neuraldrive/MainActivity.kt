
package com.example.neuraldrive

import android.Manifest
import android.annotation.SuppressLint
import android.app.AlarmManager
import android.app.PendingIntent
import android.content.*
import android.content.pm.PackageManager
import android.graphics.Color
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.annotation.VisibleForTesting
import androidx.core.content.getSystemService
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.lifecycleScope
import androidx.wear.ambient.AmbientModeSupport
import com.example.neuraldrive.databinding.ActivityMainBinding
import java.text.SimpleDateFormat
import java.time.Clock
import java.time.Duration
import java.time.Instant
import java.util.*
import kotlinx.coroutines.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import okio.IOException


class MainActivity : FragmentActivity(), AmbientModeSupport.AmbientCallbackProvider,
    SensorEventListener {

    private lateinit var binding: ActivityMainBinding

    private lateinit var ambientController: AmbientModeSupport.AmbientController

    private lateinit var ambientUpdateAlarmManager: AlarmManager
    private lateinit var ambientUpdatePendingIntent: PendingIntent
    private lateinit var ambientUpdateBroadcastReceiver: BroadcastReceiver

    @Volatile
    private var drawCount = 0

    private var activeUpdateJob: Job = Job().apply { complete() }

    private val sensorAccelFeature: String = PackageManager.FEATURE_SENSOR_ACCELEROMETER
    private val sensorGyroFeature: String = PackageManager.FEATURE_SENSOR_GYROSCOPE

    private val doesSensorsExist: Boolean
        get() = packageManager.hasSystemFeature(sensorAccelFeature) and packageManager.hasSystemFeature(sensorGyroFeature)

    private lateinit var sensorManager: SensorManager
    private var accelSensor: Sensor? = null
    private var gyroSensor: Sensor? = null

    private var gyroX: Float = 0.0f; private var gyroY: Float = 0.0f ; private var gyroZ: Float = 0.0f
    private var accelX: Float = 0.0f; private var accelY: Float = 0.0f; private var accelZ: Float = 0.0f

    private val client = OkHttpClient()
    private var stack = "["
    private var ipAddressServer: String = "0.0.0.0"


    public override fun onCreate(savedInstanceState: Bundle?) {
        Log.d(TAG, "onCreate()")

        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (checkSelfPermission(Manifest.permission.BODY_SENSORS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.BODY_SENSORS), 1)
        } else {
            Log.d(ContentValues.TAG, "ALREADY GRANTED")
        }

        loadData()

        ambientController = AmbientModeSupport.attach(this)
        ambientUpdateAlarmManager = getSystemService()!!

        val ambientUpdateIntent = Intent(AMBIENT_UPDATE_ACTION)

        ambientUpdatePendingIntent = PendingIntent.getBroadcast(
            this,
            0,
            ambientUpdateIntent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        ambientUpdateBroadcastReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                refreshDisplayAndSetNextUpdate()
            }
        }
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
    }

    private fun saveData(){
        binding.currentIP.text = ipAddressServer
        val sharedPreferences: SharedPreferences = getSharedPreferences("sharedPref", Context.MODE_PRIVATE)
        val editor: SharedPreferences.Editor = sharedPreferences.edit()
        editor.apply{
            putString("String_IP", ipAddressServer)
        }.apply()
        Toast.makeText(this, "Data Saved", Toast.LENGTH_SHORT).show()
    }

    private fun loadData(){
        val sharedPreferences: SharedPreferences = getSharedPreferences("sharedPref", Context.MODE_PRIVATE)
        val savedIP: String? = sharedPreferences.getString("String_IP", null)
        binding.currentIP.text = savedIP
        ipAddressServer = savedIP.toString()
    }

    public override fun onStop() {
        super.onStop()
        sensorManager.unregisterListener(this)
    }

    public override fun onResume() {
        Log.d(TAG, "onResume()")
        super.onResume()
        if((sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)  != null)and(sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)  != null)) {
            accelSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
            sensorManager.registerListener(this,accelSensor, SensorManager.SENSOR_DELAY_GAME)
            gyroSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
            sensorManager.registerListener(this,gyroSensor, SensorManager.SENSOR_DELAY_GAME)
        }else{
            //Fail to get
            Log.d("Fail:", doesSensorsExist.toString())
        }
        Timer().scheduleAtFixedRate( object : TimerTask() {
            override fun run() {
                println("IPAddress::$ipAddressServer")
                if(ipAddressServer!="") {
                    println(stack)
                    sendData()
                }
            }
        }, 0, 500)
        val filter = IntentFilter(AMBIENT_UPDATE_ACTION)
        registerReceiver(ambientUpdateBroadcastReceiver, filter)
        refreshDisplayAndSetNextUpdate()
    }

    public override fun onPause() {
        Log.d(TAG, "onPause()")
        super.onPause()
        unregisterReceiver(ambientUpdateBroadcastReceiver)
        activeUpdateJob.cancel()
        ambientUpdateAlarmManager.cancel(ambientUpdatePendingIntent)
    }

    private fun refreshDisplayAndSetNextUpdate() {
        loadDataAndUpdateScreen()
        val instant = Instant.now(clock)
        if (ambientController.isAmbient) {
            val triggerTime = instant.getNextInstantWithInterval(AMBIENT_INTERVAL)
            ambientUpdateAlarmManager.setExact(
                AlarmManager.RTC_WAKEUP,
                triggerTime.toEpochMilli(),
                ambientUpdatePendingIntent
            )
        } else {
            val delay = instant.getDelayToNextInstantWithInterval(ACTIVE_INTERVAL)
            activeUpdateJob.cancel()
            activeUpdateJob = lifecycleScope.launch {
                withContext(activeDispatcher) {
                    // Delay on the active dispatcher for testability
                    delay(delay.toMillis())
                }
                refreshDisplayAndSetNextUpdate()
            }
        }
    }

    private fun Instant.getDelayToNextInstantWithInterval(interval: Duration): Duration =
        Duration.ofMillis(interval.toMillis() - toEpochMilli() % interval.toMillis())

    private fun Instant.getNextInstantWithInterval(interval: Duration): Instant =
        plus(getDelayToNextInstantWithInterval(interval))

    private fun loadDataAndUpdateScreen() {
        drawCount += 1

        binding.appName.text = getString(R.string.app_name)

        val ipPart1 = binding.ip1.text
        val ipPart2 = binding.ip2.text
        val ipPart3 = binding.ip3.text
        val ipPart4 = binding.ip4.text

        binding.setIP.setOnClickListener{
            ipAddressServer = "$ipPart1.$ipPart2.$ipPart3.$ipPart4"
            println(ipAddressServer)
            saveData()
        }
    }

    override fun getAmbientCallback(): AmbientModeSupport.AmbientCallback = MyAmbientCallback()

    private inner class MyAmbientCallback : AmbientModeSupport.AmbientCallback() {
        private var isLowBitAmbient = false
        private var doBurnInProtection = false

        override fun onEnterAmbient(ambientDetails: Bundle) {
            super.onEnterAmbient(ambientDetails)
            Log.d(TAG, "onEnterAmbient()")

            isLowBitAmbient =
                ambientDetails.getBoolean(AmbientModeSupport.EXTRA_LOWBIT_AMBIENT, false)
            doBurnInProtection =
                ambientDetails.getBoolean(AmbientModeSupport.EXTRA_BURN_IN_PROTECTION, false)

            // Cancel any active updates
            activeUpdateJob.cancel()

            binding.appName.setTextColor(Color.WHITE)
            binding.setIP.setTextColor(Color.WHITE)
            binding.current.setTextColor(Color.WHITE)
            if (isLowBitAmbient) {
                binding.appName.paint.isAntiAlias = false
                binding.setIP.paint.isAntiAlias = false
            }
            refreshDisplayAndSetNextUpdate()
        }

        override fun onUpdateAmbient() {
            super.onUpdateAmbient()
            Log.d(TAG, "onUpdateAmbient()")
        }

        override fun onExitAmbient() {
            super.onExitAmbient()
            Log.d(TAG, "onExitAmbient()")

            /* Clears out Alarms since they are only used in ambient mode. */
            ambientUpdateAlarmManager.cancel(ambientUpdatePendingIntent)
            binding.appName.setTextColor(Color.CYAN)
            binding.setIP.setTextColor(Color.CYAN)
            binding.current.setTextColor(Color.CYAN)
            if (isLowBitAmbient) {
                binding.appName.paint.isAntiAlias = true
                binding.setIP.paint.isAntiAlias = true
            }

            refreshDisplayAndSetNextUpdate()
        }
    }

    @SuppressLint("SimpleDateFormat")
    override fun onSensorChanged(event: SensorEvent?) {
        if (event!!.sensor.type == Sensor.TYPE_ACCELEROMETER){
            accelX = event.values[0]
            accelY = event.values[1]
            accelZ = event.values[2]
//            Log.d("Accelerometer:", "$accelX,$accelY,$accelZ")
        }

        if (event.sensor.type == Sensor.TYPE_GYROSCOPE){
            gyroX = event.values[0]
            gyroY = event.values[1]
            gyroZ = event.values[2]
//            Log.d("Gyroscope:", "$gyroX,$gyroY,$gyroZ")
        }
        val sdf = SimpleDateFormat("dd/M/yyyy hh:mm:ss")
        val currentTime = sdf.format(Date())

        addDataToStack(currentTime ,accelX, accelY, accelZ, gyroX, gyroY, gyroZ)
    }

    override fun onAccuracyChanged(event: Sensor?, p1: Int) = Unit

    companion object {
        val MEDIA_TYPE_MARKDOWN = "text/x-markdown; charset=utf-8".toMediaType()

        private const val TAG = "MainActivity"

        private val ACTIVE_INTERVAL = Duration.ofSeconds(1)

        private val AMBIENT_INTERVAL = Duration.ofSeconds(10)

        const val AMBIENT_UPDATE_ACTION =
            "com.example.neuraldrive.action.AMBIENT_UPDATE"
    }

    private fun addDataToStack(currentTime : String, acc_x : Float, acc_y : Float, acc_z : Float, gir_x : Float, gir_y : Float, gir_z : Float){
        val data = "{"+
            "\"time\"" + ":" + "\""+currentTime +"\""+ ","+
            "\"acc_x\"" + ":" + "\""+acc_x.toString() +"\""+ ","+
            "\"acc_y\"" + ":" + "\""+acc_y.toString() +"\""+ ","+
            "\"acc_z\"" + ":" + "\""+acc_z.toString() +"\""+ ","+
            "\"gir_x\"" + ":" + "\""+gir_x.toString() +"\""+ ","+
            "\"gir_y\"" + ":" + "\""+gir_y.toString() +"\""+ ","+
            "\"gir_z\"" + ":" + "\""+gir_z.toString() +"\""+
            "},"
        this.stack += data
    }

    private fun sendData(){
        this.stack = this.stack.dropLast(1)
        this.stack += "]"
        val postBody = this.stack.trimMargin()

        val request = Request.Builder()
            .url("http://$ipAddressServer:5000/watch_packet/")
            .post(postBody.toRequestBody(MEDIA_TYPE_MARKDOWN))
            .build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                e.printStackTrace()
            }

            override fun onResponse(call: Call, response: Response) {
                response.use {
                    if (!response.isSuccessful) throw IOException("Unexpected code $response")

                    for ((name, value) in response.headers) {
                        println("$name: $value")
                    }

                    println(response.body!!.string())
                }
            }
        })
        this.stack = "["
    }
}

/**
 * The [Clock] driving the time information. Overridable only for testing.
 */
@VisibleForTesting(otherwise = VisibleForTesting.PRIVATE)
internal var clock: Clock = Clock.systemDefaultZone()

/**
 * The dispatcher used for delaying in active mode. Overridable only for testing.
 */
@VisibleForTesting(otherwise = VisibleForTesting.PRIVATE)
internal var activeDispatcher: CoroutineDispatcher = Dispatchers.Main.immediate
