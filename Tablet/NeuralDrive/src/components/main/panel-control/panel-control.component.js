import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import PanelItemConnection from "./panel-item-connection/panel-item-connection.component";
import PanelItemParameters from "./panel-item-parameters/panel-item-parameters.component";
import PanelItemSession from "./panel-item-session/panel-item-session.component";
import PanelItemStatistics from "./panel-item-statistics/panel-item-statistics.component";
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
        <PanelItemConnection />
        <PanelItemSession />
        <PanelItemParameters />
        <PanelItemStatistics />
      </ScrollView>
    </PanelFrame>
  );
};

export default PanelControl;