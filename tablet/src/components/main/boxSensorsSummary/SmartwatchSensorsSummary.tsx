import { SmartwatchAccelerometerPoint } from '@class/dataPoint/SmartwatchAccelerometerPoint';
import { SmartwatchGyroscopePoint } from '@class/dataPoint/SmartwatchGyroscopePoint';
import { textStyles } from '@styles/textStyles';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { sensorPointsService } from 'src/services/sensorPointsService';

export const SmartwatchSensorsSummary = () => {

  /**
   * Constants
   */
  const refreshTimeIntervalInMs = 200;

  /**
   * States
   */
  const [lastAccelerationPoint, setLastAccelerationPoint] =
    useState<SmartwatchAccelerometerPoint | null>(null);
  const [lastGyroscopePoint, setLastGyroscopePoint] =
    useState<SmartwatchGyroscopePoint | null>(null);

  /**
   * Functions
   */
  const formatSensorValue = (magnitude?: number|null): number => {
    return magnitude ? Number(magnitude.toFixed(5)) : 0;
  }

  /**
   * Effects
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLastAccelerationPoint(sensorPointsService.lastAccelerometerPoint);
      setLastGyroscopePoint(sensorPointsService.lastGyroscopePoint);
    }, refreshTimeIntervalInMs);
    return () => { clearInterval(intervalId) };
  }, []);


  /**
   * Render
   */
  return (
    <View style={styles.centering}>
      <View style={styles.sensorRow}>
        <Text style={[styles.sensorTitle, textStyles.default]}>{''}</Text>
        <Text style={[textStyles.default, styles.column, styles.bold]}>Magnitude</Text>
        <Text style={[textStyles.default, styles.column, styles.bold]}>X</Text>
        <Text style={[textStyles.default, styles.column, styles.bold]}>Y</Text>
        <Text style={[textStyles.default, styles.column, styles.bold]}>Z</Text>
      </View>

      <View style={styles.sensorRow}>
        <Text style={[styles.sensorTitle, textStyles.default]}>{'Accelerometer'}</Text>
        <Text style={[textStyles.default, styles.column]}>
          {formatSensorValue(lastAccelerationPoint?.magnitude)}
        </Text>
        <Text style={[textStyles.default, styles.column]}>
          {formatSensorValue(lastAccelerationPoint?.accelerationX)}
        </Text>
        <Text style={[textStyles.default, styles.column]}>
          {formatSensorValue(lastAccelerationPoint?.accelerationY)}
        </Text>
        <Text style={[textStyles.default, styles.column]}>
          {formatSensorValue(lastAccelerationPoint?.accelerationZ)}
        </Text>
      </View>

      <View style={styles.sensorRow}>
        <Text style={[styles.sensorTitle, textStyles.default]}>{'Gyroscope'}</Text>
        <Text style={[textStyles.default, styles.column]}>
          {formatSensorValue(lastGyroscopePoint?.magnitude)}
        </Text>
        <Text style={[textStyles.default, styles.column]}>
          {formatSensorValue(lastGyroscopePoint?.rotationX)}
        </Text>
        <Text style={[textStyles.default, styles.column]}>
          {formatSensorValue(lastGyroscopePoint?.rotationY)}
        </Text>
        <Text style={[textStyles.default, styles.column]}>
          {formatSensorValue(lastGyroscopePoint?.rotationZ)}
        </Text>
      </View>

    </View>
  );
}


/**
 * Stylesheet
 */
const styles = StyleSheet.create({
  centering: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  column: {
    width: 80,
  },
  sensorTitle: {
    fontWeight: 'bold',
    width: 110,
  },
  sensorRow: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 10,
  },
})