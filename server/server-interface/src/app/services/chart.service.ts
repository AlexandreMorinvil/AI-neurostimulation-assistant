import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Algorithm } from 'src/app/interfaces/algorithm';
import { ChartType } from 'chart.js';
import { HttpService } from './http.service';
import { Action, Command } from '../interfaces/command';
import { stringify } from 'querystring';

let COLOR_MAP = [
  [0, 'blue'],
  [1, 'purple'],
  [2, 'cyan'],
  [3, 'yellow'],
  [4, 'orange'],
  [5, 'red'],
  [6, 'red'],
  [7, 'red'],
  [8, 'red'],
  [9, 'red'],
  [10, 'red'],
  [11, 'red'],
];

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public ctx: CanvasRenderingContext2D;
  myChart: Chart = null;
  public color: string = 'white';
  CLOCK_TICK = 0.5;
  current_label = 0;
  chart_data = [];
  chart_label = [];
  current_algorithm: Algorithm = null;
  next_query_color = ["black", "white"]
  index_next_query_color = 0;

  constructor(private httpService: HttpService) {
    Chart.register(...registerables);

    setInterval(() => {
      if (this.ctx) {
        this.blink_next_querry();
      }
    }, 500);
  }

  public mock_watch_data() {
    const random_value = this.getRandomInt(-100, 100);
    const command: Command = {
      action: Action.RECEIVE_DATA_WATCH,
      arg: { value: random_value },
    };
    this.httpService.postCommand(command).subscribe(
      (data) => {
        //this.receive_watch_data(data.content);
      },
      (error) => {
        console.log('+++ error send command +++');
      }
    );
  }

  receive_watch_data(data: number[]) {
    if (this.chart_label.length > 500) {
      for (let i = 0; i < data.length; i++) {
        this.chart_label.shift();
        this.chart_data.shift();
      }
    }
    for (let i = 0; i < data.length; i++) {
      this.current_label = 1;
      this.chart_label.push(this.current_label);
      this.chart_data.push(data[i]);
    }
    if (this.myChart) {
      this.myChart.update();
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


  blink_next_querry(){
    if(this.current_algorithm){
      console.log("NQ")
      this.index_next_query_color === 0 ? this.index_next_query_color =1 : this.index_next_query_color = 0;
      if(this.current_algorithm.next_query){
        let dx = this.ctx.canvas.width / this.current_algorithm.dimention;
        let dy = this.ctx.canvas.height / this.current_algorithm.dimention; 

        const y = Math.floor(this.current_algorithm.next_query / this.current_algorithm.dimention);
        const x = this.current_algorithm.next_query - y*this.current_algorithm.dimention

        const posX = dx * x;
        const posY = dy * y;
        this.createRectangle(dx, dy, posX, posY, this.next_query_color[this.index_next_query_color]);
      }
    }
  }


  public setCanvas(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public generateHeatMap(data: number[], dimention: number) {
    let dx = this.ctx.canvas.width / dimention;
    let dy = this.ctx.canvas.height / dimention;
    let index_x = 0;
    let index_y = 0;
    for (let i = 0; i < dimention * dimention; i++) {
      let x = index_x * dx;
      let y = index_y * dy;
      this.createRectangle(dx, dy, x, y, this.color);
      index_x++;
      if (index_x === dimention) {
        index_x = 0;
        index_y++;
      }
    }
  }

  createRectangle(
    dx: number,
    dy: number,
    posX: number,
    posY: number,
    color: string
  ) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(posX, posY, dx, dy);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.rect(posX, posY, dx, dy);
    this.ctx.stroke();
  }

  draw_heat_map(algorithm: Algorithm) {
    this.current_algorithm = algorithm;
    console.log('draw');
    this.clear_canvas();
    let dx = this.ctx.canvas.width / algorithm.dimention;
    let dy = this.ctx.canvas.height / algorithm.dimention;
    let index_x = 0;
    let index_y = 0;
    for (let i = 0; i < Math.pow(algorithm.dimention, algorithm.n_param); i++) {
      let x = index_x * dx;
      let y = index_y * dy;
      this.createRectangle(
        dx,
        dy,
        x,
        y,
        this.getHeatColor(algorithm.data[i][1])
      );
      index_x++;
      if (index_x >= algorithm.dimention) {
        index_x = 0;
        index_y++;
      }
    }
    this.blink_next_querry();
  }

  draw_text(posX, posY, A, B) {
    if (this.current_algorithm) {
      this.draw_heat_map(this.current_algorithm);
      this.ctx.font = '12px serif';
      const text = 'A = ' + A + '; B = ' + B;
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(text, posX, posY);
    }
  }

  get_value_from_mouse_position(posX, posY) {
    if (this.current_algorithm) {
      const dx = this.ctx.canvas.width / this.current_algorithm.dimention;
      const dy = this.ctx.canvas.height / this.current_algorithm.dimention;

      const x = Math.floor(posX / dx);
      const y = Math.floor(posY / dy);
      console.log(x);
      return [x, y];
    }
    return null;
  }

  clear_canvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  getHeatColor(data: number): any {
    if (data <= 0) {
      return COLOR_MAP[0][1];
    } else {
      for (let i = 1; i < COLOR_MAP.length - 1; i++) {
        if (data >= COLOR_MAP[i][0] && data <= COLOR_MAP[i + 1][0]) {
          return COLOR_MAP[i][1];
        }
      }
    }
    return COLOR_MAP[0][1];
  }

  draw_watch_data(data_watch: number[]) {
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.chart_label,
        datasets: [
          {
            label: 'My First Dataset',
            data: this.chart_data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }

  removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }
}
