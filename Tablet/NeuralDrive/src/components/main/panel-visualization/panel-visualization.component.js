import React from 'react';
import { StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { Surface } from 'react-native-paper';

import PanelFrame from '../panel-frame.component';
import VizualizationTremor2dGraph from "./visualization-tremor-2d-graph.component";
import VizualizationQueryHeatMap from "./vizualization-query-heat-map.component";
import VizualizationQuery2dGraph from "./visualization-query-2d-graph.component";

ref = React.createRef();

const PanelVisualization = (props) => {

  /**
   * Props
   */
  const { style } = props;

  /**
   * Render
   */
  return (
    <PanelFrame style={style}>
      <Swiper>
        <VizualizationTremor2dGraph />
        <VizualizationQueryHeatMap ref={ref} />
        <VizualizationQuery2dGraph />
      </Swiper>
    </PanelFrame>
  );
}

export default PanelVisualization