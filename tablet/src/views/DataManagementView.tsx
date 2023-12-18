import { ScrollView, StyleSheet } from 'react-native';
import { BoxDataTable } from '@components/data/boxDataTable/BoxDataTable';
import { BoxSessionViewer } from '@components/data/boxSessionViewer/BoxSessionViewer';
import { COLOR_BACKGROUND } from '@styles/colorStyles';

export const DataManagementView = () => {

  /**
   * Render
   */
  return (
    <ScrollView contentContainerStyle={styles.viewContainer}>
      <BoxDataTable />
      <BoxSessionViewer />
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