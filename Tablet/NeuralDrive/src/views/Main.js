// React Native Imports
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

// Component Imports
// import RoundedButton from '../components/RoundedButton.js';
// import Test from '../components/RoundedButton.js';
import Buttons from '../components/Buttons.js';
import MainModules from '../components/MainModules.js';
import * as OtherButtons from '../components/OtherButtons.js';
import * as Inputs from '../components/Inputs.js';

// Style Imports
import * as ColorTheme from '../styles/Colors';

const Main = () => {
  return (
    <View style={styles.viewContainer}>
      <MainModules.FlexContainer flex={0.1} jc="space-evenly">
        <Buttons.RoundedButton
          title="Record"
          onPress={() => blank()}
          bgColor={ColorTheme.Fruity.First}></Buttons.RoundedButton>
        <MainModules.Box height="100%" width="10%" bgColor="#555">
          <Text> Server Connection Status </Text>
        </MainModules.Box>
        <MainModules.Box height="100%" width="10%" bgColor="#555">
          <Text> Try Connect to server</Text>
        </MainModules.Box>
      </MainModules.FlexContainer>

      <MainModules.FlexContainer>
        <MainModules.FlexContainer flex={0.3}>
          <MainModules.FlexContainer flexDirection="column">
            <MainModules.Box height='100%' width='100%' bgColor='#222' jc='flex-start'>
              <Buttons.RoundedButton
                title="Old Data"
                onPress={() => blank()}
                bgColor={ColorTheme.Fruity.First}/>
              <MainModules.InputModule
                flex={1}
                bgColor={'#222'}
              />
              <Buttons.RoundedButton
                title=""
                onPress={() => blank()}
                bgColor={ColorTheme.Fruity.First}/>
              <MainModules.BluetoothModule height={'250px'} width={'100%'} bgColor={'#555'}/>
            </MainModules.Box>
          </MainModules.FlexContainer>
        </MainModules.FlexContainer>

        <MainModules.FlexContainer flexDirection="column">
          <MainModules.GraphModule
            height="95%"
            width="100%"
            bgColor="#555"
            title="Graph"
          />
          <MainModules.FlexContainer>
            <MainModules.Box height="100%" width="80%" bgColor="#555">
              <Text> View Button </Text>
            </MainModules.Box>
          </MainModules.FlexContainer>
        </MainModules.FlexContainer>
      </MainModules.FlexContainer>
    </View>
  );
};

// <MainModules.FlexContainer>

//   <MainModules.FlexContainer jc='flex-start'>
//     <MainModules.InputModule height='100%' width='45%' bgColor='#555' title='test'>
//     </MainModules.InputModule>
//     <MainModules.Box height='100%' width="50%" bgColor='#555'/>
//   </MainModules.FlexContainer>

//   <MainModules.FlexContainer flexDirection='column'>

//     <MainModules.FlexContainer flex={0.05}>
//       <MainModules.Box height='100%' width="50%" bgColor='#555'/>
//       <MainModules.Box height='100%' width="50%" bgColor='#555'>
//         <Text> Next Suggestion? </Text>
//       </MainModules.Box>
//     </MainModules.FlexContainer>

//     <MainModules.FlexContainer>
//       <MainModules.GraphModule height='100%' width='100%' bgColor='#555' title='Graph'/>
//     </MainModules.FlexContainer>

//   </MainModules.FlexContainer>

// </MainModules.FlexContainer>

function blank() {
  // To be completed
}

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: '#222',
    height: '100%',
    width: '100%',
  },
});

export default Main;
