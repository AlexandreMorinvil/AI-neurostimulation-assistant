import { StyleSheet, View } from 'react-native';
import { DataTable } from '@components/database/DataTable';
import { COLOR_BACKGROUND } from '@styles/colorStyles.js';

export const DataManagementView = () => {

  /**
   * Render
   */
  return (
    <View style={styles.viewContainer}>
      <DataTable />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: COLOR_BACKGROUND.Application,
  },
});