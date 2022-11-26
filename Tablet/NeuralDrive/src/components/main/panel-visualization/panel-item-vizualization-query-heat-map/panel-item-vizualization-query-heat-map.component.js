import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from "react-native";
import { Image } from 'react-native-elements';

import PanelVizualizationItem from "../panel-vizualization-item.component";
import * as queryVizualizationService from "../../../../services/query-vizualization.service";

const TITLE_VISUALIZATION = "Dual Parameter Influence";

const PanelItemVizualizationQueryHeatMap = () => {

  /**
   * States
   */
  const [stateHeatmapBase64JpegImageData, setStateHeatmapBase64JpegImageData] = useState("");
  const [stateIsLoading, setStateIsLoading] = useState(true);

  /**
   * Functions
   */
  const updateHeatMap = () => {
    setStateHeatmapBase64JpegImageData(queryVizualizationService.getHeatmapBase64JpegImageData());
    if (queryVizualizationService.getIsLoadingHeatmap() ||
      queryVizualizationService.hasNoLoadedHeatmap()) {
      setStateIsLoading(true);
    } else
      setStateIsLoading(false);
  }

  /**
   * Effects
   */
  useEffect(() => {
    // Initialization
    updateHeatMap();

    // Reactive subcribtion
    const subscription = queryVizualizationService.subjectHeatmap.subscribe({
      next: updateHeatMap
    });

    // Cleanup
    return function cleanup() {
      subscription.unsubscribe()
    }
  }, []);

  /**
   * Render
   */
  return (
    <PanelVizualizationItem title={TITLE_VISUALIZATION}>
      {stateIsLoading ?
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
        /> :
        <Image
          source={{ uri: `data:image/jpeg;base64,${stateHeatmapBase64JpegImageData}` }}
        />
      }
    </PanelVizualizationItem>
  );
}

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  activityIndicator: {
    height: "100%",
    width: "100%",
  }
});

export default PanelItemVizualizationQueryHeatMap;
