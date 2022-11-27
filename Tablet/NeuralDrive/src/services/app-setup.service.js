import * as connectionBackendService from "./connection-backend.service";
import * as patientService from "./patient.service";
import * as problemDimensionService from "./problem-dimension.service";
import * as tremorPointService from "./tremor-point.service";
import * as watchDataService from "./watch-data.service";

export function cleanUp() {
  connectionBackendService.cleanUp();
  tremorPointService.cleanUp();
  watchDataService.cleanUp();
}

export function initialize() {
  connectionBackendService.initialize();
  patientService.initialize();
  problemDimensionService.initialize();
  tremorPointService.initialize();
  watchDataService.initialize();
}