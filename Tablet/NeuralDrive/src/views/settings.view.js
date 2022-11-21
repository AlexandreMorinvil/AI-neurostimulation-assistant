import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { COLOR_BACKGROUND } from '../styles/colors.style.js';
import SettingsMenuItemConnectionBackend from '../components/settings/menu-item-connection-backend/menu-item-connection-backend.component';
import SettingsMenuItemConnectionWatch from '../components/settings/menu-item-connection-watch/menu-item-connection-watch.component';
import SettingsMenuItemPatient from '../components/settings/menu-item-patient/menu-item-patient.component';
import SettingsMenuItemProblemDimension from '../components/settings/menu-item-pronlem-dimensions/menu-item-problem-dimensions.component';

const SettingsView = () => {
  
  return (
    <ScrollView style={styles.viewContainer}>
      <SettingsMenuItemPatient />
      <SettingsMenuItemConnectionBackend />
      <SettingsMenuItemConnectionWatch />
      <SettingsMenuItemProblemDimension />
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: COLOR_BACKGROUND.Application,
    flex: 1,
    padding: 10,
  },
});

export default SettingsView;
