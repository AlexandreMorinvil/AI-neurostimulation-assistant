import { SensorPoint } from "./SensorPoint";

export class SmartwatchAccelerometerPoint extends SensorPoint {

  accelerationX!: number;
  accelerationY!: number;
  accelerationZ!: number;

  constructor(data: Array<number>) {
    const [timestamp, accelerationX, accelerationY, accelerationZ] = data;
    super(timestamp);
    this.accelerationX = accelerationX;
    this.accelerationY = accelerationY;
    this.accelerationZ = accelerationZ;
  }

  static createFromStringArray(parameters: Array<string>) {
    return new SmartwatchAccelerometerPoint(parameters.map((value) => Number(value)));
  }
}