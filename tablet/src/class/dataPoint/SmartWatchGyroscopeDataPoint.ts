import DataPoint from "./DataPoint";

export default class SmartWatchGyroscopeDataPoint extends DataPoint {

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
        return new SmartWatchGyroscopeDataPoint(parameters.map((value) => Number(value)));
    }
}