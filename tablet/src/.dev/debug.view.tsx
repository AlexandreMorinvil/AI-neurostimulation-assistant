import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { socketService } from './test-socket.service';
import * as databaseTestService from './test-database.service';

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
          onPress={() => { 
            socketService.send("HERE IS A TEXT EXAMPLE") }}
        >
          <Text> {"Socket Test"} </Text> 
        </Button>

        <Button 
          style={styles.testButton}
          onPress={() => { databaseTestService.databaseSetupTests() }}
        >
          <Text> {"Database initialization test"} </Text> 
        </Button>

        <Button 
          style={styles.testButton}
          onPress={() => { databaseTestService.insertTester() }}
        >
          <Text> {"Database insert test"} </Text> 
        </Button>

        <Button 
          style={styles.testButton}
          onPress={() => { databaseTestService.testRetreiveQuery() }}
        >
          <Text> {"Database retreive test"} </Text> 
        </Button>

        <Button 
          style={styles.testButton}
          onPress={() => { databaseTestService.closeRealmDatabase() }}
        >
          <Text> {"Close Realm database"} </Text> 
        </Button>

        <Button 
          style={styles.testButton}
          onPress={() => { databaseTestService.deleteRealmDatabase() }}
        >
          <Text> {"Database deletion"} </Text> 
        </Button>

        <Button 
          style={styles.testButton}
          onPress={() => { databaseTestService.generateUniqueId() }}
        >
          <Text> {"Generate Unique ID"} </Text> 
        </Button>
      </View>
  );
};

const styles = StyleSheet.create({
  testArea: {
    backgroundColor: 'turquoise',
    margin: 20
  },
  testButton: {
    backgroundColor: 'pink',
    margin: 20,
  }
});

export default TestView;
