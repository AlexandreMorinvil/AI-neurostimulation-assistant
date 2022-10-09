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
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothServerSocket;
import android.bluetooth.BluetoothSocket;
import android.content.Intent
import android.view.View
import android.widget.EditText


class MainActivity : Activity(), SensorEventListener{

    private lateinit var binding: ActivityMainBinding

//    private val client = OkHttpClient()

    lateinit var bluetoothAdapter: BluetoothAdapter

    private val sensorAccelFeature: String = PackageManager.FEATURE_SENSOR_ACCELEROMETER
    private val sensorGyroFeature: String = PackageManager.FEATURE_SENSOR_GYROSCOPE

    private val doesSensorsExist: Boolean
        get() = packageManager.hasSystemFeature(sensorAccelFeature) and packageManager.hasSystemFeature(sensorGyroFeature)

    private lateinit var sensorManager: SensorManager
    private var accelSensor: Sensor? = null
    private var gyroSensor: Sensor? = null

    private var gyroX: Float = 0.0f; private var gyroY: Float = 0.0f ; private var gyroZ: Float = 0.0f
    private var accelX: Float = 0.0f; private var accelY: Float = 0.0f; private var accelZ: Float = 0.0f

//    private var ipAddress:String = null.toString()


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.enableData.isVisible = true
        Log.d("alllllooooooooo", doesSensorsExist.toString())

        //init bluetooth adapter
        bluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
//        Log.d("osooksowksokwsow:",bluetoothAdapter.isEnabled.toString())

        if(bluetoothAdapter.isEnabled){
            //bluetooth is on
            binding.bluetoothIv.setImageResource(R.drawable.ic_bluetooth_on)
        }else{
            //bluetooth is off
            binding.bluetoothIv.setImageResource(R.drawable.ic_bluetooth_off)
        }

        // turn on/off bluetooth
        binding.bluetoothIv.setOnClickListener{
            if(bluetoothAdapter.isEnabled){
                bluetoothAdapter.disable()
                binding.bluetoothIv.setImageResource(R.drawable.ic_bluetooth_off)
//                bluetoothAdapter.cancelDiscovery()
                Log.d("osooksowksokwsow:",bluetoothAdapter.isEnabled.toString())
            }else{
                var enable = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
                startActivityForResult(enable,1)
//                var discoverable =Intent(BluetoothAdapter.ACTION_REQUEST_DISCOVERABLE)
//                startActivityForResult(enable,2)
                Log.d("osooksowksokwsow:",bluetoothAdapter.isEnabled.toString())
            }
        }

        binding.ipAddress.findViewById<EditText>(R.id.ipAddress)
        val addressIP = binding.ipAddress.text.toString()
        binding.connectServer.setOnClickListener{

        }
//        //http request+++++++++++++++++++++++++++++++++++++++
//        val request = Request.Builder()
//            .url("http://10.0.2.2:5000/packet/")
//            .build()
//        client.newCall(request).enqueue(object : Callback {
//            override fun onFailure(call: Call, e: IOException) {
//                e.printStackTrace()
//            }
//
//            override fun onResponse(call: Call, response: Response) {
//                response.use {
//                    if (!response.isSuccessful) throw IOException("Unexpected code $response")
//
//                    for ((name, value) in response.headers) {
//                        println("$name: $value")
//                    }
//
//                    println(response.body!!.string())
//                }
//            }
//        })
//        //http request+++++++++++++++++++++++++++++++++++++++

        if (checkSelfPermission(Manifest.permission.BODY_SENSORS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.BODY_SENSORS), 1)
        } else {
            Log.d(TAG, "ALREADY GRANTED")
        }

        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager

        binding.enableData.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                if((sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)  != null)and(sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)  != null)) {
                    accelSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
                    sensorManager.registerListener(this,accelSensor,SensorManager.SENSOR_DELAY_FASTEST)
                    gyroSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
                    sensorManager.registerListener(this,gyroSensor,SensorManager.SENSOR_DELAY_FASTEST)
                }else{
                    //Fail to get
                    Log.d("Fail:", doesSensorsExist.toString())
                }
                onResume()
            } else {
                onPause()
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        when(requestCode){
            1->
                if(requestCode == Activity.RESULT_OK){
                    binding.bluetoothIv.setImageResource(R.drawable.ic_bluetooth_on)
                }
        }
        super.onActivityResult(requestCode, resultCode, data)
    }

    override fun onResume() {
        super.onResume()
        sensorManager.registerListener(this, accelSensor, SensorManager.SENSOR_DELAY_NORMAL)
        sensorManager.registerListener(this, gyroSensor, SensorManager.SENSOR_DELAY_NORMAL)
    }

    override fun onPause() {
        super.onPause()
        sensorManager.unregisterListener(this)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event!!.sensor.type == Sensor.TYPE_ACCELEROMETER){
            accelX = event.values[0]
            accelY = event.values[1]
            accelZ = event.values[2]
            Log.d("Accelerometer:", "$accelX,$accelY,$accelZ")
        }

        if (event.sensor.type == Sensor.TYPE_GYROSCOPE){
            gyroX = event.values[0]
            gyroY = event.values[1]
            gyroZ = event.values[2]
            Log.d("Gyroscope:", "$gyroX,$gyroY,$gyroZ")
        }
    }

    override fun onAccuracyChanged(event: Sensor?, p1: Int) = Unit
}