import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import { COLOR_TEXT } from '@styles/colorStyles';

type Props = {
  leftText: string,
  rightText: string,
}

export const SliderToggle = (props: Props) => {

  /**
   * References 
   */
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  /**
   * Constants
   */
  const left = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['2%', '50%'],
    extrapolate: 'clamp',
  });

  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.9, 1],
    extrapolate: 'clamp',
  });

  /**
   * Functions
   */
  const startAnimation = (toValue: any) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  /**
   * Render
   */
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Animated.View style={[styles.slider, { left }]} />
        <Pressable
          style={styles.clickableArea}
          onPress={startAnimation.bind(null, 0)}>
          <Animated.Text
            style={[styles.sliderText, { transform: [{ scale }] }]}>
            {props.leftText}
          </Animated.Text>
        </Pressable>
        <Pressable
          style={styles.clickableArea}
          onPress={startAnimation.bind(null, 1)}>
          <Animated.Text
            style={[styles.sliderText, { transform: [{ scale }] }]}>
            {props.rightText}
          </Animated.Text>
        </Pressable>
      </View>
    </View>
  );
};

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  clickableArea: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderText: {
    color: COLOR_TEXT.button,
    fontWeight: 'bold',
  },
  slider: {
    position: 'absolute',
    width: '48%',
    height: '90%',
    borderRadius: 10,
    backgroundColor: '#FDFDFD',
  },
});