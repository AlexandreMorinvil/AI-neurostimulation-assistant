import React from 'react';
import Swiper from 'react-native-swiper';

import PanelFrame from '../panel-frame.component';
import VizualizationTremor2dGraph from "./visualization-tremor-2d-graph.component";
import VizualizationQueryHeatMap from "./vizualization-query-heat-map.component";
import VizualizationQuery2dGraph from "./visualization-query-2d-graph.component";

ref = React.createRef();

const PanelVisualization = () => {

  /**
   * Render
   */
  return (
    <PanelFrame>
      <Swiper>
        <VizualizationTremor2dGraph />
        <VizualizationQueryHeatMap ref={ref} />
        <VizualizationQuery2dGraph />
      </Swiper>
    </PanelFrame>
  );
}

export default PanelVisualization