/* While this template provides a good starting point for using Wear Compose, you can always
 * take a look at https://github.com/android/wear-os-samples/tree/main/ComposeStarter and
 * https://github.com/android/wear-os-samples/tree/main/ComposeAdvanced to find the most up to date
 * changes to the libraries and their usages.
 */

package com.example.neurostimai.presentation

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Devices
import androidx.compose.ui.tooling.preview.Preview
import androidx.wear.compose.material.Button
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Text
import com.example.neurostimai.R
import com.example.neurostimai.network.ConnectivityObserver
import com.example.neurostimai.network.NetworkConnectivityObserver
import com.example.neurostimai.network.NetworkManager
import com.example.neurostimai.presentation.theme.NeurostimAITheme
import com.example.neurostimai.service.SensorDataService

class MainActivity : ComponentActivity() {

    private lateinit var connectivityObserver: ConnectivityObserver


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Network observer
        connectivityObserver = NetworkConnectivityObserver(applicationContext)

        // Socket management
        val networkManager: NetworkManager = NetworkManager()

        val ipAddress = networkManager.getIpAddress(this)

        // Setting the content
        setContent {
            NeurostimAITheme {
                val status by connectivityObserver.observe().collectAsState(
                    initial = ConnectivityObserver.Status.Unavailable
                )
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(MaterialTheme.colors.background),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {

                    // Connectivity Status
                    Text(
                        text="Network: $status",
                        color = MaterialTheme.colors.secondary,
                    )

                    // Ip address
                    IpDisplay(ipAddress)

                    // Button 1
                    Button(onClick = {
                        Intent(applicationContext, SensorDataService::class.java).also {
                            it.action = SensorDataService.Actions.START_SERVICE.toString()
                            startService(it)
                        }
                    }) {
                        Text(
                            text = "Start transfer"
                        )
                    }

                    // Button 2
                    Button(onClick = {
                        Intent(applicationContext, SensorDataService::class.java).also {
                            it.action = SensorDataService.Actions.STOP_SERVICE.toString()
                            startService(it)
                        }
                    }) {
                        Text(text = "Stop transfer")
                    }

                }
            }
        }
    }
}

@Composable
fun WearApp(ipAddress: String) {
    NeurostimAITheme {
        /* If you have enough items in your list, use [ScalingLazyColumn] which is an optimized
         * version of LazyColumn for wear devices with some added features. For more information,
         * see d.android.com/wear/compose.
         */
        Column(
            modifier = Modifier
                .fillMaxSize()
                .background(MaterialTheme.colors.background),
            verticalArrangement = Arrangement.Center
        ) {
            IpDisplay(ipAddress = ipAddress)
        }
    }
}

@Composable
fun IpDisplay(ipAddress: String) {
    Text(
        modifier = Modifier.fillMaxWidth(),
        textAlign = TextAlign.Center,
        color = MaterialTheme.colors.primary,
        text = stringResource(R.string.ip_address, ipAddress)
    )
}

@Preview(device = Devices.WEAR_OS_SMALL_ROUND, showSystemUi = true)
@Composable
fun DefaultPreview() {
    WearApp("Preview Android")
}