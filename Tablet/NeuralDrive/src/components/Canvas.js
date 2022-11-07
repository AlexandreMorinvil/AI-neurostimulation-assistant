import React, {Component, useRef} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import Canvas from 'react-native-canvas';

// export interface Algorithm {
//   n_param: number;
//   dimention: number;
//   data: number[];
//   position: number[];
// }

class Canva extends React.Component {
  ctx;
  current_algorithm = {
    n_param: 2,
    dimention: 100,
    data: [],
    position: [],
  };

  COLOR_MAP = [
    [0, 'blue'],
    [1, '#06f'],
    [2, '#0cf'],
    [3, '#0fc'],
    [4, '#0f6'],
    [5, 'lime'],
    [6, '#6f0'],
    [7, '#cf0'],
    [8, ' #fc0'],
    [9, '#f60'],
    [10, 'red'],
    [11, 'red'],
  ];

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.ctx = this.ref.current.getContext('2d');
    this.ctx.canvas.width = Dimensions.get('window').width * 0.78;
    this.ctx.canvas.height = Dimensions.get('window').height;
    console.log('width', this.ctx.canvas.width);
    this.createRectangle(this.getRandomInt(10, 50), 50, 50, 50, 'white');
    this.forceUpdate();
  }

  draw_heat_map(algorithm) {
    this.createRectangle(this.getRandomInt(10, 50), 50, 50, 50, 'red');
    //this.forceUpdate();
  }

  clear_canvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.forceUpdate();
  }

  getHeatColor(data) {
    if (data < 0) {
      return this.COLOR_MAP[0][1];
    } else {
      for (i = 1; i < this.COLOR_MAP.length - 1; i++) {
        if (data >= this.COLOR_MAP[i][0] && data <= this.COLOR_MAP[i + 1][0]) {
          return this.COLOR_MAP[i][1];
        }
      }
    }
    return this.COLOR_MAP[0][1];
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  createRectangle(dx, dy, posX, posY, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(posX, posY, dx, dy);
  }

  render() {
    return (
      <View style={this.styles.canvas_box}>
        <Canvas ref={this.ref} style={this.styles.box} />
      </View>
    );
  }

  styles = StyleSheet.create({
    box: {
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
    },
    canvas_box: {
      backgroundColor: 'pink',
      width: '100%',
      height: '100%',
    },
  });
}

export default Canva;
