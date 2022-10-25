import React, {Component, useRef} from 'react';
import {Text, View, Dimensions, StyleSheet} from 'react-native';
import Canvas from 'react-native-canvas';

class Canva extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const ctx = this.ref.current.getContext('2d');
    ctx.fillStyle = 'purple';
    ctx.width = Dimensions.get('window').width;
    ctx.height = Dimensions.get('window').height;
    ctx.fillRect(0, 0, ctx.width, ctx.height);
    console.log('CANVAS REF', this.ref);
    this.forceUpdate();
  }

  render() {
    return (
        <Canvas
          ref={this.ref}
          style={this.styles.box}
          width={Dimensions.get('window').width}
          height={Dimensions.get('window').height}
        />
    );
  }

  styles = StyleSheet.create({
    box: {
      width: '100%',
      height: '100%',
      backgroundColor: '#d9d9d9',
      padding: 20,
      borderRadius: 25,
    },
  });
}

export default Canva;
