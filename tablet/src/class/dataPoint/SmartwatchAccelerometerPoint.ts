import { SmartWatchAccelerometerPointSchema } from "src/database/sensorPoint/sensorPointSchema";
import { SensorPoint } from "./SensorPoint";
import { SessionSnapshot } from "@class/session/SessionSnapshot";

export class SmartwatchAccelerometerPoint extends SensorPoint {

  static createFromStringArray(parameters: Array<string>) {
    return new SmartwatchAccelerometerPoint(parameters.map((value) => Number(value)));
  }

  accelerationX!: number;
  accelerationY!: number;
  accelerationZ!: number;

  private cachedMagnitude: number | undefined = undefined;

  constructor(data: Array<number>) {
    const [timestamp, accelerationX, accelerationY, accelerationZ] = data;
    super(timestamp);
    this.accelerationX = accelerationX;
    this.accelerationY = accelerationY;
    this.accelerationZ = accelerationZ;
  }

  get magnitude(): number {
    if (!this.cachedMagnitude)
      this.cachedMagnitude = Math.sqrt(
        this.accelerationX ** 2 +
        this.accelerationY ** 2 +
        this.accelerationZ ** 2
      );
    return this.cachedMagnitude
  }

  generateDatabaseEntry(sessionSnapshot?: SessionSnapshot): SmartWatchAccelerometerPointSchema {
    return {
      sessionId: sessionSnapshot?.sessionId,
      sessionTime: sessionSnapshot?.sessionTime,
      timestamp: this.timestamp,
      accelerationX: this.accelerationX,
      accelerationY: this.accelerationY,
      accelerationZ: this.accelerationZ,
    } as SmartWatchAccelerometerPointSchema;
  }
}