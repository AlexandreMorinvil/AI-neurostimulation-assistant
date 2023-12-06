package com.example.neurostimai.communications

import android.util.Log
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.net.InetAddress
import java.net.ServerSocket
import java.net.Socket

class SocketServer(coroutineScope: CoroutineScope) {

    // Coroutine
    private val corountineScope: CoroutineScope = coroutineScope

    // TCP Socket server
    private val port: Int = 9000
    private val serverSocket: ServerSocket = ServerSocket(port)
    private var acceptsConnection: Boolean = true

    // TCP socket connected client
    private var socketConnection: SocketConnection? = null

    private fun getLocalSocketAddress(): InetAddress? {
        return serverSocket.inetAddress
    }

    fun broadcastData(data: String) {
        if (socketConnection != null) {
            corountineScope.launch {
                socketConnection?.sendData(data)
            }
        }
    }

    suspend fun acceptConnection(
        onConnection: (socket:Socket) -> Unit = { },
        onDisconnection: () -> Unit = { }
    ) {
        acceptsConnection = true
        return withContext(Dispatchers.IO) {
            Log.i("SocketServer",
                "Waiting for TCP socket connection to ${getLocalSocketAddress()}"
            )

            while (acceptsConnection) {
                try {
                    val socket: Socket = serverSocket.accept()
                    socketConnection = SocketConnection(socket)

                    Log.i("SocketServer", "Socket ${socket.inetAddress} connected!")
                    onConnection(socket)
                }
                catch (e:Exception) {
                    Log.i("SocketServer", e.printStackTrace().toString())
                }
            }
            closeSocket()

            Log.i("SocketServer",
                "No longer waiting for TCP socket connections")
            onDisconnection()
        }
    }

    fun close() {
        acceptsConnection = false
        closeSocket()
        serverSocket.close()
    }

    private fun closeSocket() {
        socketConnection?.close()
        socketConnection = null
    }
}