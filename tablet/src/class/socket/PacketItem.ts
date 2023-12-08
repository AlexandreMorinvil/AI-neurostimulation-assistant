import DataPoint from "@class/dataPoint/DataPoint";
import SmartWatchAccelerometerDataPoint from "@class/dataPoint/SmartWatchAccelerometerDataPoint";
import SmartWatchGyroscopeDataPoint from "@class/dataPoint/SmartWatchGyroscopeDataPoint";

enum PakcetItemType {
    ACCELEROMETER = 'ACCELEROMETER',
    GYROSCOPE = 'GYROSCOPE',
}

export default class PacketItem {

    static readonly PakcetItemType = PakcetItemType;

    type!: string;
    payload!: DataPoint | null;

	constructor(type: string, payload: Array<string>) {
        
        // Refuse the packet item if it has an unknown type.
        if (!(type in PakcetItemType))
            throw new Error(`Unknown packet type received from smartwatch: ${type}`);

        // Assign the packet item type and payload.
        this.type = type;
        switch(this.type) {
            case PakcetItemType.ACCELEROMETER:
                this.payload = SmartWatchAccelerometerDataPoint.createFromStringArray(payload);
                break;

            case PakcetItemType.GYROSCOPE:
                this.payload = SmartWatchGyroscopeDataPoint.createFromStringArray(payload);
                break;

            default:
                this.payload = null;
                break;
        }
    }
}