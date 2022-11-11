import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import SettingsMenuItemPatient from '../components/settings/menu-item-patient/menu-item-patient.component';
import SettingsModules from '../components/SettingsModules.js';
import NetInfo from '@react-native-community/netinfo';

import SettingsMenuItemConnectionBackend from '../components/settings/menu-item-connection-backend/menu-item-connection-backend.component';
// import SettingsMenuItemConnectionWatch from '../components/settings/menu-item-connection-watch/menu-item-connection-watch.component';

const SettingsScreen = () => {
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
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ScrollView style={styles1.viewContainer}>

      <SettingsMenuItemPatient />
      <SettingsMenuItemConnectionBackend />
      {/* <SettingsMenuItemConnectionWatch /> */}
      <SettingsModules.SettingsScreenTemporary />


      {/* <SettingsModules.Box
        height='100%'
        width='100%'
        bgColor='#222'
        jc='flex-start'
        alignItems='center'
      >
        <SettingsModules.Box
          height={'250px'}
          width={'100%'}
          bgColor={'#555'}
          flexDirection="row"
        >

          <SettingsModules.FlexContainer bgColor={'#555'} flexDirection="column">
            <SettingsModules.WatchIPInputModule
              flex={1}
              alignItems={'center'}
              ipAddress={netInfo}
            />
          </SettingsModules.FlexContainer>

          <SettingsModules.FlexContainer
            bgColor={'#555'}
            flexDirection="column"
          >
            <SettingsModules.ServerURLInputModule
              flex={1}
              alignItems={'flex-start'}
              textChange={newText => setText(newText)}
              functionToUse={changeServerIpAddress()}
            />
          </SettingsModules.FlexContainer>

        </SettingsModules.Box>

        <Buttons.RoundedButton
          title="Main page"
          onPress={() => blank()}
          bgColor={ColorTheme.Fruity.First}
          container={bottom = 10} />
      </SettingsModules.Box> */}

    </ScrollView >
  );
};


const styles1 = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 10,
  },
});


function blank() {
  server_url = '1.1.1.1'
}

export default SettingsScreen;
