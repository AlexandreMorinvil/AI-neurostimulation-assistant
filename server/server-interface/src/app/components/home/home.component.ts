import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { SocketioService } from 'src/app/services/socketio.service';
import { ChartService } from 'src/app/services/chart.service';
import { HttpService } from 'src/app/services/http.service';
import { Command, Action } from 'src/app/interfaces/command';
import { Algorithm } from 'src/app/interfaces/algorithm';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('myChart', { static: false }) myChart: ElementRef;
  dimention = null;
  n_param = 2;

  public ctx: CanvasRenderingContext2D;

  constructor(private socketioService: SocketioService, private chartService: ChartService, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.socketioService.getMessage().subscribe(message => {
      console.log(message);
    })
  }

  ngAfterViewInit(): void {
    this.ctx = this.myChart.nativeElement.getContext('2d');
    this.ctx.canvas.width = window.innerWidth * 0.7;
    this.ctx.canvas.height = window.innerHeight * 0.8;
    this.chartService.setCanvas(this.ctx);
    this.chartService.generateHeatMap([], 20);
  }

  sendMessage() {
    console.log(this.dimention, this.n_param)
    //this.socketioService.sendMessage('TestNoe');
    let command: Command = { action: Action.START_ALGORITHM, arg: { n_param: this.n_param, dimention: this.dimention } };
    this.httpService.postCommand(command).subscribe(
      (data) => {
        let algorithm: Algorithm = {
          n_param: data.content.n_param,
          position: JSON.parse(data.content.position),
          data: JSON.parse(data.content.data),
          dimention: data.content.dimention
        }
        algorithm.data.sort((a, b) => { return a[0] - b[0] })
        this.chartService.draw_heat_map(algorithm);
        console.log(algorithm.data);
      },
      (error) => {
        console.log("+++ error send command +++")
      }
    );
  }


}
