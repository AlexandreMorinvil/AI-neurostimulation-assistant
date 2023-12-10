import { SensorPoint } from "./SensorPoint";

export class SmartwatchGyroscopePoint extends SensorPoint {

  rotationX!: number;
  rotationY!: number;
  rotationZ!: number;

  constructor(data: Array<number>) {
    const [timestamp, rotationX, rotationY, rotationZ] = data;
    super(timestamp);
    this.rotationX = rotationX;
    this.rotationY = rotationY;
    this.rotationZ = rotationZ;
  }

  static createFromStringArray(parameters: Array<string>) {
    return new SmartwatchGyroscopePoint(parameters.map((value) => Number(value)));
  }
}