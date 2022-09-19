package com.example.neuraldrive

import android.hardware.Sensor
import android.hardware.SensorManager
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import javax.inject.Inject

/**
 * Holds most of the interaction logic and UI state for the app.
 */
@HiltViewModel
class MainViewModel @Inject constructor(
//    private val healthServicesManager: HealthServicesManager
): ViewModel() {

    private val _uiState = MutableStateFlow<UiState>(UiState.Startup)
    val uiState: StateFlow<UiState> = _uiState

    init {
        // Check that the device has the sensors capability and progress to the next state
        // accordingly.
        viewModelScope.launch {
            _uiState.value = if (Sensor.TYPE_ACCELEROMETER != null) {
                UiState.SensorsAvailable
            } else {
                UiState.SensorsNotAvailable
            }
        }
    }
}

sealed class UiState {
    object Startup: UiState()
    object SensorsAvailable: UiState()
    object SensorsNotAvailable: UiState()
}