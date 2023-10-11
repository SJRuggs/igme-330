import * as canvasUtils from "./canvas-utils.js";

(() => {
    const canvasWidth = 500, canvasHeight = 500;
    let ctx;
    const fps = 240;

    let n = 0;
    let divergenceStart = -137.6;
    let divergence = divergenceStart;
    let cStart = 5;
    let c = cStart;
    let petalSizeStart = 2;
    let petalSize = petalSizeStart;
    let count = 1;
    let direction = 1;

    const dtr = (degrees) => degrees * (Math.PI / 180);

    const setup = () => {
        ctx = canvas.getContext("2d");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        document.querySelector("#btn-restart").onclick = () => {
            ctx.globalAlpha = 1 / Math.pow(count, 2);
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            n = 0;
            c = cStart;
            petalSize = petalSizeStart;
            divergence = divergenceStart;
            count = 1;
            direction = 1;
        }

        document.querySelector("#ctrl-divergence").onchange = (e) => {
            divergenceStart = e.target.value * -1;
            divergence = divergenceStart;
        }

        loop();
    }
    

    const loop = () => {
        setTimeout(loop, 1000 / fps);

        // fade
        // canvasUtils.drawRectangle(ctx, {
        //     x: 0,
        //     y: 0,
        //     w: ctx.canvas.width,
        //     h: ctx.canvas.height,
        //     fillStyle: `rgba(0, 0, 0, ${1 / fps})`,
        // });

        // each frame draw a new dot
        // `a` is the angle
        // `r` is the radius from the center (e.g. "Pole") of the flower
        // `c` is the "padding/spacing" between the dots
        let a = n * dtr(divergence);
        let r = c * Math.sqrt(n);

        // now calculate the `x` and `y`
        let x = r * Math.cos(a) + canvasWidth / 2;
        let y = r * Math.sin(a) + canvasHeight / 2;

        // draw the dot
        let aDegrees = (n * divergence) % 361;
        let color = `hsl(${aDegrees},100%,50%)`;
        canvasUtils.drawArc(ctx, {
            x: x,
            y: y,
            r: petalSize,
            fillStyle: color
        });

        divergence += .002 * direction;
        c += .003;
        petalSize += .006;

        n++;

        // reset
        if (x > ctx.canvas.width * 1.2) {
            count++;
            n = 0;
            c = cStart;
            petalSize -= 5;
            ctx.globalAlpha = 1 / Math.pow(count, 2);
            direction = -direction;
        }

    }
    
    setup();
})();