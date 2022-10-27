// React Native Imports
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {send_command} from '../class/http';
import LinearGradient from 'react-native-linear-gradient';

// Component Imports
import MainModules from '../components/MainModules.js';
import Chart from '../components/Chart.js';
import Canva from '../components/Canvas';
import Parameters from '../components/parametersBox';
import {Action} from '../class/actions';
import {get_patient_level, get_smartwatch_connected} from '../class/const';

// Style Imports
import * as ColorTheme from '../styles/Colors';

patient_level = 10;
smartwatch_connected = false;

export function InfoBox() {
  const [value2, setValue2] = useState(0);
  useEffect(() => {
    const interval2 = setInterval(() => {
      setValue2(value2 => value2 + 1);
      console.log(get_smartwatch_connected());
      smartwatch_connected = get_smartwatch_connected();
    }, 1000);

    return () => clearInterval(interval2);
  }, [value2]);
  return (
    <View style={styles.mainBoxParameters}>
      <LinearGradient colors={['#A1C4FD', '#C2E9FB']} style={styles.title2}>
        <Text style={styles.titleText}>INFO</Text>
      </LinearGradient>
      <View style={styles.patient_data_level_box}>
        <Text style={{fontSize: 16, fontFamily: 'Roboto', fontWeight: 'bold'}}>
          PATIENT LEVEL
        </Text>
        <Text style={{fontSize: 60, fontFamily: 'Roboto', fontWeight: 'bold'}}>
          {patient_level}
        </Text>
        <Text style={{fontSize: 14, fontFamily: 'Roboto', fontWeight: 'bold'}}>
          SMART-WATCH IS CONNECTED = {String(smartwatch_connected)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBoxParameters: {
    width: '100%',
    height: '30%',
    flexDirection: 'column',
    alignItems: 'center',
    //backgroundColor: 'grey',

    //flex: 1,
  },
  patient_data_level_box: {
    width: '80%',
    height: '70%',
    //borderWidth: 1,
    //borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title2: {
    height: '30%',
    width: '100%',
  },

  titleText: {
    height: '100%',
    fontSize: 35,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: 'grey',
    width: '100%',
    textAlign: 'center',
  },
});

export default InfoBox;
