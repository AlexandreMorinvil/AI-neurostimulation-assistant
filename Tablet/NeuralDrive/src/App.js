// React Native Imports
import React from 'react';
import type {Node} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

// Drawer Imports
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
import MainPaper from './views/MainPaper';
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
          drawerBackgroundColor: ColorTheme.Fruity.Third,
          drawerActiveBackgroundColor: ColorTheme.Fruity.Second,
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: ColorTheme.Fruity.Second,
          drawerLabelStyle: {
            marginLeft: -20,
            fontSize: 14,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
          },
        }}>
        <Drawer.Screen
          name="MainPaper"
          component={MainPaper}
          options={{
            drawerIcon: () => (
              <Ionicons name="grid-outline" size={20} color={'#000'} />
            ),
          }}
        />

        <Drawer.Screen
          name="Component Testing"
          component={HomeScreen}
          options={{
            drawerIcon: () => (
              <FontAwesome name="puzzle-piece" size={20} color={'#000'} />
            ),
          }}
        />
        <Drawer.Screen
          name="Server Testing"
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
          name="Watch Testing"
          component={WatchTesting}
          options={{
            drawerIcon: () => <Feather name="watch" size={20} color={'#000'} />,
          }}
        />

        <Drawer.Screen
          name="Settings"
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
