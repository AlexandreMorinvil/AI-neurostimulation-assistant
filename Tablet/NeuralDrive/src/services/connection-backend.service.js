// Constants
const LOCALHOST = "localhost";
const PROTOCOLE = "http://";
const PORT = "5000";

// Variables
export let backendIpAddress = '0.0.0.0';
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

export function getBackendIpAddress() {
    if (isInLocalhostMode) return `${PROTOCOLE}${LOCALHOST}:${PORT}`;
    else return `${PROTOCOLE}${backendIpAddress}:${PORT}`;
}

export function setBackendIpAddress(inputIpAddress) {
    backendIpAddress = inputIpAddress;
}

