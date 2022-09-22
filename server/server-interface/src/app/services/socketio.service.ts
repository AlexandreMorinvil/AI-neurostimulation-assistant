import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  isAuthenticated = false;

  constructor(private socket: Socket) { }

  sendMessage(message: string) {
    console.log('sendMessage');
    this.socket.emit('message', message);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(data => {
      console.log(data);
      return data;
    })
  }

}
