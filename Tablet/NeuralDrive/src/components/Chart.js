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
import {get_watch_data} from '../class/http';
import {
  set_patient_level,
  smartwatch_is_disconnected,
  smartwatch_is_connected,
  get_smartwatch_connected,
} from '../class/const';

const max_size = 150;
watch_is_connected = false;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

j = 0;
export function Chart() {
  //const [position, setPosition] = useState(graph_size);

  // const interval = setInterval(async () => {
  //   watch_data = await get_watch_data();
  //   if (watch_data) {
  //     console.log(watch_data[0]);
  //     this.add_point(watch_data, dataSet);
  //   }
  // }, 1000);
  //console.log('j = ', j);
  const graph_size = 500;
  array = new Array(graph_size);
  array.fill(0);
  const array2 = new Array(graph_size);
  array2.fill(5);
  const [data, setData] = useState(array);
  const [data2, setData2] = useState(array2);
  const [value, setValue] = useState(0);
  const [position, setPosition] = useState(graph_size);
  useEffect(() => {
    const interval = setInterval(async () => {
      const watch_data = await get_watch_data();
      let temp = watch_data;
      if (temp) {
        smartwatch_is_connected();
        console.log('lenght = ', temp.length);
        temp_array = new Array();
        for (let i = 0; i < temp.length; i++) {
          if (data.length > graph_size) {
            data.shift();
          }
          data.push(Number(temp[i].acc_y));
          temp_array.push(Number(temp[i].acc_y));
        }
        let max = Math.max.apply(null, temp_array);
        data2.fill(max);
        set_patient_level(max.toFixed(2));
      } else {
        smartwatch_is_disconnected();
      }
      j++;
      setValue(value => value + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [data, value]);

  return (
    <View style={styles.chartView}>
      <View style={styles.lineChart}>
        <YAxis
          style={styles.axis}
          data={data}
          //contentInset={contentInset}
          svg={{
            fill: 'black',
            fontSize: 18,
          }}
          numberOfTicks={10}
          formatLabel={value => `${value}`}
        />
        <LineChart
          style={styles.chart}
          data={[
            {
              data: data,
              svg: {stroke: 'black'},
            },
            {
              data: data2,
              svg: {stroke: 'red'},
            },
          ]}
          svg={{stroke: 'black'}}
          contentInset={{top: 20, bottom: 20}}>
          <Grid />
        </LineChart>
      </View>
      <XAxis
        style={{marginHorizontal: '5%', width: '93%'}}
        data={data}
        formatLabel={(value, index) => {
          if (index % 50 == 0) {
            return `${(graph_size - index) / 50}s`;
          }
          return '';
        }}
        contentInset={{left: 10, right: 10}}
        svg={{fontSize: 18, fill: 'black'}}
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

export default Chart;
