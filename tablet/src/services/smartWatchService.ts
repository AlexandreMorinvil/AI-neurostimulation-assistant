import { SmartwatchSocketClient } from '@class/socket/SmartwatchSocketClient';
import { Service } from '@class/Service';
import { Subscription } from 'rxjs';
import { sensorPointsService } from './sensorPointsService';
import { persistantDataService } from './persistantDataService';

class SmartwatchService implements Service {

  private clientSocket: SmartwatchSocketClient = new SmartwatchSocketClient(
    true,      // Must attempt Connections Continuously
    '0.0.0.0', // Initial IP address
  );

  constructor() {
    this.clientSocket.subscribeToAccelerometerPoints((accelerometerPointsPoints) => {
      sensorPointsService.handleSmartwatchAccelerometerPoints(accelerometerPointsPoints);
    });
    this.clientSocket.subscribeToGyroscopePoints((gyroscopePoints) => {
      sensorPointsService.handleSmartwatchGyroscopePoints(gyroscopePoints);
    });
  }

  get ipAddress() {
    return this.clientSocket.ipAddress;
  }

  get isConnected() {
    return this.clientSocket.isConnected;
  }

  connect(): void {
    this.clientSocket.attemptConnection();
  }

  destroy(): void {
    this.clientSocket.destroy();
  }

  initialize(): void {
    persistantDataService.loadSmartwatchIpAddress()
      .then((ipAddress: string | null) => {
        if (ipAddress)
          this.setIpAddress(ipAddress);
        this.connect();
      });
  }

  setIpAddress(ipAddress: string): void {
    this.clientSocket.setIpAddress(ipAddress);
    persistantDataService.saveSmartwatchIpAddress(this.ipAddress);
  }

  subscribeToConnectionStatus(callback: (connectionStatus: boolean) => void): Subscription {
    return this.clientSocket.subscribeToConnectionStatus(callback);
  }
}

const smartwatchService = new SmartwatchService()
export { smartwatchService }