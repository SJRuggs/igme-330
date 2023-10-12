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
        let angle = 0;
        let step = Math.PI * 2 / 100;
        for (let i = 0; i < 1; i += 0.01) {
            data.x = i;
            data.y = Math.sin(angle) / 2 + 0.5;
            canvasUtils.drawArc(ctx, {
                x: data.x * ctx.canvas.width,
                y: data.y * ctx.canvas.height,
                r: 2,
                fillStyle: "white",
            });
            angle += step;
        }

    }

    setupCanvas();
})();