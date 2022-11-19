import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import SettingsMenuItemPatient from '../components/settings/menu-item-patient/menu-item-patient.component';
import SettingsMenuItemConnectionBackend from '../components/settings/menu-item-connection-backend/menu-item-connection-backend.component';
import SettingsMenuItemConnectionWatch from '../components/settings/menu-item-connection-watch/menu-item-connection-watch.component';

const SettingsView = () => {
  
  return (
    <ScrollView style={styles.viewContainer}>
      <SettingsMenuItemPatient />
      <SettingsMenuItemConnectionBackend />
      <SettingsMenuItemConnectionWatch />
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: 10,
  },
});

export default SettingsView;
