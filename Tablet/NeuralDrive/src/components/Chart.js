import React, {Component} from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {Text, Dimensions, Button, View} from 'react-native';
import MainModules from '../components/MainModules.js';
import {get_watch_data} from '../class/http';

class Chart extends Component {
  max_size = 150;

  componentDidMount() {
    const interval = setInterval(async () => {
      watch_data = await get_watch_data();
      if (watch_data) {
        console.log(watch_data[0]);
        this.add_point(watch_data);
      }
    }, 1000);
  }

  dataSet = [0, 0, 0, 0, 0, 0];

  labelsSet = [0, 0, 0, 0, 0, 0];
  //update() {}

  add_point(data) {
    for (let i = 0; i < data.length; i++) {
      if (this.labelsSet.length > this.max_size) {
        this.labelsSet.shift();
      }
      if (this.dataSet.length > this.max_size) {
        this.dataSet.shift();
      }
      this.labelsSet.push(1);
      this.dataSet.push(data[i].acc_y);
    }
    this.forceUpdate();
  }

  render() {
    return (
      <MainModules.FlexContainer>
        <LineChart
          data={{
            labels: this.labelsSet,
            datasets: [
              {
                data: this.dataSet,
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.49}
          from
          react-native
          height={Dimensions.get('window').height * 0.9}
          // width='100%'
          // height='100%'
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 1,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 1,
            borderRadius: 1,
          }}
        />
        <Button
          title="send to server"
          onPress={() => {
            // Call Server Request Here @Noe
            this.add_point();
          }}
        />
      </MainModules.FlexContainer>
    );
  }
}

export default Chart;
