import { StyleSheet, ScrollView } from 'react-native';

import { COLOR_BACKGROUND } from '../styles/colorStyles.js';
import { BoxSmartwatchConnection
} from '@components/settings/boxSmartwatchConnection/BoxSmartwatchConnection';
// import SettingsMenuItemConnectionBackend from '../components/settings/menu-item-connection-backend/menu-item-connection-backend.component';
// import SettingsMenuItemPatient from '../components/settings/menu-item-patient/menu-item-patient.component';
// import SettingsMenuItemProblemDimensionType from '../components/settings/menu-item-pronlem-dimension-type/menu-item-problem-dimension-type.component';

const SettingsView = () => {
  return (
    <ScrollView style={styles.viewContainer}>
      <BoxSmartwatchConnection />
      {/* TODO: Update this component 
      <SettingsMenuItemProblemDimensionType /> */}
      {/* <SettingsMenuItemPatient /> */}
      {/* TODO: Update this component  
      <SettingsMenuItemConnectionBackend /> */}
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
