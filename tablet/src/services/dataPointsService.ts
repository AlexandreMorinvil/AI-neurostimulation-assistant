import Service from "@class/Service";
import DataPoint from "@class/dataPoint/DataPoint";

class DataPointsService implements Service {
  destroy(): void { }
  initialize(): void { }

  handleSmartwatchData(dataPoint: DataPoint): void {
    console.log(`message:`, dataPoint);
  }
}

const dataPointsService = new DataPointsService();
export { dataPointsService }