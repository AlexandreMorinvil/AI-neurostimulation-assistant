// React Native Imports
import {createDrawerNavigator} from '@react-navigation/drawer';
// Drawer Imports
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
// Icon Imports
import Ionicons from 'react-native-vector-icons/Ionicons';
// Component Imports
import CustomDrawer from './components/CustomDrawer';
// Style Imports
import * as ColorTheme from './styles/Colors';
// View Imports
import MainPaper from './views/MainPaper';
import SettingsView from './views/settings.view';

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
          name="Settings"
          component={SettingsView}
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
