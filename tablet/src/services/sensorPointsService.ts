import { Service } from "@class/Service";
import { SensorPointsAccumulator } from "@class/dataPoint/SensorPointsAccumulator";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";

class SensorPointsService implements Service {

  accelerometerPointsAccumulator: SensorPointsAccumulator = new SensorPointsAccumulator();
  gyroscopePointsAccumulator: SensorPointsAccumulator = new SensorPointsAccumulator();

  constructor() {
    // TODO: Add the subscription of the sessions service
  }

  destroy(): void { }

  handleSmartwatchAccelerometerPoints(
    accelerometerPoints: Array<SmartwatchAccelerometerPoint>): void {
    this.accelerometerPointsAccumulator.add(accelerometerPoints);
    console.log(`Accelerometer point received`);
  }

  handleSmartwatchGyroscopePoints(gyroscopePoints: Array<SmartwatchGyroscopePoint>): void {
    this.gyroscopePointsAccumulator.add(gyroscopePoints);
    console.log(`Gyroscope point received`);
  }

  initialize(): void { }
}

const sensorPointsService = new SensorPointsService();
export { sensorPointsService }