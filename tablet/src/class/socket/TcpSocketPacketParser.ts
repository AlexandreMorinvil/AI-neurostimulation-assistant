export abstract class TcpSocketPacketParser {
	
	public abstract parsePacket(buffer : Buffer): any

	protected decode(buffer : string | Buffer): string {
		return buffer.toString();
	}
}