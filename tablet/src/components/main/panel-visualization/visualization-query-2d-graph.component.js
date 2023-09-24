import React, {useEffect, useState} from 'react';
// import {LineChart, YAxis, XAxis, Grid} from 'react-native-svg-charts';
import {StyleSheet, View} from 'react-native';
import {get_heat_map_data, get_chosen_param_2D} from '../../../class/const';

import * as problemDimensionService from '../../../services/problem-dimension.service';

export function VizualizationQuery2dGraph() {
  array = new Array();
  const [initialData, setInitialData] = useState(array);
  const [dataMean, setDataMean] = useState(array);
  const [dimension, setDimension] = useState(10);
  const [chosenParam, setChosenParam] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      updateData(
        get_heat_map_data(),
        problemDimensionService.getProblemDimension(),
        get_chosen_param_2D(),
      );
    }, 1000);
    return () => clearInterval(interval);
  });

  function updateData(data, dimension, param) {
    setInitialData(data);
    setDimension(dimension);
    setChosenParam(param);
    calculate_mean();
  }

  function calculate_mean() {
    temp = [];
    if (chosenParam == 0) {
      for (i = 0; i < dimension; i++) {
        sum = 0;
        for (j = 0; j < initialData.length; j += dimension) {
          position = i + j;
          sum += initialData[position][1];
        }
        mean = sum / dimension;
        temp[i] = mean;
      }
    } else if (chosenParam == 1) {
      tempPos = 0;
      for (i = 0; i < initialData.length; i += dimension) {
        sum = 0;
        for (j = 0; j < dimension; j++) {
          position = i + j;
          sum += initialData[position][1];
        }
        mean = sum / dimension;
        temp[tempPos] = mean;
        tempPos++;
      }
    }
    setDataMean(temp);
  }

  return (
    <View style={styles.chartView}>
      <View style={styles.lineChart}>
        {/* <YAxis
        
          // TODO: REIMPLEMENT USING SOMETHING DIFFERENT FROM react-native-svg-chart

          style={styles.axis}
          data={dataMean}
          svg={{
            fill: 'grey',
            fontSize: 18,
          }}
          numberOfTicks={10}
          formatLabel={value => `${value}`}
        />
        <LineChart
          style={styles.chart}
          data={dataMean}
          svg={{stroke: 'black'}}
          contentInset={{top: 20, bottom: 20}}>
          <Grid />
        </LineChart> */}
      </View>
      {/* <XAxis
        style={{marginHorizontal: '5%', width: '93%'}}
        data={dataMean}
        formatLabel={(value, index) => index}
        contentInset={{left: 10, right: 10}}
        svg={{fontSize: 18, fill: 'grey'}}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  lineChart: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  chartView: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  axis: {
    width: '4%',
    height: '100%',
  },
  chart: {
    width: '95%',
    height: '100%',
  },
});

export default VizualizationQuery2dGraph;
