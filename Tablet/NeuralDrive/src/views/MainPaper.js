// React Native Imports
import React, {useState} from 'react';
import * as Structures from '../components/Structures.js';

import {View, Dimensions} from 'react-native';

// Component Imports
import MainModulesPaper from '../components/MainModulesPaper.js';
import Chart from '../components/Chart.js';
import HeatMap from '../components/HeatMap.js';

// Style Imports
import * as ColorTheme from '../styles/Colors';

class MainPaper extends React.Component {
  state = {
    screenWidth: null,
    screenHeight: null,
  };

  _onLayout(e) {
    // console.log((Dimensions.get('window')));
    this.setState({
      screenWidth: Dimensions.get('window').width,
      screenHeight: Dimensions.get('window').height,
    });
  }

  render() {
    const {screenHeight, screenWidth} = this.state;
    return (
      <View
        onLayout={this._onLayout.bind(this)}
        style={{height: '100%', width: '100%', flex: 1}}>
        {screenWidth > screenHeight ? (
          <MainPaperHorizontal />
        ) : (
          <MainPaperVertical />
        )}
      </View>
    );
  }
}

class MainPaperHorizontal extends React.Component {
  render() {
    return (
      <Structures.FlexContainer>
        <MainModulesPaper.SideTabModule
          flex={0.3}
          StartSessionPress={() => blank()}
          ResetPress={() => blank()}
          QueryPress={() => blank()}
        />
        <MainModulesPaper.GraphModule />
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
            ResetPress={() => blank()}
            QueryPress={() => blank()}
          />
        </Structures.FlexContainer>
        <Structures.FlexContainer>
          <MainModulesPaper.GraphModule />
        </Structures.FlexContainer>
      </Structures.FlexContainer>
    );
  }
}

function blank() {
  // To be completed
}

export default MainPaper;
