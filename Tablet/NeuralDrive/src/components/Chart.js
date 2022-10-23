import React, {useEffect, useState} from 'react';
import {LineChart, YAxis, Path, Grid} from 'react-native-svg-charts';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import MainModules from '../components/MainModules.js';
import {get_watch_data} from '../class/http';
import {
  set_patient_level,
  smartwatch_is_disconnected,
  smartwatch_is_connected,
  get_smartwatch_connected,
} from '../class/const';

const max_size = 150;
watch_is_connected = false;

const add_point = (data, dataSet) => {
  for (let i = 0; i < data.length; i++) {
    if (dataSet.length > max_size) {
      dataSet.shift();
    }
    dataSet.push(data[i].acc_y);
  }
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
      if (true) {
        const watch_data = await get_watch_data();
        if (watch_data) {
          if (watch_data.length < 50) {
            smartwatch_is_connected();
            console.log('lenght = ', watch_data.length);
            temp_array = new Array();
            for (let i = 0; i < watch_data.length; i++) {
              setData(data => {
                let arr = data;
                if (arr.length > graph_size) {
                  arr.shift();
                }
                arr.push(Number(watch_data[i].acc_y));
                temp_array.push(Number(watch_data[i].acc_y));
                return arr;
              });
            }
            setData2(data2 => {
              let max = Math.max.apply(null, temp_array);
              let arr = data2;
              arr.fill(max);
              set_patient_level(max.toFixed(2));
              return arr;
            });

            setValue(value => value + 1);
          }
        } else {
          smartwatch_is_disconnected();
        }
      }
      j++;
      //console.log('j = ', j);
      //forceUpdate();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.lineChart}>
      <YAxis
        style={styles.axis}
        data={data}
        //contentInset={contentInset}
        svg={{
          fill: 'grey',
          fontSize: 20,
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
        contentInset={{top: 20, bottom: 20}}></LineChart>
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
  axis: {
    width: '5%',
    height: '100%',
  },
  chart: {
    width: '95%',
    height: '100%',
  },
});

export default Chart;
