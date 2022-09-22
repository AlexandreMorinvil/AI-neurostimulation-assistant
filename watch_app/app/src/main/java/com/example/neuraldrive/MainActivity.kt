package com.example.neuraldrive

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.ContentValues.TAG
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import androidx.core.view.isVisible
import com.example.neuraldrive.databinding.ActivityMainBinding
import android.hardware.Sensor
import android.hardware.SensorManager
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import okhttp3.*
import okio.IOException


class MainActivity : Activity(), SensorEventListener {

    private lateinit var binding: ActivityMainBinding

    private val client = OkHttpClient()

    private val sensorFeature: String = PackageManager.FEATURE_SENSOR_ACCELEROMETER // PackageManager.FEATURE_SENSOR_GYROSCOPE
    private val sensorType: Int = Sensor.TYPE_ACCELEROMETER // Sensor.TYPE_GYROSCOPE

    private val doesSensorExist: Boolean
        get() = packageManager.hasSystemFeature(sensorFeature)

    protected var onSensorValuesChanged: ((List<Float>) -> Unit)? = null

    private lateinit var sensorManager: SensorManager
    private var sensor: Sensor? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.enableData.isVisible = true
        Log.d("alllllooooooooo", doesSensorExist.toString())

        //http request+++++++++++++++++++++++++++++++++++++++
        val request = Request.Builder()
            .url("http://10.0.2.2:5000/packet/")
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
        //http request+++++++++++++++++++++++++++++++++++++++

        if (checkSelfPermission(Manifest.permission.BODY_SENSORS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.BODY_SENSORS), 1)
        } else {
            Log.d(TAG, "ALREADY GRANTED")
        }

        binding.enableData.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                startListening()
            } else {
                stopListening()
            }
        }
    }

    private fun startListening() {
        if(!doesSensorExist) {
            return
        }
        if(!::sensorManager.isInitialized && sensor == null) {
            sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
            sensor = sensorManager.getDefaultSensor(sensorType)
//            val accelerometerSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
//            Log.d("Accelerometer:", accelerometerSensor.toString())
            Log.d("Sensors:", sensor.toString())
        }
        sensor?.let {
            sensorManager.registerListener(this, it, SensorManager.SENSOR_DELAY_NORMAL)
        }
    }

    private fun stopListening() {
        if(!doesSensorExist || !::sensorManager.isInitialized) {
            return
        }
        sensorManager.unregisterListener(this)
    }

//    fun setOnSensorValuesChangedListener(listener: (List<Float>) -> Unit) {
//        onSensorValuesChanged = listener
//    }

    override fun onSensorChanged(p0: SensorEvent?) {
        if(!doesSensorExist) {
            return
        }
        if(p0?.sensor?.type == sensorType) {
            onSensorValuesChanged?.invoke(p0.values.toList())
        }
    }

    override fun onAccuracyChanged(p0: Sensor?, p1: Int) = Unit
}

//    fun onSensorChanged(event: SensorEvent) {
//        // clean current values
//        displayCleanValues()
//        // display the current x,y,z accelerometer values
//        displayCurrentValues()
//        // display the max x,y,z accelerometer values
//        displayMaxValues()
//
//        // get the change of the x,y,z values of the accelerometer
//        deltaX = Math.abs(lastX - event.values.get(0))
//        deltaY = Math.abs(lastY - event.values.get(1))
//        deltaZ = Math.abs(lastZ - event.values.get(2))
//        // if the change is below 2, it is just plain noise
//        if (deltaX < 2) deltaX = 0
//        if (deltaY < 2) deltaY = 0
//        if (deltaZ)
//        vibrateThreshold
//        deltaY > vibrateThreshold || deltaZ > vibrateThreshold
//        run { v.vibrate(50) }
//    }
//
//    fun displayCleanValues() {
//        currentX.setText("0.0")
//        currentY.setText("0.0")
//        currentZ.setText("0.0")
//    }
//
//    // display the current x,y,z accelerometer values
//    fun displayCurrentValues() {
//        currentX.setText(java.lang.Float.toString(deltaX))
//        currentY.setText(java.lang.Float.toString(deltaY))
//        currentZ.setText(java.lang.Float.toString(deltaZ))
//    }
//
//    // display the max x,y,z accelerometer values
//    fun displayMaxValues() {
//        if (deltaX > deltaXMax) {
//            deltaXMax = deltaX
//            maxX.setText(java.lang.Float.toString(deltaXMax))
//        }
//        if (deltaY > deltaYMax) {
//            deltaYMax = deltaY
//            maxY.setText(java.lang.Float.toString(deltaYMax))
//        }
//        if (deltaZ > deltaZMax) {
//            deltaZMax = deltaZ
//            maxZ.setText(java.lang.Float.toString(deltaZMax))
//        }
//    }

//        if (sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER) != null) {
//            // success! we have an accelerometer
//            accelerometer = sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
//            sensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL)
//            vibrateThreshold = accelerometer?.getMaximumRange() / 2
//        } else {
//            // fai! we dont have an accelerometer!
//        }

//    private val lastY = 0f
//    private val lastZ = 0f
//    private var accelerometer: Sensor? = null
//    private val deltaXMax = 0f
//    private val deltaYMax = 0f
//    private val deltaZMax = 0f
//    private val deltaX = 0f
//    private val deltaY = 0f
//    private val deltaZ = 0f
//    private var vibrateThreshold = 0f
//    private val currentX: TextView? = null
//    private val currentY: TextView? = null
//    private val currentZ: TextView? = null
//    private val maxX: TextView? = null
//    private val maxY: TextView? = null
//    private val maxZ: TextView? = null