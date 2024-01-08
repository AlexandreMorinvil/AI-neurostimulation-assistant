import { databaseService } from './databaseService';
import { networkService } from "./networkService";
import { recordedSessionsService } from "./recordedSessionsService";
import { sensorPointsService } from "./sensorPointsService";
import { serverConnectionService } from "./serverConnectionService";
import { smartwatchService } from "./smartwatchService";
import { sessionService } from "./sessionService";

export function cleanUp() {
  networkService.destroy();
  smartwatchService.destroy();
  serverConnectionService.destroy();
  sensorPointsService.destroy();
  sessionService.destroy();
  databaseService.destroy();
  recordedSessionsService.destroy();
}

export function initialize() {
  recordedSessionsService.initialize();
  databaseService.initialize();
  sessionService.initialize();
  sensorPointsService.initialize();
  serverConnectionService.initialize();
  smartwatchService.initialize();
  networkService.initialize();
}
