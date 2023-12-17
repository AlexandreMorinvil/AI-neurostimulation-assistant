import { Service } from "@class/Service";
import { SensorPointsAccumulator } from "@class/dataPoint/SensorPointsAccumulator";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";
import { sessionService } from "./sessionService";
import { databaseService } from "./databaseService";
import { Subject, Subscription } from "rxjs";

class SensorPointsService implements Service {

  accelerometerPointsAccumulator: SensorPointsAccumulator = new SensorPointsAccumulator();
  gyroscopePointsAccumulator: SensorPointsAccumulator = new SensorPointsAccumulator();
  
  private accelerometerPointsSubject: Subject<Array<SmartwatchAccelerometerPoint>> = new Subject();
  private gyroscopePointsSubject: Subject<Array<SmartwatchGyroscopePoint>> = new Subject();

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
    
    this.accelerometerPointsSubject.next(accelerometerPoints);
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

    this.gyroscopePointsSubject.next(gyroscopePoints);
  }

  initialize(): void { }

  subscribeToAccelerometerPoints(callback: (points: Array<SmartwatchAccelerometerPoint>) => void): 
    Subscription {
    return this.accelerometerPointsSubject.subscribe(callback);
  }

  subscribeToGyroscopesPoints(callback: (points: Array<SmartwatchGyroscopePoint>) => void): 
    Subscription {
    return this.gyroscopePointsSubject.subscribe(callback);
  }
}

const sensorPointsService = new SensorPointsService();
export { sensorPointsService }