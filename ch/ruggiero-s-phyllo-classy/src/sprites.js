import * as canvasUtils from "./canvas-utils.js";

export class Arc{

    constructor(object = {
        x: x,
        y: y,
        r: r,
        lineWidth: lineWidth,
        fillStyle: fillStyle,
        strokeStyle: strokeStyle,
        start: start,
        end: end
    }){ Object.assign(this, object); }
    
    update() {
        this.x += 1;
        this.y += 1;
        // this.x, this.y += 1;
    }
    
    draw(ctx) { canvasUtils.drawArc(ctx, this); }
  }