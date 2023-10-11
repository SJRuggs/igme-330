import * as canvasUtils from "./canvas-utils.js";

(() => {
    let ctx;
    let data = { x: 0, y: 0, angle: 0 };
    const canvasWidth = 400, canvasHeight = 400;
    const fps = 12;

    // helpers
    const dtr = (degrees) =>  degrees * (Math.PI / 180);

    const drawCircle = (ctx, x, y, radius, color) => {
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    const setupCanvas = () => {
        ctx = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        loop();
    }

    const loop = () => {
        // que next frame
        setTimeout(loop, 1000 / fps);

        // fade
        canvasUtils.drawRectangle(ctx, {
            x: 0,
            y: 0,
            w: ctx.canvas.width,
            h: ctx.canvas.height,
            fillStyle: `rgba(0, 0, 0, ${1 / fps})`,
        });

        // sine
        data.angle += 0.3;
        data.x += 10;
        data.y = ctx.canvas.height / 2 + Math.sin(data.angle) * 100;
        canvasUtils.drawArc(ctx, {
            x: data.x,
            y: data.y,
            r: 2,
            fillStyle: "white",
        });

        // cosine
        data.y = ctx.canvas.height / 2 + Math.cos(data.angle) * 100;
        canvasUtils.drawArc(ctx, {
            x: data.x,
            y: data.y,
            r: 2,
            fillStyle: "red",
        });

        // 
        data.y = ctx.canvas.height / 2 - Math.sqrt(data.x % 50) * 5;
        canvasUtils.drawArc(ctx, {
            x: data.x,
            y: data.y,
            r: 4,
            fillStyle: "yellow",
        });

        data.x > ctx.canvas.width ? data.x = 0 : null;
    }

    setupCanvas();
})();