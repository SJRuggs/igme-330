export const rect = (ctx, { x: x, y: y, w: w, h: h, lineWidth: lineWidth = 0, fillStyle: fillStyle = "black", strokeStyle: strokeStyle = "black" }) => {
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

export const line = (ctx, {x1: x1, y1: y1, x2: x2, y2: y2, lineWidth: lineWidth = 1, strokeStyle: strokeStyle = "black"}) => {
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

export const arc = (ctx, {x: x, y: y, r: r, lineWidth: lineWidth = 0, fillStyle: fillStyle = "black", strokeStyle: strokeStyle = "black", startAngle: startAngle = 0, endAngle: endAngle = 2 * Math.PI}) => {
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

export const randomRect = ctx => rect(ctx, 
    {
        x:           getRandom(-10, ctx.canvas.width + 10),
        y:           getRandom(-10, ctx.canvas.height + 10),
        w:           getRandom(10,  200),
        h:           getRandom(10,  200),
        lineWidth:   getRandom(2,   30),
        fillStyle:   getRandomColor(),
        strokeStyle: getRandomColor()
    }
);

export const randomArc = ctx => arc(ctx,
    {
        x:           getRandom(-10, ctx.canvas.width + 10),
        y:           getRandom(-10, ctx.canvas.height + 10),
        r:           getRandom(10,  200),
        lineWidth:   getRandom(2,   30),
        fillStyle:   getRandomColor(),
        strokeStyle: getRandomColor(),
        startAngle:  getRandom(0,   2 * Math.PI),
        endAngle:    getRandom(0,   2 * Math.PI)
    }
);

export const randomLine = ctx => line(ctx,
    {
        x1:          getRandom(-10, ctx.canvas.width + 10),
        y1:          getRandom(-10, ctx.canvas.height + 10),
        x2:          getRandom(-10, ctx.canvas.width + 10),
        y2:          getRandom(-10, ctx.canvas.height + 10),
        lineWidth:   getRandom(2,   30),
        strokeStyle: getRandomColor()
    }
);

export const getRandomColor = e => {
  const floor = 35; // so that colors are not too bright or too dark 
  const getByte = () => getRandom(floor,255-floor);
  return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};

export const getRandom = (min, max) => Math.random() * (max - min) + min;

export const makeColor = (red, green, blue, alpha = 1) => `rgba(${red},${green},${blue},${alpha})`;

// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
export const goFullscreen = element => {
    if      (element.requestFullscreen)         element.requestFullscreen();
    else if (element.mozRequestFullscreen)      element.mozRequestFullscreen();
    else if (element.webkitRequestFullscreen)   element.webkitRequestFullscreen();   
    // .. and do nothing if the method is not supported
};

export const getLinearGradient = (ctx,startX,startY,endX,endY,colorStops) => {
  let lg = ctx.createLinearGradient(startX,startY,endX,endY);
  for(let stop of colorStops){
    lg.addColorStop(stop.percent,stop.color);
  }
  return lg;
};