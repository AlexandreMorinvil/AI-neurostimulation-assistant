import React, {useState} from 'react';
import Chart from '../components/Chart';
import Canva from '../components/Canvas';
import {send_request} from '../class/http';
import styled from 'styled-components';
import {
  Text,
  TextInput,
  ScrollView,
  Button,
  ToastAndroid,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

server_url = 'http://10.0.2.2:5000/packet';

const ServerTesting = () => {
  const [text, setText, serverResponse] = useState('');

  return (
    // <ScrollView style={{padding: 10}}>
    <View style={styles.viewContainer}>
      <View style={styles.upperbox}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Input</Text>
          <View style={styles.inputBox}>
            <Text>Dimensions</Text>
            <TextInput
              style={styles.input}
              placeholder="4"
              onChangeText={text => setText(text)}
              defaultValue={text}
            />
          </View>
          <View style={styles.inputBox}>
            <Text>Number of parameters</Text>
            <TextInput
              style={styles.input}
              placeholder="2"
              onChangeText={text => setText(text)}
              defaultValue={text}
            />
          </View>
          <Button
            title="send to server"
            onPress={() => {
              // Call Server Request Here @Noe
              send_request(server_url);
            }}
          />
        </View>
        <View style={styles.box}>
          <Canva></Canva>
        </View>
      </View>
      <View style={styles.boxChart}>
        <Text style={styles.boxTitle}>Patient data</Text>
        <Chart></Chart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
    height: '100%',
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  upperbox: {
    width: '50%',
    height: '100%',
    flexDirection: 'column',
  },
  inputBox: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    height: '50%',
    backgroundColor: 'grey',
    padding: 5,
  },
  boxChart: {
    width: '50%',
    height: '100%',
    backgroundColor: 'grey',
    padding: 5,
  },
  boxTitle: {
    width: '100%',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ServerTesting;
