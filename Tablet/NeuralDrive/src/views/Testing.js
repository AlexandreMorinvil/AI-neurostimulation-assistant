import React, {useState} from 'react';
import {Text, TextInput, ScrollView, Button, ToastAndroid, StyleSheet} from 'react-native';
import * as Inputs from '../components/Inputs.js';

const Testing = () => {
  return (
    <ScrollView style={styles.viewContainer}>
      <Inputs.RegInput />
      <Inputs.Round />
      <Inputs.RoundGrey />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#444',
    padding: 10,
  },
});

export default Testing;
