import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import {Text} from 'react-native-paper';

class HeatMap extends React.Component {
  current_algorithm = {
    n_param: 2,
    dimention: 100,
    data: '',
    position: [],
  };

  constructor(props) {
    super(props);
  }

  draw_heat_map() {
    this.forceUpdate();
  }

  render() {
    return (
      <View>
        <View>
          <Text variant="titleLarge"> HeatMap </Text>
        </View>
        <View>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${this.current_algorithm.data}`,
            }}
            style={this.styles.box}
          />
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    box: {
      width: '95%',
      height: '95%',
      margin: 10,
    },
    canvas_box: {
      // backgroundColor: 'pink',
      width: '100%',
      height: '100%',
    },
  });
}

// we will create the new component HeatMapComponent that is the same as HeatMap but will be a functional component instead of a class component

export default HeatMap;
