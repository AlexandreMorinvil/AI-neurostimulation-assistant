// Constants
const LOCALHOST = "localhost";
const PROTOCOLE = "http://";
const PORT = "5000";

// Variables
backendIpAddress = '0.0.0.0';
isInLocalhostMode = false;

// Methods
export function activateLocalHostMode() {
    isInLocalhostMode = true;
}

export function deactivateLocalHostMode() {
    isInLocalhostMode = false;
}

export function getBackendIpAddress() {
    if (isInLocalhostMode) return `${PROTOCOLE}${LOCALHOST}:${PORT}`;
    else return `${PROTOCOLE}${backendIpAddress}:${PORT}`;
}

export function setBackendIpAddress(inputIpAddress) {
    backendIpAddress = inputIpAddress;
}

