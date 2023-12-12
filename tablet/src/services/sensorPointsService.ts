import { Service } from "@class/Service";
import { SensorPointsAccumulator } from "@class/dataPoint/SensorPointsAccumulator";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";
import { sessionService } from "./sessionService";
import { databaseService } from "./databaseService";

class SensorPointsService implements Service {

  accelerometerPointsAccumulator: SensorPointsAccumulator = new SensorPointsAccumulator();
  gyroscopePointsAccumulator: SensorPointsAccumulator = new SensorPointsAccumulator();

  destroy(): void { }

  handleSmartwatchAccelerometerPoints(
    accelerometerPoints: Array<SmartwatchAccelerometerPoint>): void {
    this.accelerometerPointsAccumulator.add(accelerometerPoints);
    if (sessionService.isSessionInProgress)
      databaseService.storeSmartwatchAccelerometerPoint(
        accelerometerPoints,
        sessionService.getSnapshot(),
      );
  }

  handleSmartwatchGyroscopePoints(gyroscopePoints: Array<SmartwatchGyroscopePoint>): void {
    this.gyroscopePointsAccumulator.add(gyroscopePoints);
    if (sessionService.isSessionInProgress)
      databaseService.storeSmartwatchGyroscopePoint(
        gyroscopePoints,
        sessionService.getSnapshot(),
      );
  }

  initialize(): void { }
}

const sensorPointsService = new SensorPointsService();
export { sensorPointsService }