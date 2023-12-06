import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet } from 'react-native';

// import * as socketService from '../services/socket.service.ts';
import { socketService } from '../services/socket.service.ts';

import { COLOR_BACKGROUND } from '../styles/colors.style.js';
import PanelControl from '../components/main/panel-control/panel-control.component.js';
import PanelVizualization from '../components/main/panel-visualization/panel-visualization.component';
import { Button } from 'react-native-paper';

const MainView = () => {
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

  const initializeSocket = () => {
    console.log('Got inside the function in the component');
    // socketService.testFunction()
    socketService.testFunction()


  };

  /**
   * Effects
   */
  useEffect(() => {
    initializeSocket();
  }, []);


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
        <PanelVizualization />
      </View>
      <View style={styles.vizualizationPanelArea}>
        <Text style={styles.testArea}> {"HERE IS A TEXT EXAMPLE"} </Text>
        <Button 
          style={styles.testButton}
          onPress={() => { socketService.send() }}
        >
          <Text> {"HERE IS A BUTTON"} </Text> 
        </Button>
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
  testArea: {
    backgroundColor: 'red',
  },
  testButton: {
    backgroundColor: 'pink',
    margin: 20,
  }
});

export default MainView;
