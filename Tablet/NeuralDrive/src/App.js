import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { cleanUp, initialize } from './services/app-setup.service';
import CustomDrawer from './components/CustomDrawer';
import * as ColorTheme from './styles/Colors';

import MainView from './views/main.view';
import SettingsView from './views/settings.view';

// ----------------------------------------------------------------------

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
          name="Main"
          component={MainView}
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
