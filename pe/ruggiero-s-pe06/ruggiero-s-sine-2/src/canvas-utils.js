import * as utils from "./utils.js";

export const drawRectangle = (ctx, { x: x, y: y, w: w, h: h, lineWidth: lineWidth = 0, fillStyle: fillStyle = "black", strokeStyle: strokeStyle = "black" }) => {
    ctx.save();
    ctx.fillStyle = fillStyle;

    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();

    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }

    ctx.closePath();
    ctx.restore();
}

export const drawLine = (ctx, {x1: x1, y1: y1, x2: x2, y2: y2, lineWidth: lineWidth = 1, strokeStyle: strokeStyle = "black"}) => {
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.stroke();

    ctx.closePath();
    ctx.restore();
}

export const drawArc = (ctx, {x: x, y: y, r: r, lineWidth: lineWidth = 0, fillStyle: fillStyle = "black", strokeStyle: strokeStyle = "black", startAngle: startAngle = 0, endAngle: endAngle = 2 * Math.PI}) => {
    ctx.save();
    ctx.fillStyle = fillStyle;

    ctx.beginPath();
    ctx.arc(x, y, r, startAngle, endAngle, false);
    ctx.fill();

    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }

    ctx.closePath();
    ctx.restore();
}

export const drawRandomRect = (ctx) => drawRectangle(ctx, 
    {
        x:           utils.getRandomInt(-10, ctx.canvas.width + 10),
        y:           utils.getRandomInt(-10, ctx.canvas.height + 10),
        w:           utils.getRandomInt(10,  200),
        h:           utils.getRandomInt(10,  200),
        lineWidth:   utils.getRandomInt(2,   30),
        fillStyle:   utils.getRandomColor(),
        strokeStyle: utils.getRandomColor()
    }
);

export const drawRandomArc = (ctx) => drawArc(ctx,
    {
        x:           utils.getRandomInt(-10, ctx.canvas.width + 10),
        y:           utils.getRandomInt(-10, ctx.canvas.height + 10),
        r:           utils.getRandomInt(10,  200),
        lineWidth:   utils.getRandomInt(2,   30),
        fillStyle:   utils.getRandomColor(),
        strokeStyle: utils.getRandomColor(),
        startAngle:  utils.getRandomInt(0,   2 * Math.PI),
        endAngle:    utils.getRandomInt(0,   2 * Math.PI)
    }
);

export const drawRandomLine = (ctx) => drawLine(ctx,
    {
        x1:          utils.getRandomInt(-10, ctx.canvas.width + 10),
        y1:          utils.getRandomInt(-10, ctx.canvas.height + 10),
        x2:          utils.getRandomInt(-10, ctx.canvas.width + 10),
        y2:          utils.getRandomInt(-10, ctx.canvas.height + 10),
        lineWidth:   utils.getRandomInt(2,   30),
        strokeStyle: utils.getRandomColor()
    }
);

