import * as connectionBackendService from "./connection-backend.service";
import * as patientService from "./patient.service";
import * as problemDimensionTypeService from "./problem-dimension-type.service";
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
  problemDimensionTypeService.initialize();
  tremorPointService.initialize();
  watchDataService.initialize();
}