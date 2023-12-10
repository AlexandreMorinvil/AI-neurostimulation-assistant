import TcpSocketClient from '@class/socket/TcpSocketClient'
import SmartwatchPacketParser from './SmartwatchPacketParser';
import PacketItem from './PacketItem';
import { Subject, Subscription } from 'rxjs';

export default class SmartwatchSocket extends TcpSocketClient {
	
	private dataSubject: Subject<Array<PacketItem>> = new Subject();
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

  subscribeToData(callback: (pakcetItems: Array<PacketItem>) => void): Subscription  {
    return this.dataSubject.subscribe(callback);
  }

	protected onConnection(): void {
		console.log("Socket connection was established with smartwatch");
		this.send('NeurostimAI endpoint connection');
    this.monitorConnection();
	}

	protected onData(data: string | Buffer): void {
		const receivedPakcetItems = this.SmartwatchPacketParser.parsePacket(data);
    if (receivedPakcetItems.length > 0)
		  this.dataSubject.next(receivedPakcetItems);
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
