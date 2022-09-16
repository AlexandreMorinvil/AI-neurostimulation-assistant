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
      <Button title="Server Testing" OnPress={Nav} />
      <Button title="Testing" OnPress={Nav} />
    </ScrollView>
  );
};

function Nav(){}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#444',
    padding: 10,
  },
});

export default HomeScreen;
