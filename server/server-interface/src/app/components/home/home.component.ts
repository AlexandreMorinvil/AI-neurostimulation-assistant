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

  list_selection = ["Heat map", "Watch data"]
  selected = this.list_selection[0];
  current_algorithm = null
  watch_data = [1, 1, 3, 55, 9, 14, 54, 73, 64, 88, 55, 44, 99, 91, 24, 58, 78, 87, 369, 54, 1, 0, 10]

  constructor(private socketioService: SocketioService, private chartService: ChartService, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.socketioService.getMessage().subscribe((message: number) => {
      this.chartService.receive_watch_data(message)
      //console.log(message);
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
    this.socketioService.sendMessage('TestNoe');
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
        this.current_algorithm = algorithm;
        this.chartService.draw_heat_map(algorithm);
        console.log(algorithm.data);
      },
      (error) => {
        console.log("+++ error send command +++")
      }
    );
  }


  reset_chart() {
    if (this.chartService.myChart) {
      this.chartService.myChart.destroy();
      this.chartService.myChart = null;
    }
    if (this.selected === this.list_selection[0]) {
      if (this.current_algorithm) {
        this.chartService.draw_heat_map(this.current_algorithm);
      }
    } else {
      this.chartService.draw_watch_data(this.watch_data);
    }
  }


}
