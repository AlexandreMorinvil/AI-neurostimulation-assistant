
package com.example.neuraldrive

import android.Manifest
<<<<<<< HEAD
import android.app.Activity
import android.content.ContentValues.TAG
import android.content.Context
import android.content.pm.PackageManager
=======
import android.app.AlarmManager
import android.app.PendingIntent
import android.content.*
import android.content.pm.PackageManager
import android.graphics.Color
>>>>>>> development
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
<<<<<<< HEAD
import android.net.wifi.WifiInfo
import android.net.wifi.WifiManager
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.widget.EditText
import androidx.core.view.isVisible
import com.example.neuraldrive.databinding.ActivityMainBinding
=======
import android.os.Bundle
import android.util.Log
import androidx.annotation.VisibleForTesting
import androidx.core.content.getSystemService
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.lifecycleScope
import androidx.preference.PreferenceManager
import androidx.wear.ambient.AmbientModeSupport
import com.example.neuraldrive.databinding.ActivityMainBinding
import java.net.NetworkInterface
import java.time.Clock
import java.time.Duration
import java.time.Instant
import java.util.*
import kotlin.random.Random
import kotlinx.coroutines.*
>>>>>>> development
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import okio.IOException
<<<<<<< HEAD
import android.text.format.Formatter
import java.net.NetworkInterface


class MainActivity : Activity(), SensorEventListener{



    private lateinit var binding: ActivityMainBinding

    private val client = OkHttpClient()
    private var ipAddressServer: String = "192.168.0.60"
    private var handler: Handler = Handler()
    var runnable: Runnable? = null
    private var delay = 500
    private var stack = "["
    private var index = 0
    //private var stack_int = mutableListOf<Float>()
=======
import io.socket.client.IO;
import io.socket.client.Socket;


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
>>>>>>> development

    private val sensorAccelFeature: String = PackageManager.FEATURE_SENSOR_ACCELEROMETER
    private val sensorGyroFeature: String = PackageManager.FEATURE_SENSOR_GYROSCOPE

    private val doesSensorsExist: Boolean
        get() = packageManager.hasSystemFeature(sensorAccelFeature) and packageManager.hasSystemFeature(sensorGyroFeature)

    private lateinit var sensorManager: SensorManager
    private var accelSensor: Sensor? = null
    private var gyroSensor: Sensor? = null

    private var gyroX: Float = 0.0f; private var gyroY: Float = 0.0f ; private var gyroZ: Float = 0.0f
    private var accelX: Float = 0.0f; private var accelY: Float = 0.0f; private var accelZ: Float = 0.0f

<<<<<<< HEAD


    lateinit var wifiManager: WifiManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val interfaces = NetworkInterface.getNetworkInterfaces()
        val list = interfaces.toList()
        //look into the interface's ipaddresses (ipv4,ipv6)
        val ip = list[1].inetAddresses.toList().get(1).hostAddress

        println(ip)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.enableData.isVisible = true
=======
    private var enableIsChecked: Boolean = false

    private val client = OkHttpClient()
    private var stack = "["
//    private var deviceIpAddress: String = ""
//    private var partialIp: String = ""
    private var serverIpAddress: String = ""
//    private var serverIP : String = ""

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

//        val interfaces = NetworkInterface.getNetworkInterfaces()
//        val list = interfaces.toList()
//        //look into the interface's ipaddresses (ipv4,ipv6)
//        val ip = list[1].inetAddresses.toList().get(1).hostAddress
//        deviceIpAddress = ip as String
//        println(deviceIpAddress)
//        partialIp = deviceIpAddress.substring(0,deviceIpAddress.lastIndexOf(".")+1)
//        println(partialIp)

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
>>>>>>> development

    public override fun onResume() {
        Log.d(TAG, "onResume()")

//        for (i in 0..255) {
//            if (serverIP=="") {
//                serverIpAddress = partialIp + i
//                sendData()
//            }
        Timer().scheduleAtFixedRate( object : TimerTask() {
            override fun run() {
                println("IPAddress::$serverIpAddress")
//                if(serverIP!="") {
//                    serverIpAddress = serverIP
                if(serverIpAddress!=""){
                    println(stack)
                    sendData()
                }
            }
        }, 0, 1000)
        super.onResume()
        val filter = IntentFilter(AMBIENT_UPDATE_ACTION)
        registerReceiver(ambientUpdateBroadcastReceiver, filter)
        refreshDisplayAndSetNextUpdate()

        //        to save Settings IP Address to be reused
        val prefs = PreferenceManager
            .getDefaultSharedPreferences(this)
        serverIpAddress = prefs.getString("ipAddress","").toString()
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

<<<<<<< HEAD
        binding.ipAddress.findViewById<EditText>(R.id.ipAddress)
        binding.connectServer.setOnClickListener{
            ipAddressServer = binding.ipAddress.text.toString()
            //Send something to server to verify connection

        }

        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        binding.enableData.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                binding.enableData.setText(R.string.enable)
                if((sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)  != null)and(sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)  != null)) {
                    accelSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
                    sensorManager.registerListener(this,accelSensor,SensorManager.SENSOR_DELAY_GAME)
                    gyroSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
                    sensorManager.registerListener(this,gyroSensor,SensorManager.SENSOR_DELAY_GAME)
=======
    private fun Instant.getDelayToNextInstantWithInterval(interval: Duration): Duration =
        Duration.ofMillis(interval.toMillis() - toEpochMilli() % interval.toMillis())

    private fun Instant.getNextInstantWithInterval(interval: Duration): Instant =
        plus(getDelayToNextInstantWithInterval(interval))

    private fun loadDataAndUpdateScreen() {
        drawCount += 1

        binding.appName.text = getString(R.string.app_name)
        binding.state.text = getString(
            if (ambientController.isAmbient) {
                R.string.mode_ambient_label
            } else {
                R.string.mode_active_label
            }
        )
        binding.settings.setOnClickListener{
            val intent = Intent(this, SettingsActivity::class.java)
            startActivity(intent)
        }
        binding.enableData.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                binding.enableData.setText(R.string.enable)
                if((sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)  != null)and(sensorManager.getDefaultSensor(
                        Sensor.TYPE_GYROSCOPE)  != null)) {
                    accelSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
                    sensorManager.registerListener(this,accelSensor, SensorManager.SENSOR_DELAY_GAME)
                    gyroSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
                    sensorManager.registerListener(this,gyroSensor, SensorManager.SENSOR_DELAY_GAME)
>>>>>>> development
                }else{
                    //Fail to get
                    Log.d("Fail:", doesSensorsExist.toString())

                }
                enableIsChecked = true
            } else {
                binding.enableData.setText(R.string.disable)
<<<<<<< HEAD
                onPause()
=======
                enableIsChecked = false
                sensorManager.unregisterListener(this)
>>>>>>> development
            }
        }
    }

<<<<<<< HEAD
    companion object {
        val MEDIA_TYPE_MARKDOWN = "text/x-markdown; charset=utf-8".toMediaType()
    }
    fun add_data_to_stack(acc_x : Float, acc_y : Float, acc_z : Float, gir_x : Float, gir_y : Float,gir_z : Float){
        val data = "{"+
                "\"acc_x\"" + ":" + "\""+acc_x.toString() +"\""+ ","+
                "\"acc_y\"" + ":" + "\""+acc_y.toString() +"\""+ ","+
                "\"acc_z\"" + ":" + "\""+acc_z.toString() +"\""+ ","+
                "\"gir_x\"" + ":" + "\""+gir_x.toString() +"\""+ ","+
                "\"gir_y\"" + ":" + "\""+gir_y.toString() +"\""+ ","+
                "\"gir_z\"" + ":" + "\""+gir_z.toString() +"\""+
                "},"
        this.stack += data
    }

    fun sendData(){
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
=======
    override fun getAmbientCallback(): AmbientModeSupport.AmbientCallback = MyAmbientCallback()

    private inner class MyAmbientCallback : AmbientModeSupport.AmbientCallback() {

        private var isLowBitAmbient = false
>>>>>>> development

        private var doBurnInProtection = false

<<<<<<< HEAD
                    for ((name, value) in response.headers) {
                        println("$name: $value")
                    }

                    println(response.body!!.string())
                }
            }
        })
        this.stack = "["
    }

    override fun onResume() {
        super.onResume()
        handler.postDelayed(Runnable {
            handler.postDelayed(runnable!!, delay.toLong())
//            Toast.makeText(this@MainActivity, "This method will run every 5 seconds", Toast.LENGTH_SHORT).show()
            println(this.stack)
            index = 0
            this.sendData()
        }.also { runnable = it }, delay.toLong())
        sensorManager.registerListener(this, accelSensor, SensorManager.SENSOR_DELAY_NORMAL)
        sensorManager.registerListener(this, gyroSensor, SensorManager.SENSOR_DELAY_NORMAL)
    }

    override fun onPause() {
        super.onPause()
        handler.removeCallbacks(runnable!!)
        sensorManager.unregisterListener(this)
=======
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
            binding.state.setTextColor(Color.WHITE)
            binding.settings.setTextColor(Color.WHITE)
            binding.enableData.setTextColor(Color.WHITE)
            if (isLowBitAmbient) {
                binding.appName.paint.isAntiAlias = false
                binding.state.paint.isAntiAlias = false
                binding.settings.paint.isAntiAlias = false
            }
            refreshDisplayAndSetNextUpdate()
        }

        override fun onUpdateAmbient() {
            super.onUpdateAmbient()
            Log.d(TAG, "onUpdateAmbient()")

            if (doBurnInProtection) {
                binding.container.translationX =
                    Random.nextInt(-BURN_IN_OFFSET_PX, BURN_IN_OFFSET_PX + 1).toFloat()
                binding.container.translationY =
                    Random.nextInt(-BURN_IN_OFFSET_PX, BURN_IN_OFFSET_PX + 1).toFloat()
            }
        }

        override fun onExitAmbient() {
            super.onExitAmbient()
            Log.d(TAG, "onExitAmbient()")

            /* Clears out Alarms since they are only used in ambient mode. */
            ambientUpdateAlarmManager.cancel(ambientUpdatePendingIntent)
            binding.appName.setTextColor(Color.GREEN)
            binding.state.setTextColor(Color.GREEN)
            binding.settings.setTextColor(Color.GREEN)
            binding.enableData.setTextColor(Color.GREEN)
            if (isLowBitAmbient) {
                binding.appName.paint.isAntiAlias = true
                binding.state.paint.isAntiAlias = true
                binding.settings.paint.isAntiAlias = true
            }

            /* Reset any random offset applied for burn-in protection. */
            if (doBurnInProtection) {
                binding.container.translationX = 0f
                binding.container.translationY = 0f
            }
            refreshDisplayAndSetNextUpdate()
        }
>>>>>>> development
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event!!.sensor.type == Sensor.TYPE_ACCELEROMETER){
            accelX = event.values[0]
            accelY = event.values[1]
            accelZ = event.values[2]
<<<<<<< HEAD
            //Log.d("Accelerometer:", "$accelX,$accelY,$accelZ")
=======
//            Log.d("Accelerometer:", "$accelX,$accelY,$accelZ")
>>>>>>> development
        }

        if (event.sensor.type == Sensor.TYPE_GYROSCOPE){
            gyroX = event.values[0]
            gyroY = event.values[1]
            gyroZ = event.values[2]
<<<<<<< HEAD
            //Log.d("Gyroscope:", "$gyroX,$gyroY,$gyroZ")
        }
        if(index < 50) {
            add_data_to_stack(accelX, accelY, accelZ, gyroX, gyroY, gyroZ)
            index+=1
        }
=======
//            Log.d("Gyroscope:", "$gyroX,$gyroY,$gyroZ")
        }
        addDataToStack(accelX, accelY, accelZ, gyroX, gyroY, gyroZ)
>>>>>>> development
    }

    override fun onAccuracyChanged(event: Sensor?, p1: Int) = Unit

    companion object {
        val MEDIA_TYPE_MARKDOWN = "text/x-markdown; charset=utf-8".toMediaType()

        private const val TAG = "MainActivity"

        private val ACTIVE_INTERVAL = Duration.ofSeconds(1)

        private val AMBIENT_INTERVAL = Duration.ofSeconds(10)

        const val AMBIENT_UPDATE_ACTION =
            "com.example.android.wearable.wear.alwayson.action.AMBIENT_UPDATE"

        private const val BURN_IN_OFFSET_PX = 10
    }

    private fun addDataToStack(acc_x : Float, acc_y : Float, acc_z : Float, gir_x : Float, gir_y : Float, gir_z : Float){
        val data = "{"+
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
            .url("http://$serverIpAddress:5000/watch_packet/")
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

//                    serverIP = serverIpAddress
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
