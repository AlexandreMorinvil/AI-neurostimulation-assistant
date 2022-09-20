import React from 'react';
import type {Node} from 'react';

import {Navigation} from 'react-native-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomDrawer from './components/CustomDrawer';
import HomeScreen from './views/HomeScreen';
import ServerTesting from './views/ServerTesting';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Home" component={HomeScreen} options={{
          drawerIcon: () =>(
          <Ionicons name="add" size={32} color={"#000"}/>
          )}}/>
        <Drawer.Screen name="Server Testing" component={ServerTesting} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
  // <ServerTesting />
  // return <HomeScreen/>
};

export default App;

// Custom Drawer from scratch
// const App: () => Node = () => {
//   return(
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Text> Hello </Text>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#5359D1',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
