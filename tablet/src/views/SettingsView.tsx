import { StyleSheet, ScrollView } from 'react-native';
import { BoxServerConnection } from '@components/settings/boxServerConnection/BoxServerConnection';
import { BoxSmartwatchConnection
} from '@components/settings/boxSmartwatchConnection/BoxSmartwatchConnection';
import { COLOR_BACKGROUND } from '@styles/colorStyles';

export const SettingsView = () => {

  /**
   * Render
   */
  return (
    <ScrollView style={styles.viewContainer}>
      <BoxSmartwatchConnection />
      <BoxServerConnection />
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
