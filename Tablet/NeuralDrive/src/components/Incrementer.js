import React from 'react';
import {Text, TextInput, View, Button} from 'react-native';

class Incrementer extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }
  incrementCount() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
  decrementCount() {
    this.setState({
      counter: this.state.counter - 1,
    });
  }
  render() {
    return (
      <View>
        <Text>Count: {this.state.counter}</Text>
        <Button title="-" onPress={this.decrementCount.bind(this)}></Button>
        <Button title="+" onPress={this.incrementCount.bind(this)}></Button>
      </View>
    );
  }
}

export default Incrementer;
