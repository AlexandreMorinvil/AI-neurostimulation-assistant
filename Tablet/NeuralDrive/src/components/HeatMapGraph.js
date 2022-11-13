import React, {useEffect, useState} from 'react';
import {LineChart, YAxis, XAxis, Path, Grid} from 'react-native-svg-charts';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import MainModules from '../components/MainModules.js';
import {
  get_heat_map_data,
  get_dimension_of_chart,
  get_chosen_param_2D,
} from '../class/const';

export function HeatMapGraph() {
  array = new Array();
  const [initialData, setInitialData] = useState(array);
  const [dataMean, setDataMean] = useState(array);
  const [dimension, setDimension] = useState(10);
  const [chosenParam, setChosenParam] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      updateData(
        get_heat_map_data(),
        get_dimension_of_chart(),
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
  //if we want it for more then 2 params
  /*function calculate_mean(array, sum){
    if (array.lenght === 1){
        sum+=array
        
    }
    var current_dimension;
    for (i = 0; i>array.lenght; i++){
        current_dimension = array[i];
        calculate_mean(current_dimension);
    }
    return current_dimension;
  }*/
  return (
    <View style={styles.chartView}>
      <View style={styles.lineChart}>
        <YAxis
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
        </LineChart>
      </View>
      <XAxis
        style={{marginHorizontal: '5%', width: '93%'}}
        data={dataMean}
        formatLabel={(value, index) => index}
        contentInset={{left: 10, right: 10}}
        svg={{fontSize: 18, fill: 'grey'}}
      />
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

export default HeatMapGraph;
