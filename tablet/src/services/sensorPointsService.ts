import { Service } from "@class/Service";
import { SensorPoint } from "@class/dataPoint/SensorPoint";

class DataPointsService implements Service {
  destroy(): void { }
  initialize(): void { }

  handleSmartwatchData(dataPoint: Array<SensorPoint>): void {
    console.log(`message:`, dataPoint);
  }
}

const dataPointsService = new DataPointsService();
export { dataPointsService }