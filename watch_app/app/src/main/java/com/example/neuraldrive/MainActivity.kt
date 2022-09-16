package com.example.neuraldrive

import android.Manifest
import android.app.Activity
import android.content.ContentValues.TAG
import android.content.Context
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isVisible
import androidx.lifecycle.lifecycleScope
import com.example.neuraldrive.databinding.ActivityMainBinding
//import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collect
import android.hardware.Sensor
import android.hardware.SensorManager
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.widget.TextView

/**
 * Activity displaying the app UI. Notably, this binds data from [MainViewModel] to views on screen,
 * and performs the permission check when enabling passive data.
 */
//@AndroidEntryPoint
public class MainActivity : Activity() {

    private lateinit var binding: ActivityMainBinding

    private val lastX = 0f
    private val lastY = 0f
    private val lastZ = 0f
    private var sensorManager: SensorManager? = null
    private var accelerometer: Sensor? = null
    private val deltaXMax = 0f
    private val deltaYMax = 0f
    private val deltaZMax = 0f
    private val deltaX = 0f
    private val deltaY = 0f
    private val deltaZ = 0f
    private var vibrateThreshold = 0f
    private val currentX: TextView? = null
    private val currentY: TextView? = null
    private val currentZ: TextView? = null
    private val maxX: TextView? = null
    private val maxY: TextView? = null
    private val maxZ: TextView? = null

//    private lateinit var permissionLauncher: ActivityResultLauncher<String>

//    private val viewModel: MainViewModel by viewModels()
//    private val mSensorManager: SensorManager

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (checkSelfPermission(Manifest.permission.BODY_SENSORS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.BODY_SENSORS), 1)
        } else {
            Log.d(TAG, "ALREADY GRANTED")
        }

        setContentView(R.layout.activity_main)
        //initializeViews()
//        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager?
//        if (sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER) != null) {
//            // success! we have an accelerometer
//            accelerometer = sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
//            sensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL)
//            vibrateThreshold = accelerometer?.getMaximumRange() / 2
//        } else {
//            // fai! we dont have an accelerometer!
//        }
//        permissionLauncher =
//            registerForActivityResult(ActivityResultContracts.RequestPermission()) { result ->
//                when (result) {
//                    true -> {
//                        Log.i(TAG, "Body sensors permission granted")
//                        viewModel.togglePassiveData(true)
//                    }
//                    false -> {
//                        Log.i(TAG, "Body sensors permission not granted")
//                        viewModel.togglePassiveData(false)
//                    }
//                }
//            }
//
//        binding.enablePassiveData.setOnCheckedChangeListener { _, isChecked ->
//            if (isChecked) {
//                // Make sure we have the necessary permission first.
//                permissionLauncher.launch(android.Manifest.permission.BODY_SENSORS)
//            } else {
//                viewModel.togglePassiveData(false)
//            }
//        }

//        // Bind viewmodel state to the UI.
//        lifecycleScope.launchWhenStarted {
//            viewModel.uiState.collect {
//                updateViewVisiblity(it)
//            }
//        }
//        lifecycleScope.launchWhenStarted {
//            viewModel.latestSpeedRate.collect {
//                binding.lastMeasuredValue.text = it.toString()
//            }
//        }
//        lifecycleScope.launchWhenStarted {
//            viewModel.passiveDataEnabled.collect {
//                binding.enablePassiveData.isChecked = it
//            }
//        }
    }

//    //onResume() register the accelerometer for listening the events
//    protected override fun onResume() {
//        super.onResume()
//        sensorManager.registerListener(this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL)
//    }
//
//    //onPause() unregister the accelerometer for stop listening the events
//    protected override fun onPause() {
//        super.onPause()
//        sensorManager.unregisterListener(this)
//    }
//
//    fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
//    fun onSensorChanged(event: SensorEvent) {
//
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

//    private fun updateViewVisiblity(uiState: UiState) {
//        (uiState is UiState.Startup).let {
//            binding.progress.isVisible = it
//        }
//        // These views are visible when heart rate capability is not available.
//        (uiState is UiState.SpeedRateNotAvailable).let {
//            binding.broken.isVisible = it
//            binding.notAvailable.isVisible = it
//        }
//        // These views are visible when the capability is available.
//        (uiState is UiState.SpeedRateAvailable).let {
//            binding.enablePassiveData.isVisible = it
//            binding.lastMeasuredLabel.isVisible = it
//            binding.lastMeasuredValue.isVisible = it
//            binding.check.isVisible = it
//        }
//    }
}