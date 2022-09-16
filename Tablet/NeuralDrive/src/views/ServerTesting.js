import React, {useState} from 'react';
import {Text, TextInput, ScrollView, Button, ToastAndroid, StyleSheet} from 'react-native';
// import * as Inputs from '../components/Inputs.js';

const ServerTesting = () => {
  const [text, setText, serverResponse] = useState('');

  return (
    // <ScrollView style={{padding: 10}}>
    <ScrollView style={styles.viewContainer}>
      <TextInput
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
        Message to be sent: {text}
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
      </Text>

      {/* <Inputs.RegInput/> */}
      {/* <Inputs.Round/> */}
      {/* <Inputs.RoundGrey/> */}
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

export default ServerTesting;
