import SmartWatchSocketClient from '@class/socket/SmartWatchSocketClient'

class SmartwatchSocketService {

  private clientSocket: SmartWatchSocketClient

  constructor() {
    this.clientSocket = new SmartWatchSocketClient()
  }

  public testFunction() {
    this.clientSocket = new SmartWatchSocketClient();
    console.log("Got inside the function deep inside");
    this.clientSocket.connect()
  }
  
  public send(data: string | Buffer) {
    this.clientSocket.send(data);
  }
}


const socketService = new SmartwatchSocketService()
export { socketService }
