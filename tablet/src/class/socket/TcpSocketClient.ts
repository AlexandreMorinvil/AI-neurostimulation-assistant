import EventEmitter from "eventemitter3";
import TcpSocket from 'react-native-tcp-socket';
import { ConnectionOptions } from 'react-native-tcp-socket/lib/types/Socket';
import { Subject, Subscription } from "rxjs";

export default abstract class TcpSocketClient {

  protected socket: TcpSocket.Socket | null = null;
  protected connectionOptions: ConnectionOptions = { port: 9000 };
  
  protected abstract onConnection(): void
  protected abstract onData(data: string | Buffer): void
  protected abstract onError(error: Error): void
  protected abstract onClose(): void
  
  private connectionStatusSubject: Subject<boolean> = new Subject();

  get isConnected() {
    return !!this.socket && !this.socket.connecting;
  }

  connect(): void {
    this.destroy();
    const socket = TcpSocket.createConnection(
      this.connectionOptions, 
      () => {
        this.socket = socket;
        this.onConnection();
        this.connectionStatusSubject.next(this.isConnected);
        (this.socket as EventEmitter).on('data', (data) => { this.onData(data) });
        (this.socket as EventEmitter).on('error', (error) => { 
          this.onError(error) 
          this.destroy();
        });
        (this.socket as EventEmitter).on('close', () => {
            this.onClose();
          }
        );
      }
    );
  }

  destroy(): void {
    this.socket?.destroy();
    this.socket = null;
    this.connectionStatusSubject.next(this.isConnected);
  }

  send(data: string | Buffer): void {
    this.socket?.write(data);
  }

  subscribeToConnectionStatus(callback: (connectionStatus: boolean) => void): Subscription  {
    return this.connectionStatusSubject.subscribe(callback);
  }
}