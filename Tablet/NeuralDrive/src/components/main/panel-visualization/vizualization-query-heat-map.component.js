import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-elements';
import {Text} from 'react-native-paper';

class HeatMap extends React.Component {
  state = {
    data: '',
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
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
              uri: `data:image/jpeg;base64,${this.state.data}`,
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

export default HeatMap;
