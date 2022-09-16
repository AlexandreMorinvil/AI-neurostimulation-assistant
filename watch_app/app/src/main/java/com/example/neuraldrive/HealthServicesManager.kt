//package com.example.neuraldrive
//
//import android.content.ComponentName
//import android.content.Context
//import android.util.Log
//import androidx.concurrent.futures.await
//import androidx.health.services.client.HealthServicesClient
//import androidx.health.services.client.data.DataType
//import androidx.health.services.client.data.PassiveMonitoringConfig
//import dagger.hilt.android.qualifiers.ApplicationContext
//import javax.inject.Inject
//
///**
// * Entry point for [HealthServicesClient] APIs. This also provides suspend functions around
// * those APIs to enable use in coroutines.
// */
//class HealthServicesManager @Inject constructor(
//    @ApplicationContext private val context: Context,
//    healthServicesClient: HealthServicesClient
//) {
//    private val passiveMonitoringClient = healthServicesClient.passiveMonitoringClient
//    /* To be confirmed for the datatype*/
//    private val dataTypes = setOf(DataType.HEART_RATE_BPM)
//
//    suspend fun hasSpeedRateCapability(): Boolean {
//        val capabilities = passiveMonitoringClient.capabilities.await()
//        return (DataType.HEART_RATE_BPM in capabilities.supportedDataTypesPassiveMonitoring)
//    }
//
//    suspend fun registerForSpeedRateData() {
//        Log.i(TAG, "Registering for background data.")
//        val componentName = ComponentName(context, PassiveDataReceiver::class.java)
//        val config = PassiveMonitoringConfig.builder()
//            .setDataTypes(dataTypes)
//            .setComponentName(componentName)
//            .build()
//        passiveMonitoringClient.registerDataCallback(config).await()
//    }
//
//    suspend fun unregisterForSpeedRateData() {
//        Log.i(TAG, "Unregistering for background data.")
//        passiveMonitoringClient.unregisterDataCallback().await()
//    }
//}