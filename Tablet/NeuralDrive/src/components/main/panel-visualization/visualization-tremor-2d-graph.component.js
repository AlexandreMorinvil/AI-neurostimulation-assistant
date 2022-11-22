import React, { useEffect, useState } from 'react';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import { StyleSheet, View } from 'react-native';

import PanelVizualizationItem from "./panel-vizualization-item.component";
import * as watchDataService from "../../../services/watch-data.service";

const VISUALIZATION_TITLE = "Vizualization : Real Time Tremor";

const COUNT_DATA_POINTS = 500;

const Y_MIN_VALUE = 0;
const Y_MAX_VALUE = 10;

const X_POINT_TIME_INTERVAL = 10;

const REFRESH_RATE_IN_MS = 150;

const CONTENT_INSET = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20
}

export function VizualizationTremor2dGraph() {

  /**
   * States
   */
  const [stateTremorRawData, setStateTremorRawData] = useState([0, 1, 2, 3, 4, 5, 6, 7,]);
  const [stateTremorAveragedData, setStateTremorAveragedData] = useState([1 / 2, 2 / 2, 3 / 2, 4 / 2, 5 / 2, 6 / 2, 7 / 2, 8 / 2, 9 / 2, 10 / 2, 11 / 2]);

  /**
   * Function 
   */
  const updateGraph = () => {
    setStateTremorRawData(watchDataService.getWatchPointsToDisplay(COUNT_DATA_POINTS));
    setStateTremorAveragedData(Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)));
  }

  /**
   * Effects
   */
  useEffect(() => {
    const intervalUniqueId = setInterval(updateGraph, REFRESH_RATE_IN_MS);
    return () => clearInterval(intervalUniqueId);
  }, []);

  /**
   * Render
   */
  return (
    <PanelVizualizationItem title={VISUALIZATION_TITLE}>
      <View style={styles.container}>
        <View style={styles.lineChart}>
          <YAxis
            style={styles.axis}
            data={[Y_MIN_VALUE, Y_MAX_VALUE]}
            min={Y_MIN_VALUE}
            max={Y_MAX_VALUE}
            numberOfTicks={10}
            svg={{
              fill: 'black',
              fontSize: 18,
            }}
            contentInset={CONTENT_INSET}
          />
          <LineChart
            style={styles.chart}
            gridMin={Y_MIN_VALUE}
            gridMax={Y_MAX_VALUE}
            ticks={11}
            data={[
              {
                data: stateTremorRawData,
                svg: { stroke: 'black', strokeWidth: 2 },
              },
              {
                data: stateTremorAveragedData,
                svg: { stroke: 'blue', strokeWidth: 3 },
              },
            ]}
            svg={{ stroke: 'black' }}
            contentInset={CONTENT_INSET}
          >
            <Grid />
          </LineChart>
        </View>
        <XAxis
          style={{ marginHorizontal: '3%', width: '93%' }}
          data={stateTremorRawData}
          numberOfTicks={5}
          formatLabel={(value, index) => { return `${(index * X_POINT_TIME_INTERVAL)}s `; }}
          contentInset={CONTENT_INSET}
          svg={{ fontSize: 18, fill: 'black' }}
        />
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
    flexDirection: "column",
    flexDirection: 'column',
  },
  lineChart: {
    flex: 1,
    flexDirection: "column",
    flexDirection: 'row',
  },
  chart: {
    flex: 1,
  },
});

export default VizualizationTremor2dGraph;
