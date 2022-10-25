// React Native Imports
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';

// Component Imports
import MainModules from '../components/MainModules.js';
import Chart from '../components/Chart.js';
import Canva from '../components/Canvas.js';

// Style Imports
import * as ColorTheme from '../styles/Colors';

const{width, height} = Dimensions.get('window');

const Main = () => {
  return (
    <ScrollView style={styles.viewContainer}>
      <MainModules.FlexContainer flexDirection={'column'} height={height-30+'px'} width={width+'px'}>

        <MainModules.TopTabModule StartSessionPress={()=>blank()}/>

        <MainModules.FlexContainer>
          <MainModules.SideTabModule flex={0.3} ResetPress={()=>blank()} QueryPress={()=>blank()}/>
          <MainModules.GraphModule height="100%" width="100%" bgColor='#222' screen1={Chart} screen2={Canva}/>
        </MainModules.FlexContainer>

      </MainModules.FlexContainer>
    </ScrollView>
  );
};

function blank() {
  // To be completed
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#222',
  },
});

export default Main;
