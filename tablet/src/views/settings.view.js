import {StyleSheet, ScrollView} from 'react-native';

import {COLOR_BACKGROUND} from '../styles/colors.style.js';
// import SettingsMenuItemConnectionBackend from '../components/settings/menu-item-connection-backend/menu-item-connection-backend.component';
import SettingsMenuItemConnectionWatch from '../components/settings/menu-item-connection-watch/menu-item-connection-watch.component';
import SettingsMenuItemPatient from '../components/settings/menu-item-patient/menu-item-patient.component';
// import SettingsMenuItemProblemDimensionType from '../components/settings/menu-item-pronlem-dimension-type/menu-item-problem-dimension-type.component';

const SettingsView = () => {
  return (
    <ScrollView style={styles.viewContainer}>
      {/* TODO: Update this component 
      <SettingsMenuItemProblemDimensionType /> */}
      <SettingsMenuItemPatient />
      {/* TODO: Update this component  
      <SettingsMenuItemConnectionBackend /> */}
      <SettingsMenuItemConnectionWatch />
    </ScrollView>
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
