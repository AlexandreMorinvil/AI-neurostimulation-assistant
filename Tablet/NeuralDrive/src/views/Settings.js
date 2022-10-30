import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Switch,
} from 'react-native';
import Buttons from '../components/Buttons.js';
import SettingsModules from '../components/SettingsModules.js';
import NetInfo from '@react-native-community/netinfo';
// Style Imports
import * as ColorTheme from '../styles/Colors';
import edit_url from '../class/http.js';

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [netInfo, setNetinfo] = useState('');
  const [text, setText] = useState('');
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

  function changeServerIpAddress(){
    console.log('here');
  }

  return (
    <View style={styles.viewContainer}
      alignItems='center'>
        <SettingsModules.Box height='100%' width='100%' bgColor='#222' jc='flex-start' alignItems='center'>
          <Text style={{ color: "#fff" }}> Neurodrive data app </Text>
          <SettingsModules.Box height={'250px'} width={'100%'} bgColor={'#555'} flexDirection="row">
            <SettingsModules.FlexContainer bgColor={'#555'} flexDirection="column">
              <SettingsModules.WatchIPInputModule
                flex={1}
                alignItems={'center'}
                bgColor={'#555'}
                ipAddress={netInfo}
              />
            </SettingsModules.FlexContainer>
            <SettingsModules.FlexContainer bgColor={'#555'} flexDirection="column">
              <SettingsModules.ServerURLInputModule
                flex={1}
                alignItems={'flex-start'}
                bgColor={'#555'}
                textChange = {newText => setText(newText)}
                functionToUse = {changeServerIpAddress()}
              />
              </SettingsModules.FlexContainer>
          </SettingsModules.Box>
          <Buttons.RoundedButton
          title="Main page"
          onPress={() => blank()}
          bgColor={ColorTheme.Fruity.First}
          container={bottom = 10} />
        </SettingsModules.Box>
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

function blank(){
  server_url = '1.1.1.1'
}

export default SettingsScreen;
