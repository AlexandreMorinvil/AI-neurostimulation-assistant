import React, {useState} from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  Button,
  ToastAndroid,
  StyleSheet,
  View,
} from 'react-native';
import * as Inputs from '../components/Inputs.js';
import {set_server_ip, get_server_ip} from '../class/const';

const SettingsScreen = () => {
  [ip, set_ip] = useState(get_server_ip());
  return (
    <ScrollView style={styles.viewContainer}>
      <Text style={{color: '#fff'}}> Settings </Text>
      <View style={styles.inputBox}>
        <Text style={styles.inputName}>SERVER IP</Text>
        <TextInput
          style={styles.input}
          placeholder="2"
          onChangeText={text =>
            set_ip(() => {
              ip = text;
              set_server_ip(ip);
              console.log(ip);
            })
          }
          defaultValue={get_server_ip()}
        />
      </View>
    </ScrollView>
  );
};
//

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
  },
  inputBox: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputName: {
    fontSize: 17,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: 'black',
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
    color: 'black',
  },
});

export default SettingsScreen;
