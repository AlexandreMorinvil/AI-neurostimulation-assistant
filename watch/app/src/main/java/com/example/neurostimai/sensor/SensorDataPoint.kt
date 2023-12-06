package com.example.neurostimai.sensor

abstract class SensorDataPoint(
    open val timestamp: Long = System.currentTimeMillis(),
) {
    abstract fun serialize() : String
}

data class AccelerometerDataPoint(
    var accelerationX: Float = 0f,
    var accelerationY: Float = 0f,
    var accelerationZ: Float = 0f,
): SensorDataPoint()
{
    override fun serialize(): String = "<ACCELEROMETER," +
            "$timestamp,$accelerationX,$accelerationY,$accelerationZ" +
            ">"
}

data class GyroscopeDataPoint(
    var rotationX: Float = 0f,
    var rotationY: Float = 0f,
    var rotationZ: Float = 0f,
): SensorDataPoint()
{
    override fun serialize(): String = "<GYROSCOPE," +
            "$timestamp,$rotationX,$rotationY,$rotationZ" +
            ">"
}