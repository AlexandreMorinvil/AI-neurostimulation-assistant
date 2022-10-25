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

class Chart extends Component {
  dataSet = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
  ];

  labelsSet = Array.from(Array(6).keys());
  //update() {}

  add_point() {
    for (let i = 0; i < 50; i++) {
      if (this.labelsSet.length > 200) {
        this.labelsSet.shift();
      }
      if (this.dataSet.length > 200) {
        this.dataSet.shift();
      }
      this.labelsSet.push(this.labelsSet[this.labelsSet.length - 1] + 1);
      this.dataSet.push(Math.random() * 100);
    }
    console.log(this.dataSet);
    console.log(this.labelsSet);
    this.forceUpdate();
  }

  render() {
    return (
      <MainModules.FlexContainer borderRadius={'25px'}>
        <LineChart
          data={{
            labels: this.labelsSet,
            datasets: [
              {
                data: this.dataSet,
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.49} from react-native
          height={Dimensions.get('window').height * 0.9}
          // width='100%'
          // height='100%'
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
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
