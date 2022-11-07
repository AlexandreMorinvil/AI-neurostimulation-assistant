import React, {useState} from 'react';
import Chart from '../components/Chart';
import HeatMap from '../components/HeatMap';
import {send_request} from '../class/http';
import styled from 'styled-components';
import {Action} from '../class/actions';
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

//server_url = 'http://10.0.2.2:5000/packet';

const set_dimension = dimension => {
  this.dimension = +dimension;
};
const set_n_param = n_param => {
  this.n_param = +n_param;
};
const set_A = A => {
  this.A = +A;
};
const set_B = B => {
  this.B = +B;
};
const set_Y_value = y_value => {
  this.y_value = +y_value;
};

this.ref = React.createRef();

const ServerTesting = () => {
  n_param = 2;
  dimension = 3;
  A = 0;
  B = 0;
  y_value = 0;
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
              onChangeText={text => set_dimension(text)}
              defaultValue={this.dimension}
            />
          </View>
          <View style={styles.inputBox}>
            <Text>Number of parameters</Text>
            <TextInput
              style={styles.input}
              placeholder="2"
              onChangeText={text => set_n_param(text)}
              defaultValue={this.n_param}
            />
          </View>
          <Button
            title="send to server"
            onPress={() => {
              // Call Server Request Here @Noe
              send_command(
                {
                  action: Action.START_SESSION,
                  arg: {
                    n_param: this.n_param,
                    dimention: this.dimension,
                  },
                },
                this.ref.current,
              );
            }}
          />
          <View style={styles.inputBox}>
            <Text>A</Text>
            <TextInput
              style={styles.input}
              placeholder="4"
              onChangeText={text => set_A(text)}
              defaultValue={this.A}
            />
          </View>
          <View style={styles.inputBox}>
            <Text>B</Text>
            <TextInput
              style={styles.input}
              placeholder="2"
              onChangeText={text => set_B(text)}
              defaultValue={this.B}
            />
          </View>
          <View style={styles.inputBox}>
            <Text>Y_value</Text>
            <TextInput
              style={styles.input}
              placeholder="2"
              onChangeText={text => set_Y_value(text)}
              defaultValue={this.y_value}
            />
          </View>
          <Button
            title="send querry"
            onPress={() => {
              // Call Server Request Here @Noe
              response = send_command(
                {
                  action: Action.EXECUTE_QUERY,
                  arg: {A: this.A, B: this.B, y_value: this.y_value},
                },
                this.ref.current,
              );
              console.log(response);
            }}
          />
        </View>
        <View style={styles.box}>
          <HeatMap></HeatMap>
        </View>
      </View>
      <View style={styles.boxChart}>
        <Text style={styles.boxTitle}>Patient data</Text>
        {/* <Chart></Chart> */}
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
    backgroundColor: 'white',
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
