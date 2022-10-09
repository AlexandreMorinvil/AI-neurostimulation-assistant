import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { SocketioService } from 'src/app/services/socketio.service';
import { ChartService } from 'src/app/services/chart.service';
import { HttpService } from 'src/app/services/http.service';
import { Command, Action } from 'src/app/interfaces/command';
import { Algorithm } from 'src/app/interfaces/algorithm';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('myChart', { static: false }) myChart: ElementRef;
  dimention = null;
  n_param = 2;
  A = null;
  B = null;
  y_value =null;
  querry_display = "none"
  session_display = "flex"

  public ctx: CanvasRenderingContext2D;

  list_selection = ["Heat map", "Watch data"]
  selected = this.list_selection[0];
  current_algorithm : Algorithm = null;
  watch_data = []

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

  start_session() {
    console.log(this.dimention, this.n_param)
    this.socketioService.sendMessage('TestNoe');
    let command: Command = { action: Action.START_SESSION, arg: { n_param: this.n_param, dimention: this.dimention } };
    this.httpService.postCommand(command).subscribe(
      (data) => {
        this.current_algorithm = {
          n_param: this.n_param,
          position: [],
          data: [],
          dimention: this.dimention
        }
        this.querry_display = "flex";
        this.session_display = "none";
      },
      (error) => {
        console.log("+++ error send command +++")
      }
    );
  }

  send_querry() {
    console.log(this.dimention, this.n_param)
    let command: Command = { action: Action.EXECUTE_QUERY, arg: { A: this.A, B: this.B, y_value:this.y_value } };
    this.httpService.postCommand(command).subscribe(
      (data) => {     
        console.log(data.content)
        this.current_algorithm.position = JSON.parse(data.content.position),
        this.current_algorithm.data = JSON.parse(data.content.predict_heat_map),    
        this.chartService.draw_heat_map(this.current_algorithm);
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
