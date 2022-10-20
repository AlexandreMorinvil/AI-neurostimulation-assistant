import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  ScrollView,
  Button,
  ToastAndroid,
  StyleSheet,
  View,
  Switch,
} from 'react-native';
import * as Inputs from '../components/Inputs.js';
import Buttons from '../components/Buttons.js';
import MainModules from '../components/MainModules.js';
import {Picker} from '@react-native-picker/picker';
import NetInfo, { NetInfoStateType } from '@react-native-community/netinfo';
// Style Imports
import * as ColorTheme from '../styles/Colors';
import { faTruckMoving } from '@fortawesome/free-solid-svg-icons';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {setIsEnabled(previousState => !previousState)}
  const [selectedValue, setSelectedValue] = useState("none");
  const isConnectedToBluetooth = false;

  const [netInfo, setNetinfo] = useState('');
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetinfo(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`,
      );
    });
    return () =>{
      unsubscribe();
    };
  }, []);

  const getNetInfo = () => {
    NetInfo.fetch().then((state) => {
      alert(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`,
      );
    });
  };

  return (
    <View style={styles.viewContainer}
      alignItems='center'>
        <MainModules.Box height='100%' width='100%' bgColor='#222' jc='flex-start' alignItems='center'>
          <Text style={{ color: "#fff" }}> Neurodrive data app </Text>
          <MainModules.Box height={'250px'} width={'100%'} bgColor={'#555'} flexDirection="row">
            <MainModules.FlexContainer bgColor={'#555'} flexDirection="column">
              <MainModules.WatchIPInputModule
                flex={1}
                alignItems={'center'}
                bgColor={'#555'}
                ipAddress={netInfo}
              />
            </MainModules.FlexContainer>
            <MainModules.FlexContainer bgColor={'#555'} flexDirection="column">
              <MainModules.ServerURLInputModule
                flex={1}
                alignItems={'flex-start'}
                bgColor={'#555'}
              />
              <Switch 
              trackColor ={{ false: 'red', true: 'green'}} 
              thumbColor={isEnabled? 'white' : 'white'} 
              onValueChange={toggleSwitch} 
              value={isEnabled}
              />
            </MainModules.FlexContainer>
          </MainModules.Box>
          <Buttons.RoundedButton
          title="Main page"
          onPress={() => blank()}
          bgColor={ColorTheme.Fruity.First}
          container={bottom = 10} />
        </MainModules.Box>
    </View>
  );
};


const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
  },
});

function blank() {
  // To be completed
}
export default SettingsScreen;