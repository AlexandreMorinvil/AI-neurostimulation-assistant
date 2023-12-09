import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import * as databaseTestService from './test-database.service';

import { smartWatchService } from 'src/services/smartWatchService';

import { Button } from 'react-native-paper';

const TestView = () => {
  /**
   * States
   */
  const [stateIsConnected, setStateIsConnected] = useState(smartWatchService.isConnected);

  /**
   * Functions
   */
  const updateConnectionStatus = (isConnected: boolean) => {
    setStateIsConnected(isConnected);
  }

  /**
   * Effects
   */
  useEffect(() => {    
    // Subscriptions
    const subscription = smartWatchService.subscribeToConnectionStatus(
      updateConnectionStatus
    );
    
    // Cleanup
    return function cleanup() {
      subscription.unsubscribe()
    }
  }, []);


  /**
   * Render
   */
  return (
      <View>
        <Text style={styles.testArea}> {"Is smart watch connected: " + stateIsConnected } </Text>

        <Button 
          style={styles.testButton}
          onPress={() => { smartWatchService.connect() }}
        >
          <Text> {"Connect to Smartwatch"} </Text> 
        </Button>

        <Button 
          style={styles.testButton}
          onPress={() => { smartWatchService.destroy() }}
        >
          <Text> {"Disconnect from Smartwatch"} </Text> 
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
