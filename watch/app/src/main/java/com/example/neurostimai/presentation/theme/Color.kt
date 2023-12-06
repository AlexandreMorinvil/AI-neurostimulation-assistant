package com.example.neurostimai.presentation.theme

import androidx.compose.ui.graphics.Color
import androidx.wear.compose.material.Colors

val BlueSurface = Color(0xFF0B687D)
val BluePrimary = Color(0xFF0993b3)
val BlueSecondary = Color(0xFF09B8E0)
val TealPrimary = Color(0xFF03DAC5)
val TealSecondary = Color(0xFF35F1DF)
val RedError = Color(0xFFCF6679)
val WhiteBackground = Color(0xFFE9E9E9)

internal val wearColorPalette: Colors = Colors(
    primary = BluePrimary,
    primaryVariant = BlueSecondary,
    secondary = TealPrimary,
    secondaryVariant = TealSecondary,
    surface = BlueSurface,
    background = WhiteBackground,
    error = RedError,
    onPrimary = Color.Black,
    onSecondary = Color.Black,
    onError = Color.Black,
    onSurface = Color.Black,
)