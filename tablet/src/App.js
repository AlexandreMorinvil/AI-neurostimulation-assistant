import { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { cleanUp, initialize } from './services/app-setup.service';
import { COLOR_BACKGROUND, COLOR_TEXT } from './styles/colorStyles';

import { DataManagementView } from './views/DataManagementView';
import { MainView } from './views/MainView';
import SettingsView from './views/SettingsView';
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
          drawerActiveBackgroundColor: COLOR_BACKGROUND.MenuSelected,
          drawerActiveTintColor: COLOR_TEXT.DrawerItemSelected,
          drawerInactiveTintColor: COLOR_TEXT.DrawerItem,
          drawerLabelStyle: {
            marginLeft: -10,
            fontSize: 20,
            fontFamily: 'Roboto',
            fontWeight: 'bold',
          },
        }}>

        <Drawer.Screen
          name="Session Recording"
          component={MainView}
          options={{
            drawerItemStyle: { paddingLeft: 10 },
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="home"
                color={focused ? COLOR_TEXT.DrawerItemSelected : COLOR_TEXT.DrawerItem}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Data Management"
          component={DataManagementView}
          options={{
            drawerItemStyle: { paddingLeft: 10 },
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name='analytics'
                color={focused ? COLOR_TEXT.DrawerItemSelected : COLOR_TEXT.DrawerItem}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Settings"
          component={SettingsView}
          options={{
            drawerItemStyle: { paddingLeft: 10 },
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="settings-outline"
                color={focused ? COLOR_TEXT.DrawerItemSelected : COLOR_TEXT.DrawerItem}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Debug and tests"
          component={TestView}
          options={{
            drawerItemStyle: { paddingLeft: 10 },
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="code-working"
                color={focused ? COLOR_TEXT.DrawerItemSelected : COLOR_TEXT.DrawerItem}
                size={size}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer >
  );
};

export default App;
