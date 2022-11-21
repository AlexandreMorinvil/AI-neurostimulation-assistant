import io from 'socket.io-client';
import {Subject} from 'rxjs';
import {
  initializeValueWithPersistantData,
  savePersistantData,
} from './persistant-data.service';

// Constants
const LOCALHOST = 'localhost';
const PROTOCOLE = 'http://';
const PORT = '5000';

const STORE_KEY_BACKEND_IP_ADDRESS = 'backendIpAddress';
const STORE_KEY_IS_IN_LOCALHOST_MODE = 'isInLocalhostMode';

// Variables
let socketBackend = io();
let _backendIpAddress = '0.0.0.0';
let _isInLocalhostMode = false;

// Reactive behavior handlers
export const subject = new Subject();

// Exported methods
export function activateLocalHostMode() {
  savePersistantData(STORE_KEY_IS_IN_LOCALHOST_MODE, true);
  subject.next();
}

export function connect() {
  initSocket();
}

export function deactivateLocalHostMode() {
  savePersistantData(STORE_KEY_IS_IN_LOCALHOST_MODE, false);
  subject.next();
}

export function getIsInLocalhostMode() {
  return _isInLocalhostMode;
}

export function getIsConnectedStatus() {
  return socketBackend.connected || false;
}

export function getBackendIpAddress() {
  if (getIsInLocalhostMode()) return LOCALHOST;
  else return _backendIpAddress;
}

export function getBackendUrl() {
  if (getIsInLocalhostMode()) return `${PROTOCOLE}${LOCALHOST}:${PORT}`;
  else return `${PROTOCOLE}${_backendIpAddress}:${PORT}`;
}

export function isIpCurrentIpAddress(ipAddress) {
  return ipAddress === getBackendIpAddress();
}

export function setBackendIpAddress(inputIpAddress) {
  _backendIpAddress = inputIpAddress;
  savePersistantData(STORE_KEY_BACKEND_IP_ADDRESS, inputIpAddress);
  subject.next();
}

// Private methods
function initializeConnectionListeners() {
  socketBackend.on('connect', () => {
    subject.next();
    console.log('Connected to server');
    const engine = socketBackend.io.engine;

    engine.on('close', reason => {
      console.log('Socket.io engine disconnection reason :', reason);
    });
  });

  socketBackend.on('disconnect', () => {
    subject.next();
    console.log('Disconnected from server');
  });
}

function initSocket() {
  if (socketBackend.connected) socketBackend.disconnect();
  setTimeout(() => {
    socketBackend = io(getBackendUrl());
    initializeConnectionListeners();
  }, 500);
}

// Initialization
(async function initialize() {
  _backendIpAddress = await initializeValueWithPersistantData(
    STORE_KEY_BACKEND_IP_ADDRESS,
    _backendIpAddress,
  );
  _isInLocalhostMode = await initializeValueWithPersistantData(
    STORE_KEY_IS_IN_LOCALHOST_MODE,
    _isInLocalhostMode,
  );
  initSocket();
})();
