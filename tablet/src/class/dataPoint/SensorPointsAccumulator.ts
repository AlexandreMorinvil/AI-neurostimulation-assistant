import { SensorPoint } from "./SensorPoint";

export class SensorPointsAccumulator {

  private sensorPoints: Array<SensorPoint> = [];
  private timeWindowInMs: number = 25000;

  get latestPoint(): SensorPoint | null {
    return this.sensorPoints[this.sensorPoints.length - 1] ?? null;
  }

  add(sensorPoint: Array<SensorPoint>) {
    this.addNewPoints(sensorPoint);
    this.removeOutdatedPoints();
  }

  private get latestTimeStamp(): number {
    return this.latestPoint?.timestamp ?? 0;
  }

  private get lowerLimitTimestamp(): number {
    return Math.max(0, this.latestTimeStamp - this.timeWindowInMs);
  }

  private addNewPoints(sensorPoints: Array<SensorPoint>): void {
    this.sensorPoints = this.sensorPoints.concat(sensorPoints);
  }

  private removeOutdatedPoints() {
    this.sensorPoints = this.sensorPoints.filter((sensorPoint: SensorPoint) => {
      return !(sensorPoint.timestamp < this.lowerLimitTimestamp); 
    });
  }
} 