import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChartService } from './chart.service';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  isAuthenticated = false;

  constructor(private socket: Socket, private chartService: ChartService) { }

  sendMessage(message: string) {
    console.log('sendMessage');
    this.socket.emit('message', message);
  }

  getMessage() {
    return this.socket.fromEvent('message').pipe(data => {
      return data;
    })
  }

}
