import PacketItem from '@class/socket/PacketItem';
import SmartwatchSocketClient from '@class/socket/SmartwatchSocketClient';
import Service from '@class/Service';
import { Subscription } from 'rxjs';

// TODO: Transfer points to the data point service
// TODO: Receive IP address from the settings
// TODO: Attempt reconnections at strategic times (every 1 second + when the application is launched)
// TODO: Properly handle the initialization : Attempt socket creation and on failure retry periodically
// TODO: Properly handle the destruction : Destroy the socket and stop trying to reconnect periodically

class SmartwatchService implements Service {

  private clientSocket: SmartwatchSocketClient = new SmartwatchSocketClient();

  constructor() {
    this.clientSocket.subscribeToData((pakcetItems: Array<PacketItem>) => {
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

const smartwatchService = new SmartwatchService()
export { smartwatchService }