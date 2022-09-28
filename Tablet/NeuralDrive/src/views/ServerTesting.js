import React, {useState} from 'react';

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
// import * as Inputs from '../components/Inputs.js';
//import Chart from 'react-native-chartjs';
const ServerTesting = () => {
  const [text, setText, serverResponse] = useState('');

  return (
    // <ScrollView style={{padding: 10}}>
    <View style={styles.viewContainer}>
      {/* <TextInput
        style={{height: 40}}
        placeholder="Server Input"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Button
        title="send to server"
        onPress={() => {
          // Call Server Request Here @Noe
          ToastAndroid.show('Sending server request...', ToastAndroid.SHORT);
        }}
      />
      <Text style={{padding: 10, fontSize: 16}}>
        Message to TESTTTTTTTTT be sent: {text}
      </Text>
      <Text style={{padding: 10, fontSize: 16}}> Server Response: </Text>
      <Text
        style={{
          padding: 10,
          height: 1000,
          backgroundColor: '#222',
          color: '#eee',
        }}>
        blabla... {serverResponse}
      </Text> */}
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
            ToastAndroid.show('Sending server request...', ToastAndroid.SHORT);
          }}
        />
      </View>
      <View style={styles.boxChart}>
        <Text style={styles.boxTitle}>Patient data</Text>
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.49} // from react-native
          height={Dimensions.get('window').height * 0.9}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
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
  inputBox: {
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: '50%',
    height: '50%',
    backgroundColor: 'grey',
    padding: 5,
  },
  boxChart: {
    width: '50%',
    height: '100%',
    backgroundColor: 'cyan',
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
