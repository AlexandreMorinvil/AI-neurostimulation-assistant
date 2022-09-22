import { Injectable } from '@angular/core';
import { Algorithm } from 'src/app/interfaces/algorithm';

let COLOR_MAP = [
  [0, "blue"],
  [1, "purple"],
  [2, "cyan"],
  [3, "yellow"],
  [4, "orange"],
  [5, "red"],

]

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  public ctx: CanvasRenderingContext2D;
  public color: string = "white";

  constructor() { }


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

  createRectangle(dx: number, dy: number, posX: number, posY: number, color: string) {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(posX, posY, dx, dy);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.rect(posX, posY, dx, dy);
    this.ctx.stroke();
  }

  draw_heat_map(algorithm: Algorithm) {
    this.clear_canvas();
    let dx = this.ctx.canvas.width / algorithm.dimention;
    let dy = this.ctx.canvas.height / algorithm.dimention;
    let index_x = 0;
    let index_y = 0;
    for (let i = 0; i < Math.pow(algorithm.dimention, algorithm.n_param); i++) {
      let x = index_x * dx;
      let y = index_y * dy;
      this.createRectangle(dx, dy, x, y, this.getHeatColor(algorithm.data[i][1] * 10));
      index_x++;
      if (index_x === algorithm.dimention) {
        index_x = 0;
        index_y++;
      }
    }
  }

  clear_canvas() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }


  getHeatColor(data: number): any {
    if (data <= 0) {
      return COLOR_MAP[0][1];
    }
    else {
      for (let i = 1; i < COLOR_MAP.length - 1; i++) {
        if (data >= COLOR_MAP[i][0] && data <= COLOR_MAP[i + 1][0]) {
          return COLOR_MAP[i][1];
        }
      }
    }
    return COLOR_MAP[0][1];
  }


}
