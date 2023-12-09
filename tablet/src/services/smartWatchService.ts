import PacketItem from '@class/socket/PacketItem';
import SmartWatchSocketClient from '@class/socket/SmartWatchSocketClient'
import Service from '@class/Service';
import { Subscription } from 'rxjs';

// TODO: Transfer points to the data point service
// TODO: Receive IP address from the settings
// TODO: Attempt reconnections at strategic times (every 1 second + when the application is launched)
// TODO: Properly handle the initialization : Attempt socket creation and on failure retry periodically
// TODO: Properly handle the destruction : Destroy the socket and stop trying to reconnect periodically

class SmartWatchService implements Service {

  private clientSocket: SmartWatchSocketClient = new SmartWatchSocketClient();

  constructor() {
    this.clientSocket.subscribeToDataStatus((pakcetItems: Array<PacketItem>) => {
      console.log(`message:`, pakcetItems);
    });
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

const smartWatchService = new SmartWatchService()
export { smartWatchService }