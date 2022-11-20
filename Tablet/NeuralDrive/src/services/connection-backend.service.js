import {
  initializeValueWithPersistantData,
  savePersistantData
} from "./persistant-data.service";
import { Subject } from "rxjs";

// Constants
const LOCALHOST = "localhost";
const PROTOCOLE = "http://";
const PORT = "5000";

const STORE_KEY_BACKEND_IP_ADDRESS = "backendIpAddress";
const STORE_KEY_IS_IN_LOCALHOST_MODE = "isInLocalhostMode";

// Variables
let backendIpAddress = "0.0.0.0";
let isInLocalhostMode = false;
let isConnected = false;

// Reactive behavior handlers
export const subject = new Subject();

// Methods
export function activateLocalHostMode() {
  savePersistantData(STORE_KEY_IS_IN_LOCALHOST_MODE, true);
  subject.next();
}

export function deactivateLocalHostMode() {
  savePersistantData(STORE_KEY_IS_IN_LOCALHOST_MODE, false);
  subject.next();
}

export function getIsInLocalhostMode() {
  return isInLocalhostMode;
}

export function getIsConnectedStatus() {
  return isConnected;
}

export function getBackendIpAddress() {
  if (getIsInLocalhostMode()) return LOCALHOST;
  else return backendIpAddress;
}

export function getBackendUrl() {
  if (getIsInLocalhostMode()) return `${PROTOCOLE}${LOCALHOST}:${PORT}`;
  else return `${PROTOCOLE}${backendIpAddress}:${PORT}`;
}

export function setBackendIpAddress(inputIpAddress) {
  backendIpAddress = inputIpAddress;
  savePersistantData(STORE_KEY_BACKEND_IP_ADDRESS, inputIpAddress);
  subject.next();
}

// Initialization
(async function initialize() {
  backendIpAddress = await initializeValueWithPersistantData(STORE_KEY_BACKEND_IP_ADDRESS, backendIpAddress);
  isInLocalhostMode = await initializeValueWithPersistantData(STORE_KEY_IS_IN_LOCALHOST_MODE, isInLocalhostMode);
})()