// import store from "./store.service";
import { createStore } from 'state-pool';

// Constants
const LOCALHOST = "localhost";
const PROTOCOLE = "http://";
const PORT = "5000";

// Global variables
export const STORE_KEY_BACKEND_IP_ADDRESS = "backendIpAddress";
export const STORE_KEY_IS_IN_LOCALHOST_MODE = "isInLocalhostMode";

const store = createStore();
store.setState(STORE_KEY_BACKEND_IP_ADDRESS, "0.0.0.0");//, { persist: true });
store.setState(STORE_KEY_IS_IN_LOCALHOST_MODE, false);//, { persist: true });

// Variables
export let isConnected = false;
export let isInLocalhostMode = false;

// Methods
export function activateLocalHostMode() {
  isInLocalhostMode = true;
}

export function deactivateLocalHostMode() {
  isInLocalhostMode = false;
}

export function getIsInLocalhostMode() {
  return isInLocalhostMode;
}

export function getIsConnectedStatus() {
  return isConnected;
}

export function getBackendIpAddress() {
  if (isInLocalhostMode) return LOCALHOST;
  else return store.getState(STORE_KEY_BACKEND_IP_ADDRESS).value;
}

export function getBackendUrl() {
  if (isInLocalhostMode) return `${PROTOCOLE}${LOCALHOST}:${PORT}`;
  else return `${PROTOCOLE}${store.getState(STORE_KEY_BACKEND_IP_ADDRESS).value}:${PORT}`;
}

export function setBackendIpAddress(inputIpAddress) {
  store.setState(STORE_KEY_BACKEND_IP_ADDRESS, inputIpAddress);
  console.log("IP address", getBackendIpAddress());
}

