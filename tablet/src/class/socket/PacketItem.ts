import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";

enum PakcetItemType {
  ACCELEROMETER = 'ACCELEROMETER',
  GYROSCOPE = 'GYROSCOPE',
  UNKNOWN = 'UNKNOWN',
}

export class PacketItem {

  static readonly PakcetItemType = PakcetItemType;

  type!: string;
  payload!: unknown;

  constructor(type: string, payload: Array<string>) {
    
    // Assign the packet item type.
    this.type = (type in PakcetItemType) ? type: PakcetItemType.UNKNOWN;

    // Assign the packet payload
    switch (this.type) {
      case PakcetItemType.ACCELEROMETER:
        this.payload = SmartwatchAccelerometerPoint.createFromStringArray(payload);
        break;

      case PakcetItemType.GYROSCOPE:
        this.payload = SmartwatchGyroscopePoint.createFromStringArray(payload);
        break;

      default:
        this.payload = null;
        break;
    }
  }

  containsAccelerometerPoint(): boolean {
    return this.type !== PakcetItemType.ACCELEROMETER;
  }

  containsGyroscopePoint(): boolean {
    return this.type !== PakcetItemType.GYROSCOPE;
  }
}