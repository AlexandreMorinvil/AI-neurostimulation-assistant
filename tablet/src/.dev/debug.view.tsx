import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import * as databaseTestService from './test-database.service';
import { smartwatchService } from 'src/services/smartwatchService';

import { AccelerometerPointsSummary } from './SensorPointsSummary';

const TestView = () => {
  /**
   * States
   */


  /**
   * Functions
   */

  /**
   * Effects
   */

  /**
   * Render
   */
  return (
      <View>
        <Button 
          style={styles.testButton}
          onPress={() => { smartwatchService.connect() }}
        >
          <Text> {"Connect to Smartwatch"} </Text> 
        </Button>

        <Button 
          style={styles.testButton}
          onPress={() => { smartwatchService.destroy() }}
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

        <View style={styles.graphArea}>
          <AccelerometerPointsSummary />
        </View>
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
  },
  graphArea: {
    height: 400,
    width: 400,
    backgroundColor: 'lightgrey',
    padding: 30,
  }
});

export default TestView;
