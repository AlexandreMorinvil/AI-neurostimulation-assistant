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
    [1, 'purple'],
    [2, 'cyan'],
    [3, 'yellow'],
    [4, 'orange'],
    [5, 'red'],
    [6, 'red'],
    [7, 'red'],
    [8, 'red'],
    [9, 'red'],
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
    this.current_algorithm = algorithm;
    //console.log('draw ++++++++++++++++++++++', this.current_algorithm.data[0]);
    this.clear_canvas();
    dx = this.ctx.canvas.width / algorithm.dimention;
    dy = this.ctx.canvas.height / algorithm.dimention;
    index_x = 0;
    index_y = 0;

    for (var i = 0; i < Math.pow(algorithm.dimention, algorithm.n_param); i++) {
      x = index_x * dx;
      y = index_y * dy;

      this.createRectangle(
        dx,
        dy,
        x,
        y,
        this.getHeatColor(this.current_algorithm.data[i][1]),
      );

      index_x++;
      if (index_x >= algorithm.dimention) {
        index_x = 0;
        index_y++;
      }
    }
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
      backgroundColor: 'white',
    },
    canvas_box: {
      backgroundColor: 'pink',
      width: '100%',
      height: '100%',
    },
  });
}

export default Canva;
