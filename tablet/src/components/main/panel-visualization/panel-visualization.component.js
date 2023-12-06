import Swiper from 'react-native-swiper';

import PanelFrame from '../panel-frame.component';
import PanelItemVizualizationTremor2dGraph from "./panel-item-visualization-tremor-2d-graph/panel-item-visualization-tremor-2d-graph.component";
// import PanelItemVizualizationQueryHeatMap from "./panel-item-vizualization-query-heat-map/panel-item-vizualization-query-heat-map.component";
// import PanelItemVizualizationQuery2dGraph from "./panel-item-vizualization-query-2d-graph/panel-item-visualization-query-2d-graph.component";

const PanelVisualization = () => {

  /**
   * Render
   */
  return (
    <PanelFrame>
      <Swiper>
        <PanelItemVizualizationTremor2dGraph />
        {/* TODO: Reintigrate when the graph generation is reimplemented
        <PanelItemVizualizationQueryHeatMap /> */}
        {/* TODO: Reintigrate when the graph generation is reimplemented
        <PanelItemVizualizationQuery2dGraph /> */}
      </Swiper>
    </PanelFrame>
  );
}

export default PanelVisualization