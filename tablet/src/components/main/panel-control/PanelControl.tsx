import { ScrollView } from 'react-native';
import { BoxSessionManagement } from "./BoxSessionManagement/BoxSessionManagement";

export const PanelControl = () => {

  /**
   * Render
   */
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <BoxSessionManagement />
    </ScrollView>
  );
};