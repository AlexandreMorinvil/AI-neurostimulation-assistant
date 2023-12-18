import { ScrollView, StyleSheet } from 'react-native';
import { BoxDataTable } from '@components/database/boxDataTable/BoxDataTable';
import { COLOR_BACKGROUND } from '@styles/colorStyles';

export const DataManagementView = () => {

  /**
   * Render
   */
  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <BoxDataTable />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: COLOR_BACKGROUND.Application,
    flex: 1,
  },
});