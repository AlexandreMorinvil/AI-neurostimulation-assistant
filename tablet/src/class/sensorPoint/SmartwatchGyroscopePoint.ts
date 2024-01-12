import { SensorPoint } from "./SensorPoint";

export class SmartwatchGyroscopePoint extends SensorPoint {

  static createFromStringArray(parameters: Array<string>) {
    return new SmartwatchGyroscopePoint(parameters.map((value) => Number(value)));
  }

  rotationX!: number;
  rotationY!: number;
  rotationZ!: number;

  private cachedMagnitude: number | undefined = undefined;

  constructor(data: Array<number>) {
    const [timestamp, rotationX, rotationY, rotationZ] = data;
    super(timestamp);
    this.rotationX = rotationX;
    this.rotationY = rotationY;
    this.rotationZ = rotationZ;
  }

  get magnitude(): number {
    if (!this.cachedMagnitude)
      this.cachedMagnitude = Math.sqrt(
        this.rotationX ** 2 +
        this.rotationY ** 2 +
        this.rotationZ ** 2
      );
    return this.cachedMagnitude
  }
}