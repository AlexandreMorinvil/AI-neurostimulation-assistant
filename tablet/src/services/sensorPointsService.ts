import { Service } from "@class/Service";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";

class SensorPointsService implements Service {

  // TODO: Implement the logic for the gyroscope points
  accelerometerPoints: Array<SmartwatchAccelerometerPoint> = [];

  constructor() {
    // TODO: Add the subscription of the sessions service
  }

  destroy(): void { }

  initialize(): void { }

  handleSmartwatchAccelerometerPoints(dataPoints: Array<SmartwatchAccelerometerPoint>): void {
    console.log(`Accelerometer point(s):`, dataPoints);
  }

  handleSmartwatchGyroscopePoints(dataPoints: Array<SmartwatchGyroscopePoint>): void {
    console.log(`Gyroscope point(s):`, dataPoints);
  }
}

const sensorPointsService = new SensorPointsService();
export { sensorPointsService }