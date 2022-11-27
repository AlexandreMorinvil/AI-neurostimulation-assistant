import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Image } from 'react-native-elements';

import PanelVizualizationItem from "../panel-vizualization-item.component";
import * as queryVizualizationService from "../../../../services/query-vizualization.service";

const TITLE_VISUALIZATION = "Averaged Parameter Effect";

const PanelItemVizualizationQuery2dGraph = () => {

  /**
   * States
   */
  const [state2dGraohBase64JpegImageData, setState2dGraohBase64JpegImageData] = useState("");
  const [stateIsLoading, setStateIsLoading] = useState(true);

  /**
   * Functions
   */
  const updateParameterGraph = () => {
    setState2dGraohBase64JpegImageData(queryVizualizationService.getParameterGraphBase64JpegImageData());
    if (queryVizualizationService.getIsLoadingParameterGraph() ||
      !queryVizualizationService.hasLoadedParameterGraph()) {
      setStateIsLoading(true);
    } else
      setStateIsLoading(false);
  }

  /**
   * Effects
   */
  useEffect(() => {
    // Initialization
    updateParameterGraph();

    // Reactive subcribtion
    const subscription = queryVizualizationService.subjectParameterGraph.subscribe({
      next: updateParameterGraph
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
      <View style={styles.container}>
        {stateIsLoading ?
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
          /> :
          <Image
            source={{ uri: `data:image/jpeg;base64,${state2dGraohBase64JpegImageData}` }}
            resizeMode='contain'
            style={styles.image}
          />
        }
      </View>
    </PanelVizualizationItem>
  );
}

/**
 * Style Sheet
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    overflow: 'hidden',
  },
  activityIndicator: {
    height: "100%",
    width: "100%",
  },
  image: {
    flex: 1,
    height: "100%",
    minWidth: 700,
  }
});

export default PanelItemVizualizationQuery2dGraph;
