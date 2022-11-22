import * as connectionBackendService from "./connection-backend.service";

export function cleanUp() {
  connectionBackendService.disconnect();
}

export function init() {
  connectionBackendService.connect();
}