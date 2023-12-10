import { SensorPoint } from "@class/dataPoint/SensorPoint";
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";

enum PakcetItemType {
  ACCELEROMETER = 'ACCELEROMETER',
  GYROSCOPE = 'GYROSCOPE',
}

export class PacketItem {

  static readonly PakcetItemType = PakcetItemType;

  type!: string;
  payload!: SensorPoint | null;

  constructor(type: string, payload: Array<string>) {

    // Refuse the packet item if it has an unknown type.
    if (!(type in PakcetItemType))
      throw new Error(`Unknown packet type received from smartwatch: ${type}`);

    // Assign the packet item type and payload.
    this.type = type;
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
}