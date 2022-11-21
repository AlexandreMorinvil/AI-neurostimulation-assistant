import React from 'react';
import Swiper from 'react-native-swiper';

import { Surface } from 'react-native-paper';

import VizualizationTremor2dGraph from "./visualization-tremor-2d-graph.component";
import VizualizationQueryHeatMap from "./vizualization-query-heat-map.component";
import VizualizationQuery2dGraph from "./visualization-query-2d-graph.component";

import * as Structures from "../../Structures";

ref = React.createRef();

const PanelVisualization = () => {
  return (
    <Structures.FlexContainer>
      <Surface color="red" style={{ display: 'flex', borderRadius: 25 }}>
        <Swiper>
          <VizualizationTremor2dGraph />
          <VizualizationQueryHeatMap ref={ref} />
          <VizualizationQuery2dGraph />
        </Swiper>
      </Surface>
    </Structures.FlexContainer>
  );
}

export default PanelVisualization