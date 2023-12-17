import { ScrollView } from "react-native";
import { BoxSensorsSummary } from "./boxSensorsSummary/BoxSensorSummary";

export const PanelVisualization = () => {

  /**
   * Render
   */
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <BoxSensorsSummary />
    </ScrollView>
  );
}
