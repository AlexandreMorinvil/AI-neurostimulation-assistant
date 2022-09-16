//
//package com.example.neuraldrive
//
//import androidx.lifecycle.ViewModel
//import androidx.lifecycle.viewModelScope
//import dagger.hilt.android.lifecycle.HiltViewModel
//import kotlinx.coroutines.flow.Flow
//import kotlinx.coroutines.flow.MutableStateFlow
//import kotlinx.coroutines.flow.StateFlow
//import kotlinx.coroutines.flow.distinctUntilChanged
//import kotlinx.coroutines.flow.onEach
//import kotlinx.coroutines.launch
//import javax.inject.Inject
//
///**
// * Holds most of the interaction logic and UI state for the app.
// */
//@HiltViewModel
//class MainViewModel @Inject constructor(
//    private val repository: PassiveDataRepository,
//    private val healthServicesManager: HealthServicesManager
//): ViewModel() {
//
//    private val _uiState = MutableStateFlow<UiState>(UiState.Startup)
//    val uiState: StateFlow<UiState> = _uiState
//
//    val passiveDataEnabled: Flow<Boolean>
//    val latestSpeedRate = repository.lastestSpeedRate
//
//    init {
//        // Check that the device has the accelerometer capability and progress to the next state
//        // accordingly.
//        viewModelScope.launch {
//            _uiState.value = if (healthServicesManager.hasSpeedRateCapability()) {
//                UiState.AccelerometerAvailable
//            } else {
//                UiState.AccelerometerNotAvailable
//            }
//        }
//
//        passiveDataEnabled = repository.passiveDataEnabled
//            .distinctUntilChanged()
//            .onEach { enabled ->
//                viewModelScope.launch {
//                    if (enabled)
//                        healthServicesManager.registerForSpeedRateData()
//                    else
//                        healthServicesManager.unregisterForSpeedRateData()
//                }
//            }
//    }
//
//    fun togglePassiveData(enabled: Boolean) {
//        viewModelScope.launch {
//            repository.setPassiveDataEnabled(enabled)
//        }
//    }
//}
//
//sealed class UiState {
//    object Startup: UiState()
//    object AccelerometerAvailable: UiState()
//    object AccelerometerNotAvailable: UiState()
//}
