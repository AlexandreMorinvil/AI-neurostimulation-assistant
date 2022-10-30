// React Native Imports
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Drawer Imports
import {Navigation} from 'react-native-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Icon Imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// View Imports
import HomeScreen from './views/Home';
import ServerTesting from './views/ServerTesting';
import SettingsScreen from './views/Settings';
import Main from './views/Main';
import WatchTesting from './views/WatchTesting';

// Component Imports
import CustomDrawer from './components/CustomDrawer';

// Style Imports
import * as ColorTheme from './styles/Colors';

// ----------------------------------------------------------------------

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerBackgroundColor: '#2596be',
          drawerActiveBackgroundColor: '#2596be',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#222',
          drawerLabelStyle: {
            marginLeft: -20,
            fontSize: 14,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
          },
        }}>
        <Drawer.Screen
          name="DASH BOARD"
          component={Main}
          options={{
            drawerIcon: () => (
              <Ionicons name="grid-outline" size={20} color={'#000'} />
            ),
          }}
        />
        <Drawer.Screen
          name="SERVER"
          component={ServerTesting}
          options={{
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="test-tube"
                size={20}
                color={'#000'}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="SETTINGS"
          component={SettingsScreen}
          options={{
            drawerIcon: () => (
              <Ionicons name="settings-outline" size={20} color={'#000'} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
