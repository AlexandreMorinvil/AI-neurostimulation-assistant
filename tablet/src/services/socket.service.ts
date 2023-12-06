import EventEmitter from "eventemitter3";
import TcpSocket from 'react-native-tcp-socket';
import { ConnectionOptions } from 'react-native-tcp-socket/lib/types/Socket';

abstract class TcpClientSocket {

  protected socket: TcpSocket.Socket | null = new TcpSocket.Socket();
  protected connectionOptions: ConnectionOptions = { port: 9000 };
  
  constructor() {}

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
    try {
      this.socket = TcpSocket.createConnection(
        this.connectionOptions, 
        () => { this.onConnection() }
      );
      (this.socket as EventEmitter).on('data', (data) => { this.onData(data) });
      (this.socket as EventEmitter).on('error', (error) => { this.onError(error) });
      (this.socket as EventEmitter).on('close', () => { this.onClose() });
    } catch(error: unknown) {

    }
  }

  public send(data: string | Buffer): void {
    this.socket?.write(data);
  }
}

class SmartwatchSocket extends TcpClientSocket {
  constructor() {
    super()
    this.connectionOptions = {
      port: 9000,         // 9000,
      host: '192.168.0.170' // '192.168.0.170',
    };

    

    this.socket = new TcpSocket.Socket();
  }
  
  onConnection(): void {
      console.log("Socket connection was established");
      this.send('Hello server! 1');
  }


  onData(data: string | Buffer): void {
    console.log('message was received', data);
  }
  
  onError(error: Error): void {
    console.error(error);
  }
}

class SmartwatchSocketService {

  private clientSocket: SmartwatchSocket

  constructor() {
    this.clientSocket = new SmartwatchSocket()
  }

  public testFunction() {
    this.clientSocket = new SmartwatchSocket();
    console.log("Got inside the function deep inside");
    this.clientSocket.connect()
  }
  
  public send(data: string | Buffer) {
    this.clientSocket.send(data);
  }
}


const socketService = new SmartwatchSocketService()
export { socketService }
