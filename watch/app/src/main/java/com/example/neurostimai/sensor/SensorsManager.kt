package com.example.neurostimai.sensor

import android.content.Context

class SensorsManager(
    context: Context,
    transferPointFunction: (SensorDataPoint) -> Unit = { }
) {

    private var transferPoint: (SensorDataPoint) -> Unit = transferPointFunction

    private val linearAccelerationSensor: LinearAccelerationSensor =
        LinearAccelerationSensor(context)

    private val gyroscopeSensor: GyroscopeSensor =
        GyroscopeSensor(context)

    init {
        linearAccelerationSensor.setOnSensorValuesChangedListener { values ->
            transferPoint(
                AccelerometerDataPoint(
                    accelerationX = values[0],
                    accelerationY = values[1],
                    accelerationZ = values[2],
                )
            )
        }

        gyroscopeSensor.setOnSensorValuesChangedListener { values ->
            transferPoint(
                GyroscopeDataPoint(
                    rotationX = values[0],
                    rotationY = values[1],
                    rotationZ = values[2],
                )
            )
        }
    }

    fun setTransferPointFunction(transferPointFunction: (SensorDataPoint) -> Unit = { }) {
        transferPoint = transferPointFunction
    }

    fun startListening() {
        linearAccelerationSensor.startListening()
        gyroscopeSensor.startListening()
    }

    fun stopListening() {
        linearAccelerationSensor.stopListening()
        gyroscopeSensor.stopListening()
    }
}