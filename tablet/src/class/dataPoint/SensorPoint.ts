export abstract class SensorPoint {

  timestamp!: number;

  constructor(timestamp: number) {
    this.timestamp = timestamp;
  }
} 