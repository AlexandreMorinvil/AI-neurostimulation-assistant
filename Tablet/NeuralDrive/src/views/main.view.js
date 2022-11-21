import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

import MainModulesPaper from '../components/MainModulesPaper.js';
import PanelVizualization from "../components/main/panel-visualization/panel-visualization.component";


import * as Structures from '../components/Structures.js';


const MainView = () => {

  /**
 * States
 */
  const [stateIsOrientationHorizontal, setstateIsOrientationHorizontal] = useState(true);

  /**
   * Functions
   */
  const updateLayout = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    setstateIsOrientationHorizontal(screenWidth > screenHeight);
  }

  /**
   * Render
   */
  return (
    <View
      style={styles.viewContainer}
      onLayout={updateLayout}
    >
      {
        stateIsOrientationHorizontal ?
          <MainPaperHorizontal /> :
          <MainPaperVertical />
      }
    </View>
  );

}

class MainPaperHorizontal extends React.Component {
  render() {
    return (
      <Structures.FlexContainer>
        <MainModulesPaper.SideTabModule
          flex={0.3}
          ResetPress={() => { }}
          QueryPress={() => { }}
        />
        <PanelVizualization />
      </Structures.FlexContainer>
    );
  }
}

class MainPaperVertical extends React.Component {
  render() {
    return (
      <Structures.FlexContainer flexDirection={'column'}>
        <Structures.FlexContainer flex={0.5}>
          <MainModulesPaper.SideTabModuleVertical
            flex={1}
            ResetPress={() => { }}
            QueryPress={() => { }}
          />
        </Structures.FlexContainer>
        <Structures.FlexContainer>
          <PanelVizualization />
        </Structures.FlexContainer>
      </Structures.FlexContainer>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 10,
  },
});

export default MainView;
