// React Native Imports
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import WatchManager from '../components/WatchManager.js';

const WatchTesting = () => {
  return (
    <View style={styles.viewContainer}>
      <WatchManager />
    </View>
  );
};


const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#222',
    height: '100%',
    width: '100%',
  },
});

export default WatchTesting;
