import React from 'react';
import { ScrollView } from 'react-native';

import PanelItemParameters from "./panel-item-parameters/panel-item-parameters.component";
import PanelItemSession from "./panel-item-session/panel-item-session.component";
import PanelItemVizualizationStatus from "./panel-item-vizualization/panel-item-vizualization.component";
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
        <PanelItemSession />
        <PanelItemParameters />
        <PanelItemVizualizationStatus />
      </ScrollView>
    </PanelFrame>
  );
};

export default PanelControl;