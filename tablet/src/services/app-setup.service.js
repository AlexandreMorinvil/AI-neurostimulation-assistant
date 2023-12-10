import * as connectionBackendService from "./connection-backend.service";
import * as patientService from "./patient.service";
import * as problemDimensionTypeService from "./problem-dimension-type.service";
import * as tremorPointService from "./tremor-point.service";
import * as watchDataService from "./watch-data.service";
import { sensorPointsService } from "./sensorPointsService";
import { smartwatchService } from "./smartwatchService";

export function cleanUp() {
  sensorPointsService.destroy();
  smartwatchService.destroy();

  connectionBackendService.cleanUp();
  tremorPointService.cleanUp();
  watchDataService.cleanUp();
}

export function initialize() {
  sensorPointsService.initialize();
  smartwatchService.initialize();

  connectionBackendService.initialize();
  patientService.initialize();
  problemDimensionTypeService.initialize();
  tremorPointService.initialize();
  watchDataService.initialize();

}
