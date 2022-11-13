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
import {get_watch_data} from '../class/http';
import {
  set_patient_level,
  smartwatch_is_disconnected,
  smartwatch_is_connected,
  get_smartwatch_connected,
  get_allow_get_watch_data,
} from '../class/const';

const max_size = 150;
watch_is_connected = false;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const avrageXYZ = (acc_x, acc_y, acc_z) => {
  return (Math.abs(acc_x) + Math.abs(acc_y) + Math.abs(acc_z)) / 3;
};

const tab_avrageXYZ = tab => {
  let avrage = 0;
  for (let i = 0; i < tab.length; i++) {
    avrage += tab[i];
  }
  return avrage / tab.length;
};

j = 0;

saveData = new Array();
export function Chart() {
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
      //if (false) {
      if (get_allow_get_watch_data()) {
        const watch_data = await get_watch_data();
        let temp = watch_data;
        if (temp) {
          smartwatch_is_connected();
          console.log('lenght = ', temp.length);
          temp_array = new Array();
          for (let i = 0; i < temp.length; i++) {
            if (data.length > graph_size) {
              data.shift();
              data2.shift();
            }
            let avrage = avrageXYZ(
              Number(temp[i].acc_x),
              Number(temp[i].acc_y),
              Number(temp[i].acc_z),
            );
            data.push(avrage);
            //saveData.push(avrage);
            temp_array.push(avrage);
          }
          let tab_avrage = tab_avrageXYZ(temp_array);
          for (let i = 0; i < temp_array.length; i++) {
            data2.push(tab_avrage);
          }
          set_patient_level(tab_avrage.toFixed(2));
        } else {
          smartwatch_is_disconnected();
        }
        j++;
        //console.log('saveData lenght = ', saveData.length);
        setValue(value => value + 1);
      }
    }, 400);

    return () => clearInterval(interval);
  });

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
              svg: {stroke: 'red', strokeWidth: 3},
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
