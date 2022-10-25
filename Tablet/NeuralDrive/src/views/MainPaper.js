// React Native Imports
import React, {useState} from 'react';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';

// Component Imports
import MainModulesPaper from '../components/MainModulesPaper.js';
import Chart from '../components/Chart.js';
import Canva from '../components/Canvas.js';

// Style Imports
import * as ColorTheme from '../styles/Colors';

const{width, height} = Dimensions.get('window');

const MainPaper = () => {
  return (
    // <ScrollView style={styles.viewContainer}>
    <ScrollView>
      <MainModulesPaper.FlexContainer flexDirection={'column'} height={height-30+'px'} width={width+'px'}>

        <MainModulesPaper.TopTabModule StartSessionPress={()=>blank()}/>

        <MainModulesPaper.FlexContainer>
          <MainModulesPaper.SideTabModule flex={0.3} ResetPress={()=>blank()} QueryPress={()=>blank()}/>
          <MainModulesPaper.GraphModule height="100%" width="100%" screen1={Chart} screen2={Canva}/>
        </MainModulesPaper.FlexContainer>

      </MainModulesPaper.FlexContainer>
    </ScrollView>
  );
};

function blank() {
  // To be completed
}

export default MainPaper;
