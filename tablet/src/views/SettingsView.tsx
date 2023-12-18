import { StyleSheet, ScrollView } from 'react-native';
import { BoxSmartwatchConnection
} from '@components/settings/boxSmartwatchConnection/BoxSmartwatchConnection';
import { COLOR_BACKGROUND } from '@styles/colorStyles';

const SettingsView = () => {

  /**
   * Render
   */
  return (
    <ScrollView style={styles.viewContainer}>
      <BoxSmartwatchConnection />
    </ScrollView>
  );
};

  /**
   * Stylesheet
   */
const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: COLOR_BACKGROUND.Application,
    flex: 1,
  },
});

export default SettingsView;
