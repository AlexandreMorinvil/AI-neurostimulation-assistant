package com.example.neurostimai.communications

import android.util.Log
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.InputStream
import java.io.OutputStream
import java.net.Socket

class SocketConnection(socket: Socket) {

    private val socket: Socket = socket
    private val outputStream: OutputStream = socket.getOutputStream()

    fun close() {
        socket.close()
    }

    suspend fun sendData(data: String) {
        return withContext(Dispatchers.IO) {
            try {
                outputStream.write(data.toByteArray())
                outputStream.flush()
            } catch(e:Exception) {
                Log.e("tcpSocket", e.printStackTrace().toString())
                socket.close()
            }
        }
    }
}