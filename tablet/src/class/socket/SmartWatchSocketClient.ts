import { TcpSocketClient } from '@class/socket/TcpSocketClient'
import { SmartwatchPacketParser } from './SmartwatchPacketParser';
import { PacketItem } from './PacketItem';
import { Subject, Subscription } from 'rxjs';
import { SensorPoint } from '@class/dataPoint/SensorPoint';

export class SmartwatchSocketClient extends TcpSocketClient {
	
	private sensorPointSubject: Subject<Array<SensorPoint>> = new Subject();
	private pingIntervalId!: NodeJS.Timeout;
	private SmartwatchPacketParser: SmartwatchPacketParser = new SmartwatchPacketParser();

	constructor() {
		super()
		this.connectionOptions = {
			port: 9000,
			host: '192.168.0.170',
		};
	}
	
  destroy(): void {
    clearTimeout(this.pingIntervalId);
    super.destroy();
  }

  subscribeToSensorPoints(callback: (pakcetItems: Array<SensorPoint>) => void): Subscription {
    return this.sensorPointSubject.subscribe(callback);
  }

	protected onConnection(): void {
		console.log("Socket connection was established with a smartwatch");
		this.send('NeurostimAI endpoint connection');
    this.monitorConnection();
	}

	protected onData(data: string | Buffer): void {
    // Parse the packet received
		const receivedPakcetItems = this.SmartwatchPacketParser.parsePacket(data);
    if (!receivedPakcetItems.length) return;

    // Retreive the sensor points and push them
    const sensorPoints: Array<SensorPoint> = receivedPakcetItems
      .filter((packetItem) => packetItem.containsSensorPoint())
      .map((packetItem: PacketItem) => packetItem.payload!);

    this.sensorPointSubject.next(sensorPoints);
	}
	
	protected onError(): void {
    console.log('A connection to smartwatch error occured');
  }

	protected onClose(): void {
    console.log('Connection to smartwatch aborted');
		clearTimeout(this.pingIntervalId);
	}

  private monitorConnection(): void {
    this.pingIntervalId = setInterval(() => { this.ping() }, 500);
  }

  private ping(): void {
    this.send('PING');
  }
}
