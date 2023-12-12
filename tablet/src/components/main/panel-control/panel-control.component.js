import { ScrollView } from 'react-native';

// import PanelItemParameters from "./panel-item-parameters/panel-item-parameters.component";
import { BoxSessionManagement } from "./BoxSessionManagement/BoxSessionManagement";
// import PanelItemResults from "./panel-item-results/panel-item-results.component";
import PanelFrame from '../panel-frame.component';

const PanelControl = (props) => {

  /**
   * Props
   */
  const { style } = props;

  /**
   * Render
   */
  return (
    <PanelFrame style={style}>
      <ScrollView>
        <BoxSessionManagement />
        {/* TODO: Update this component
        <PanelItemParameters /> */}
        {/* TODO: Update this component
        <PanelItemResults /> */}
      </ScrollView>
    </PanelFrame>
  );
};

export default PanelControl;