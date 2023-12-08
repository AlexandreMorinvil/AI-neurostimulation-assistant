import TcpSocketClient from '@class/socket/TcpSocketClient'
import SmartWatchPacketParser from './SmartWatchPacketParser';

export default class SmartwatchSocket extends TcpSocketClient {

	smartWatchPacketParser: SmartWatchPacketParser = new SmartWatchPacketParser();

	constructor() {
		super()
		this.connectionOptions = {
			port: 9000,
			host: '192.168.0.170' // '192.168.0.170',
		};
	}
	
	onConnection(): void {
		console.log("Socket connection was established with smartwatch");
		this.send('NeurostimAI endpoint connection');
	}

	onData(data: string | Buffer): void {
		// TODO: Transmit the data received to the next step of the application
		const receivedPakcetItems = this.smartWatchPacketParser.parsePacket(data);
		console.log(`message was received: `, receivedPakcetItems);
	}
	
	onError(error: Error): void {
		console.error(error);
	}
}