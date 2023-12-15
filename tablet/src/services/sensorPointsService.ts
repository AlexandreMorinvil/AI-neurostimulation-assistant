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

    if (sessionService.isSessionInProgress) {
      const sessionSnapshot = sessionService.getSnapshot();
      if (sessionSnapshot)
        databaseService.storeSmartwatchAccelerometerPoint(
          accelerometerPoints,
          sessionSnapshot,
        );
    }
  }

  handleSmartwatchGyroscopePoints(gyroscopePoints: Array<SmartwatchGyroscopePoint>): void {
    this.gyroscopePointsAccumulator.add(gyroscopePoints);

    if (sessionService.isSessionInProgress) {
      const sessionSnapshot = sessionService.getSnapshot();
      if (sessionSnapshot)
        databaseService.storeSmartwatchGyroscopePoint(
          gyroscopePoints,
          sessionSnapshot,
        );
    }
  }

  initialize(): void { }
}

const sensorPointsService = new SensorPointsService();
export { sensorPointsService }