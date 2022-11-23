import * as connectionBackendService from "./connection-backend.service";
import * as patientService from "./patient.service";
import * as problemDimensionService from "./problem-dimension.service";
import * as watchDataService from "./watch-data.service";

export function cleanUp() {
  connectionBackendService.cleanUp();
  watchDataService.cleanUp();
}

export function initialize() {
  connectionBackendService.initialize();
  patientService.initialize();
  problemDimensionService.initialize();
  watchDataService.initialize();
}