package com.example.neurostimai.network

import android.content.Context
import android.net.ConnectivityManager
import android.net.LinkProperties
import android.util.Log

class NetworkManager() {

    init {
        Log.d("Network", "Network Manager initialized")
    }

    fun getIpAddress(context: Context): String {
        val connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE)
        if (connectivityManager is ConnectivityManager) {
            var link: LinkProperties =  connectivityManager.getLinkProperties(connectivityManager.activeNetwork) as LinkProperties
            Log.d("Network", link.linkAddresses.toString())
            return link.linkAddresses[1].toString()
        }
        return "NOTHING"
    }
}