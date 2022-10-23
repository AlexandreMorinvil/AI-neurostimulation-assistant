import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {
  send_command,
  post_start_new_session,
  post_execute_query,
} from '../class/http';
import {Action, Status, ERROR_CODE} from '../class/actions';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

//session_status = Status.STOP;

const set_session_status = status => {
  mission_status = status;
};

const start_new_session = () => {
  console.log('START SESSION');
  return post_start_new_session();
};

const set_dimension = dimension => {
  this.dimension = +dimension;
  this.canvas_ref.current.current_algorithm.dimention = this.dimension;
};
const set_n_param = n_param => {
  this.n_param = +n_param;
  this.canvas_ref.current.current_algorithm.n_param = this.n_param;
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

const set_old_A = old_A => {
  this.old_A = +old_A;
};
const set_old_B = old_B => {
  this.old_B = +old_B;
};
const set_old_Y_value = old_y_value => {
  this.old_y_value = +old_y_value;
};

session_status = Status.IDLE;
n_param = 2;
dimension = 3;
A = 2;
B = 0;
y_value = 0;

old_A = A;
old_B = B;
old_y_value = y_value;

export function Parameters({canvas_ref}) {
  //const [session_status, set_session_status] = useState(Status.STOP);
  const [value, setValue] = useState(0);
  return (
    <View style={styles.mainBoxParameters}>
      <LinearGradient colors={['#A1C4FD', '#C2E9FB']} style={styles.title2}>
        <Text style={styles.titleText}>PARAMETERS</Text>
      </LinearGradient>
      <View style={styles.secondBoxParameters}>
        <View style={styles.box}>
          {session_status === Status.IDLE ? (
            <View style={styles.buttonView}>
              <Pressable
                style={styles.startButton}
                onPress={() => {
                  session_status = Status.STOP;
                  setValue(value => value + 1);
                }}>
                <LinearGradient
                  colors={['#A1C4FD', '#C2E9FB']}
                  style={styles.startButton}>
                  <Ionicons
                    name="caret-forward-circle-outline"
                    size={100}
                    color={'grey'}
                    width={'100%'}
                  />
                </LinearGradient>
              </Pressable>
            </View>
          ) : null}

          {session_status === Status.STOP ? (
            <View>
              <View style={styles.inputBox}>
                <Text style={styles.inputName}>DIMENSIONS</Text>
                <TextInput
                  style={styles.input}
                  placeholder="4"
                  onChangeText={text => set_dimension(text)}
                  defaultValue={dimension}
                />
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputName}>NUMBER OF PARAMETERS</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2"
                  onChangeText={text => set_n_param(text)}
                  defaultValue={n_param}
                />
              </View>
              <View style={styles.buttonView}>
                <Pressable
                  style={styles.button}
                  onPress={async () => {
                    let status = await start_new_session();
                    console.log('status = ', status);
                    session_status = status;
                    setValue(value => value + 1);
                  }}>
                  <Text style={styles.text}>SUBMIT</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
          {session_status === Status.START ? (
            <View>
              <View style={styles.inputBox}>
                <Text style={styles.inputName}>A</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2"
                  onChangeText={text => set_A(text)}
                  defaultValue={this.A}
                  value={this.A}
                />
                <Text style={styles.inputName}>SUGESTION : {this.old_A}</Text>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputName}>B</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2"
                  onChangeText={text => set_B(text)}
                  defaultValue={B}
                />
                <Text style={styles.inputName}>SUGESTION : {this.old_B}</Text>
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputName}>Y VALUE</Text>
                <TextInput
                  style={styles.input}
                  placeholder="2"
                  onChangeText={text => {
                    set_Y_value(text);
                  }}
                  defaultValue={y_value}
                />
              </View>
              <View style={styles.buttonView}>
                <Pressable
                  style={styles.button}
                  onPress={async () => {
                    response = await post_execute_query(A, B, y_value);
                    canvas_ref.current.current_algorithm.data = JSON.parse(
                      response.predict_heat_map,
                    );
                    canvas_ref.current.current_algorithm.position = JSON.parse(
                      response.position,
                    );
                    canvas_ref.current.draw_heat_map(
                      canvas_ref.current.current_algorithm,
                    );
                    set_old_A(
                      canvas_ref.current.current_algorithm.position[
                        Number(response.next_query)
                      ][0],
                    );
                    set_old_B(
                      canvas_ref.current.current_algorithm.position[
                        Number(response.next_query)
                      ][1],
                    );
                    setValue(value => value + 1);
                  }}>
                  <Text style={styles.text}>SEND QUERY</Text>
                </Pressable>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBoxParameters: {
    width: '100%',
    height: '70%',
    flexDirection: 'column',
    alignItems: 'center',
    //backgroundColor: 'grey',

    //flex: 1,
  },
  secondBoxParameters: {
    width: '100%',
    height: '50%',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    alignContent: 'center',
    backgroundColor: 'white',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    alignContent: 'center',
    textAlign: 'center',
    //backgroundColor: 'grey',
  },
  inputBox: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputName: {
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    //borderRadius: 4,
    elevation: 3,
    backgroundColor: '#C2E9FB',
    width: '60%',
    alignContent: 'center',
    textAlign: 'center',
    //flexDirection: 'row',
  },
  buttonView: {
    height: '30%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    //backgroundColor: 'grey',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'grey',
    fontSize: 17,
    fontWeight: 'bold',
  },
  box: {
    width: '100%',
    height: '50%',
    //backgroundColor: 'grey',
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
    //height: '25%',
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    fontSize: 35,
    fontWeight: 'bold',
  },

  startButton: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#ccc',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    alignContent: 'center',
    textAlign: 'center',
  },

  title2: {
    height: '14.5%',
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

export default Parameters;
