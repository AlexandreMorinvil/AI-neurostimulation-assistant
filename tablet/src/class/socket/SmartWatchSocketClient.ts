import { TcpSocketClient } from '@class/socket/TcpSocketClient'
import { SmartwatchPacketParser } from './SmartwatchPacketParser';
import { PacketItem } from './PacketItem';
import { Subject, Subscription } from 'rxjs';
import { SmartwatchAccelerometerPoint } from "@class/dataPoint/SmartwatchAccelerometerPoint";
import { SmartwatchGyroscopePoint } from "@class/dataPoint/SmartwatchGyroscopePoint";

export class SmartwatchSocketClient extends TcpSocketClient {

  private accelerometerPointsSubject: Subject<Array<SmartwatchAccelerometerPoint>> = new Subject();
  private gyroscopePointsSubject: Subject<Array<SmartwatchGyroscopePoint>> = new Subject();
  
  private pingIntervalId!: NodeJS.Timeout;
  private attemptConnectionIntervalId!: NodeJS.Timeout;

  private smartwatchPacketParser: SmartwatchPacketParser = new SmartwatchPacketParser();
  private mustProbeConnectionsContinuously: boolean = true;

  constructor(mustProbeConnectionsContinuously: boolean, ipAddress?: string) {
    super()
    this.connectionOptions = {
      port: 9000,
      host: ipAddress ?? '0.0.0.0',
    };
    this.mustProbeConnectionsContinuously = mustProbeConnectionsContinuously;
  }

  get ipAddress(): string {
    return this.connectionOptions.host ?? '0.0.0.0';
  }

  attemptConnectionsContinuously(): void {
    this.attemptConnectionIntervalId = setInterval(() => { this.connect() }, 1000);
  }

  connect(): void {
    super.connect();
    if (this.mustProbeConnectionsContinuously)
      this.attemptConnectionsContinuously();
  }

  destroy(): void {
    this.stopMonitoringConnection();
    this.stopAttemptingConnectionsContinuously();
    super.destroy();
  }

  setIpAddress(ipAddress: string): void {
    this.connectionOptions.host = ipAddress;
    this.connect();
  }

  stopAttemptingConnectionsContinuously(): void {
    clearInterval(this.attemptConnectionIntervalId);
  }

  subscribeToAccelerometerPoints(
    callback: (accelerometerPointsPoints: Array<SmartwatchAccelerometerPoint>) => void):
    Subscription {
    return this.accelerometerPointsSubject.subscribe(callback);
  }

  subscribeToGyroscopePoints(
    callback: (gyroscopePoints: Array<SmartwatchGyroscopePoint>) => void): Subscription {
    return this.gyroscopePointsSubject.subscribe(callback);
  }

  protected onConnection(): void {
    this.stopAttemptingConnectionsContinuously();
    console.log("Socket connection was established with a smartwatch");
    this.send('NeurostimAI endpoint connection');
    this.monitorConnection();
  }

  protected onData(data: string | Buffer): void {

    // Parse the packet received.
    const receivedPakcetItems = this.smartwatchPacketParser.parsePacket(data);
    if (!receivedPakcetItems.length) return;

    // Retreive the sensor points.
    const accelerometerPointsPoints: Array<SmartwatchAccelerometerPoint> = [];
    const gyroscopePointsPoints: Array<SmartwatchGyroscopePoint> = [];

    receivedPakcetItems.forEach((packetItem: PacketItem): void => {
      switch (packetItem.type) {
        case PacketItem.PakcetItemType.ACCELEROMETER:
          accelerometerPointsPoints.push(packetItem.payload as SmartwatchAccelerometerPoint);
          break;

        case PacketItem.PakcetItemType.GYROSCOPE:
          gyroscopePointsPoints.push(packetItem.payload as SmartwatchGyroscopePoint);
          break;

        default:
          break;
      }
    });

    // Send push notifications for the new data.
    if (accelerometerPointsPoints.length > 0) 
      this.accelerometerPointsSubject.next(accelerometerPointsPoints);
    if (gyroscopePointsPoints.length > 0) 
      this.gyroscopePointsSubject.next(gyroscopePointsPoints);
  }

  protected onError(): void {
    console.log('A connection to smartwatch error occured');
  }

  protected onClose(): void {
    console.log('Connection to smartwatch aborted');
    this.stopMonitoringConnection();
    if (this.mustProbeConnectionsContinuously)
      this.attemptConnectionsContinuously();
  }

  private monitorConnection(): void {
    this.pingIntervalId = setInterval(() => { this.ping() }, 500);
  }

  private ping(): void {
    this.send('PING');
  }

  private stopMonitoringConnection(): void {
    clearTimeout(this.pingIntervalId);
  }
}
