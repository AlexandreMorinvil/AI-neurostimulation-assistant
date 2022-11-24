import React, { useEffect, useState } from 'react';
import { LineChart, YAxis, XAxis, Grid } from 'react-native-svg-charts';
import { StyleSheet, View } from 'react-native';

import PanelVizualizationItem from "./panel-vizualization-item.component";
import * as tremorPointService from "../../../services/tremor-point.service";
import * as watchDataService from "../../../services/watch-data.service";

const TITLE_VISUALIZATION = "Vizualization : Real Time Tremor";
const TITLE_X_AXIS = "Time";
const TITLE_Y_AXIS = "Intensity";

const UNIT_X_AXIS = "s";
const UNIT_Y_AXIS = "m/s²";

const REFRESH_RATE_IN_MS = 200;
const COUNT_DATA_POINTS = 500;
const KEEP_POINT_FREQUENCY = 2;

const Y_MIN_VALUE = 0;
const Y_MAX_VALUE = 30;

const COUNT_X_AXIS_LABEL = 10;
const COUNT_Y_AXIS_LABEL = 10;

const CONTENT_INSET = {
  top: 20,
  left: 20,
  right: 20,
  bottom: 20
}

const TIME_INTERVAL_BETWEEN_X_AXIS_TICKS = COUNT_DATA_POINTS / COUNT_X_AXIS_LABEL * watchDataService.TIME_INTERVAL_BETWEEN_POINTS_IN_MS;

export function VizualizationTremor2dGraph() {

  /**
   * States
   */
  const [stateTremorRawData, setStateTremorRawData] = useState(Array(COUNT_DATA_POINTS).fill(0));
  const [stateTremorAveragedData, setStateTremorAveragedData] = useState(Array(COUNT_DATA_POINTS).fill(0));

  /**
   * Function 
   */
  const updateGraph = () => {
    setStateTremorRawData(tremorPointService.getScalarizedTremorPointListToDisplay(COUNT_DATA_POINTS, KEEP_POINT_FREQUENCY));
    setStateTremorAveragedData(tremorPointService.getMovingAveragePointsListToDisplay(COUNT_DATA_POINTS, KEEP_POINT_FREQUENCY));
  }

  const formatXAxisLabel = (value, index, array) => {
    if ((index + 1) === COUNT_X_AXIS_LABEL) return `${TITLE_X_AXIS} `;
    else return `${(COUNT_X_AXIS_LABEL - (index + 1)) * TIME_INTERVAL_BETWEEN_X_AXIS_TICKS / 1000} ${UNIT_X_AXIS}`;
  }

  const formatYAxisLabel = (value, index) => {
    if (value === Y_MAX_VALUE) return `${TITLE_Y_AXIS}`;
    else return `${value} ${UNIT_Y_AXIS}`;
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
    <PanelVizualizationItem title={TITLE_VISUALIZATION}>
      <View style={styles.container}>
        <View style={styles.lineChart}>
          <YAxis
            style={styles.axis}
            data={Array(COUNT_Y_AXIS_LABEL).fill(0)}
            min={Y_MIN_VALUE}
            max={Y_MAX_VALUE}
            formatLabel={formatYAxisLabel}
            numberOfTicks={COUNT_Y_AXIS_LABEL}
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
          style={{ marginHorizontal: '3%', marginLeft: '10%',  width: '87%' }}
          data={Array(COUNT_X_AXIS_LABEL).fill(0)}
          numberOfTicks={COUNT_X_AXIS_LABEL}
          formatLabel={formatXAxisLabel}
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
