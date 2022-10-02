// React Native Imports
import React, {useState} from 'react';
import {Text, TextInput, ScrollView, Button, ToastAndroid, StyleSheet} from 'react-native';

// Component Imports
// import RoundedButton from '../components/RoundedButton.js';
// import Test from '../components/RoundedButton.js';
import Buttons from '../components/Buttons.js';
import * as OtherButtons from '../components/OtherButtons.js';
import * as Inputs from '../components/Inputs.js';

// Style Imports
import * as ColorTheme from '../styles/Colors';

const Home = () => {
  return (
    <ScrollView style={styles.viewContainer}>
      <Buttons.RoundedButton title="Record" onPress={()=>blank()} bgColor={ColorTheme.Fruity.First}></Buttons.RoundedButton>
      <Inputs.RegInput />
      <Inputs.Round />
      <Inputs.RoundGrey />
      <OtherButtons.TO>
        <Text> Okay </Text>
      </OtherButtons.TO>
      <OtherButtons.Basic>
        <Text> Text </Text>
      </OtherButtons.Basic>
      <Buttons.Test title="Whut" onPress={()=>blank()} bgColor={ColorTheme.Fruity.First}></Buttons.Test>
    </ScrollView>
  );
};

function blank(){

};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#222',
    padding: 10,
  },
});

export default Home;
