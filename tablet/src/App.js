import { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { cleanUp, initialize } from './services/app-setup.service';
import * as ColorTheme from './styles/Colors';

import MainView from './views/main.view';
import SettingsView from './views/settings.view';
import Database from './views/Database';
import TestView from './.dev/debug.view';

const Drawer = createDrawerNavigator();

const App = () => {

  /**
   * Effects
   */
  useEffect(() => {
    initialize();
    return cleanUp;
  }, []);

  /**
   * Render
   */
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: ColorTheme.Fruity.Second,
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: ColorTheme.Fruity.Second,
          drawerLabelStyle: {
            marginLeft: 0,
            fontSize: 20,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
          },
        }}>
        <Drawer.Screen
          name="Main"
          component={MainView}
          options={{
            drawerIcon: () => (
              <Ionicons name="home" size={25} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsView}
          options={{
            drawerIcon: () => (
              <Ionicons name="settings-outline" size={25} />
            ),
          }}
        />
        <Drawer.Screen
          name="Data"
          component={Database}
          options={{
            drawerIcon: () => (
              <Ionicons name='analytics' size={25} />
            ),
          }}
        />

        <Drawer.Screen
          name="Debug and tests"
          component={TestView}
          options={{
            drawerIcon: () => (
              <Ionicons name="code-working" size={25} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer >
  );
};

export default App;
