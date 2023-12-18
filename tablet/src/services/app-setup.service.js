import * as connectionBackendService from "./connection-backend.service";
import * as patientService from "./patient.service";
import * as problemDimensionTypeService from "./problem-dimension-type.service";
import * as tremorPointService from "./tremor-point.service";
import * as watchDataService from "./watch-data.service";
import { databaseService } from './databaseService';
import { networkService } from "./networkService";
import { recordedSessionsService } from "./recordedSessionsService";
import { sensorPointsService } from "./sensorPointsService";
import { smartwatchService } from "./smartwatchService";
import { sessionService } from "./sessionService";

export function cleanUp() {
  smartwatchService.destroy();
  sensorPointsService.destroy();
  sessionService.destroy();
  networkService.destroy();
  databaseService.destroy();
  recordedSessionsService.destroy();
}

export function initialize() {
  databaseService.initialize();
  networkService.initialize();
  sessionService.initialize();
  sensorPointsService.initialize();
  smartwatchService.initialize();
  recordedSessionsService.initialize();
}
