import { Service } from "@class/Service";
import { SensorPoint } from "@class/dataPoint/SensorPoint";

class SensorPointsService implements Service {
  destroy(): void { }
  initialize(): void { }

  handleSmartwatchData(dataPoints: Array<SensorPoint>): void {
    console.log(`message:`, dataPoints);
  }
}

const sensorPointsService = new SensorPointsService();
export { sensorPointsService }