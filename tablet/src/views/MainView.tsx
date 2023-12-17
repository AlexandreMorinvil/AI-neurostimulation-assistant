import { PanelControl } from '@components/main/panel-control/PanelControl';
import { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { COLOR_BACKGROUND } from '../styles/colorStyles.js';
import { PanelVisualization } from '@components/main/panel-visualization/PanelVisualizations';

export const MainView = () => {
  /**
   * States
   */
  const [stateIsOrientationHorizontal, setstateIsOrientationHorizontal] =
    useState(true);


  /**
   * Functions
   */
  const updateLayout = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    setstateIsOrientationHorizontal(screenWidth > screenHeight);
  };

  /**
   * Render
   */
  return (
    <View
      style={[
        styles.viewContainer,
        stateIsOrientationHorizontal
          ? styles.horizontalOrientation
          : styles.verticalOrientation,
      ]}
      onLayout={updateLayout}>
      <View style={styles.controlPanelArea}>
        <PanelControl />
      </View>
      <View style={styles.vizualizationPanelArea}>
        <PanelVisualization />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND.Application,
    height: 200,
    padding: 0,
  },
  horizontalOrientation: {
    flexDirection: 'row',
  },
  verticalOrientation: {
    flexDirection: 'column',
  },
  controlPanelArea: {
    flex: 1,
    minWidth: 300,
    minHeight: 300,
  },
  vizualizationPanelArea: {
    flex: 2,
    minWidth: 500,
    minHeight: 500,
  },
});