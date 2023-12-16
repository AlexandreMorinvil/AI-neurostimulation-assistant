import { StyleSheet, View } from 'react-native';
import { DataTable } from '@components/database/DataTable';
import { COLOR_BACKGROUND } from '@styles/colorStyles.js';

export const DataManagementView = () => {

  /**
   * Render
   */
  return (
    <View style={styles.viewContainer}>
      <DataTable style={styles.dataTable} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND.Application,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  dataTable: {
    flex: 1,
    alignSelf: 'stretch',
  },
});