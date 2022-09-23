import React, {useState} from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  Button,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import * as Inputs from '../components/Inputs.js';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.viewContainer}>
    <Text style={{color: "#fff"}}> Home </Text>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
  },
});

export default HomeScreen;
