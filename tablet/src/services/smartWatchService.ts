import { SmartwatchSocketClient } from '@class/socket/SmartwatchSocketClient';
import { Service } from '@class/Service';
import { Subscription } from 'rxjs';
import { sensorPointsService } from './sensorPointsService';

// TODO: Receive IP address from the settings
// TODO: Attempt reconnections at strategic times (every 1 second + when the application is launched)
// TODO: Properly handle the initialization : Attempt socket creation and on failure retry periodically
// TODO: Properly handle the destruction : Destroy the socket and stop trying to reconnect periodically

class SmartwatchService implements Service {

  private clientSocket: SmartwatchSocketClient = new SmartwatchSocketClient();

  constructor() {
    this.clientSocket.subscribeToSensorPoints(sensorPointsService.handleSmartwatchData);
  }

  connect(): void {
    this.clientSocket.connect();
  }

  destroy() : void {
    this.clientSocket.destroy();
  }

  initialize() : void {
    this.connect();
  }

  subscribeToConnectionStatus(callback: (connectionStatus: boolean) => void): Subscription {
    return this.clientSocket.subscribeToConnectionStatus(callback);
  }

  get isConnected() {
    return this.clientSocket.isConnected;
  }
}

const smartwatchService = new SmartwatchService()
export { smartwatchService }