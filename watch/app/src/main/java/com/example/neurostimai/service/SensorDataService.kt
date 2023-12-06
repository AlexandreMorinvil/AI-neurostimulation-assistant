package com.example.neurostimai.service

import android.R
import android.app.Notification
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.widget.Toast
import androidx.core.app.NotificationCompat
import com.example.neurostimai.communications.SocketServer
import com.example.neurostimai.sensor.SensorsManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

class SensorDataService : Service() {

    // Coroutine scope
    private val job = SupervisorJob()
    private val scope = CoroutineScope(Dispatchers.IO + job)

    // Notification
    private val notificationId: Int = 1
    private val title: CharSequence = "Sensor data transfer"

    // Managers
    private val sensorsManager: SensorsManager = SensorsManager(this)
    private val socketServer: SocketServer = SocketServer(scope)

    override fun onCreate() {
        super.onCreate()

        // Link the TCP socket server to the sensors
        sensorsManager.setTransferPointFunction { sensorDataPoint ->
            socketServer.broadcastData(sensorDataPoint.serialize())
        }
    }

    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    override fun onDestroy() {
        super.onDestroy()
        job.cancel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when(intent?.action) {
            Actions.START_SERVICE.toString() -> startService()
            Actions.STOP_SERVICE.toString() -> stopService()
        }
        return super.onStartCommand(intent, flags, startId)
    }

    private fun buildNotification(notificationMessage: String): Notification {
        return NotificationCompat.Builder(this, "sensor_data_transfer_channel")
            .setSmallIcon(R.mipmap.sym_def_app_icon)
            .setContentTitle(title)
            .setContentText(notificationMessage)
            .build()
    }

    private fun updateNotification(notificationMessage: String) {
        val notification: Notification = buildNotification(notificationMessage)
        val mNotificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
        mNotificationManager.notify(notificationId, notification)
    }

    private fun startService() {
        sensorsManager.startListening()
        scope.launch {
            socketServer.acceptConnection()
        }

        val notification = buildNotification("Sensor data is being transferred")
        startForeground(1, notification)
        Toast.makeText(this, "Sensor data transfer started", Toast.LENGTH_SHORT).show()
    }

    private fun stopService() {
        sensorsManager.stopListening()
        socketServer.close()
        stopSelf()

        Toast.makeText(this, "Sensor data transfer stopped", Toast.LENGTH_SHORT).show()
    }

    enum class Actions {
        START_SERVICE, STOP_SERVICE
    }
}