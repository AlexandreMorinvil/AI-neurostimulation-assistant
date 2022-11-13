import * as connectionBackendService from "./connection-backend.service";
import * as networkService from "./network.service";

// Variables
export let isConnected = false;

// Methods
export function getIsConnectedStatus() {
  return isConnected;
}

export function getBackendIpAddress() {
  if (isInLocalhostMode) return LOCALHOST;
  else return backendIpAddress;
}

export function ipAddressToPutInSmartWatch() {
  return connectionBackendService.getIsInLocalhostMode() ?
    networkService.getSelfIpAddress :
    connectionBackendService.getBackendIpAddress();
}