export default abstract class DataPoint {

    timestamp!: number;

    constructor(timestamp: number) {
        this.timestamp = timestamp;
    }
} 