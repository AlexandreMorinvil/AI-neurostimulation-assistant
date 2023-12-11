import { Service } from "@class/Service";
import { SensorPointsAccumulator } from "@class/dataPoint/SensorPointsAccumulator";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";
import { sessionService } from "./sessionService";

class SensorPointsService implements Service {

  accelerometerPointsAccumulator: SensorPointsAccumulator = new SensorPointsAccumulator();
  gyroscopePointsAccumulator: SensorPointsAccumulator = new SensorPointsAccumulator();

  destroy(): void { }

  handleSmartwatchAccelerometerPoints(
    accelerometerPoints: Array<SmartwatchAccelerometerPoint>): void {
    this.accelerometerPointsAccumulator.add(accelerometerPoints);
    console.log(`Accelerometer point received`);
    if (sessionService.isSessionInProgress)
      console.log("TODO: Save point in the database");
  }

  handleSmartwatchGyroscopePoints(gyroscopePoints: Array<SmartwatchGyroscopePoint>): void {
    this.gyroscopePointsAccumulator.add(gyroscopePoints);
    console.log(`Gyroscope point received`);
    if (sessionService.isSessionInProgress)
      console.log("TODO: Save point in the database");
  }

  initialize(): void { }
}

const sensorPointsService = new SensorPointsService();
export { sensorPointsService }