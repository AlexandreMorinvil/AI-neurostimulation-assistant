import TcpSocketPacketParser from "./TcpSocketPacketParser";
import PacketItem from "./PacketItem";

export default class SmartWatchPacketParser extends TcpSocketPacketParser {

    /**
     * Parse the packet of a packet received from a smartwatch.
     *  
     * The decoded data includes data items with one of the following formats :
     * 
     * <ACCELEROMETER,timestamp,acceleration_x,acceleration_y,acceleration_z>
     * <GYROSCOPE,timestamp,rotation_x,rotation_y,rotation_z>
     * 
     * @param buffer 
     */
    parsePacket(buffer: string | Buffer): Array<PacketItem> {
        const decodedString: string = this.decode(buffer);
        const packetItems: Array<string> = this.extractPacketItems(decodedString);
        return packetItems.map((element) => this.parsePacketItem(element));
    }

    /**
     * Extract the string of one packet item.
     * 
     * @param decodedString 
     * @param startIndex 
     * @returns An array of strings with the content of all the packet items from the input string.
     */
    private extractPacketItems(decodedString: string): Array<string> {
        return decodedString.match(/<([^>]+)>/g) || [];
    }

    /**
     * Generate a list of packetItem objects from a list of packet items in string. 
     * 
     * @param packetItem 
     * @returns 
     */
    private parsePacketItem(packetItem: string): PacketItem {
        const [pakcetItemType, ...data] = packetItem
            .replace('<', '')
            .replace('>', '')
            .trim()
            .split(',');
        return new PacketItem(pakcetItemType, data);
    }
}