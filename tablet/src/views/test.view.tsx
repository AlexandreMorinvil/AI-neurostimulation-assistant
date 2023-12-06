import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { socketService } from '../services/socket.service';

import { Button } from 'react-native-paper';

const TestView = () => {
  /**
   * States
   */

  /**
   * Functions
   */
  const initializeSocket = () => {
    console.log('Got inside the function in the component');
    socketService.testFunction()
  };

  /**
   * Effects
   */
  useEffect(() => {
    initializeSocket();
  }, []);

  /**
   * Render
   */
  return (
      <View>
        <Text style={styles.testArea}> {"HERE IS A TEXT EXAMPLE"} </Text>
        <Button 
          style={styles.testButton}
          onPress={() => { socketService.send("HERE IS A TEXT EXAMPLE") }}
        >
          <Text> {"HERE IS A BUTTON"} </Text> 
        </Button>
      </View>
  );
};

const styles = StyleSheet.create({
  testArea: {
    backgroundColor: 'pink',
    margin: 20
  },
  testButton: {
    backgroundColor: 'pink',
    margin: 20,
  }
});

export default TestView;
