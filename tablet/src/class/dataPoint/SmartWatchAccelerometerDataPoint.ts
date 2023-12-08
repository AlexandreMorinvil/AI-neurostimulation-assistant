import DataPoint from "./DataPoint";

export default class SmartWatchAccelerometerDataPoint extends DataPoint {

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
        return new SmartWatchAccelerometerDataPoint(parameters.map((value) => Number(value)));
    }
}