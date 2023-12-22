import io from 'socket.io-client';
import { Service } from '@class/Service';
import { Subject, Subscription } from 'rxjs';
import { persistantDataService } from './persistantDataService';

class ServerConnectionService implements Service {
  
  private socketIo = io();
  private _ipAddress: string = '0.0.0.0';
  
  private connectionStatusSubject: Subject<boolean> = new Subject<boolean>();

  get isConnected(): boolean {
    return this.socketIo.connected || false;
  }

  get ipAddress(): string {
    return this._ipAddress;
  }

  connect(): void {
    this.disconnect();
    this.socketIo = io(`http://${this.ipAddress}:9500`);
    this.setEventListeners();
  }

  destroy(): void {
    this.disconnect();
  }

  disconnect(): void {
    this.socketIo?.disconnect();
  }

  initialize(): void {
    persistantDataService.loadServerIpAddress()
      .then((ipAddress: string | null) => {
        if (ipAddress)
          this.setIpAddress(ipAddress);
        this.connect();
      });
  }

  setIpAddress(ipAddress: string): void {
    this._ipAddress = ipAddress;
    persistantDataService.saveServerIpAddress(this.ipAddress);
  }

  subscribeToConnectionStatus(callback: (connectionStatus: boolean) => void): Subscription {
    return this.connectionStatusSubject.subscribe(callback);
  }

  private setEventListeners() {
    this.socketIo.on('connect', () => {
      this.connectionStatusSubject.next(true);
      console.log('Connected to server');

      this.socketIo.io.engine.on('close', reason => {
        console.log('Socket.io engine disconnection reason :', reason);
      });
    });

    this.socketIo.on('disconnect', () => {
      this.connectionStatusSubject.next(false);
      console.log('Disconnected from server');
    });
  }
}

const serverConnectionService = new ServerConnectionService();
export { serverConnectionService }