import EventEmitter from "eventemitter3";
import TcpSocket from 'react-native-tcp-socket';
import { ConnectionOptions } from 'react-native-tcp-socket/lib/types/Socket';

export default abstract class TcpSocketClient {

    protected socket: TcpSocket.Socket | null = null;
    protected connectionOptions: ConnectionOptions = { port: 9000 };
  
    abstract onConnection(): void
    abstract onData(data: string | Buffer): void
    abstract onError(error: Error): void
  
    onClose(): void {
      this.close();
    }
  
    close(): void {
      this.socket?.destroy();
      this.socket = null;
    }
  
    connect(): void {
        this.socket = TcpSocket.createConnection(
            this.connectionOptions, 
            () => { this.onConnection() }
        );
        (this.socket as EventEmitter).on('data', (data) => { this.onData(data) });
        (this.socket as EventEmitter).on('error', (error) => { this.onError(error) });
        (this.socket as EventEmitter).on('close', () => { this.onClose() });
    }
  
    public send(data: string | Buffer): void {
      this.socket?.write(data);
    }
  }