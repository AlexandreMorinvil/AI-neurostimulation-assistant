import NetInfo from '@react-native-community/netinfo';

// Variables
export let isConnected = false;
export let selfIpAddress = "";

// Event Listeners
NetInfo.addEventListener((state) => {
  isConnected = state.isConnected;
  selfIpAddress = state.details.ipAddress;
});

// Methods
export function getIsConnectedStatus() {
  return isConnected;
}

export function getSelfIpAddress() {
  return selfIpAddress;
}

