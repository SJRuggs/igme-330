import * as utils from "./utils.js";
import * as canvasUtils from "./canvas-utils.js";

(() => {
    // canvas
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");

    // animation states
    let paused = false;
    let createRectangles = true;
    let createCircles = true;
    let createLines = true;
    
    // draw circle cluster
    const canvasClicked = (e) => {
        let rect = e.target.getBoundingClientRect();
        for (let i = 0; i < 10; i++) {
            let x = utils.getRandomInt(-100, 100) + e.clientX - rect.x;
            let y = utils.getRandomInt(-100, 100) + e.clientY - rect.y;
            let w = utils.getRandomInt(20, 50);
            let color = utils.getRandomColor();
            canvasUtils.drawArc(ctx,
                {
                    x: x,
                    y: y,
                    r: w,
                    lineWidth: 5,
                    fillStyle: color,
                    strokeStyle: utils.getRandomColor(),
                    startAngle: 0,
                    endAngle: 2 * Math.PI
                }
            );
        }
    }

    // setup event handlers and call first update
    const setup = () => {
        canvas.onclick = canvasClicked;
        document.querySelector("#cb-rectangles").onclick = function (e) { createRectangles = e.target.checked; }
        document.querySelector("#cb-circles").onclick = function (e) { createCircles = e.target.checked; }
        document.querySelector("#cb-lines").onclick = function (e) { createLines = e.target.checked; }
        document.querySelector("#btn-pause").onclick = e => paused = true;
        document.querySelector("#btn-play").onclick = e => {
            if (paused) {
                paused = false;
                update();
            }
        };
        update();
    }

    // called once each frame
    const update = () => {
        paused ? null : requestAnimationFrame(update);
        createRectangles ? canvasUtils.drawRandomRect(ctx) : null;
        createCircles ? canvasUtils.drawRandomArc(ctx) : null;
        createLines ? canvasUtils.drawRandomLine(ctx) : null;
    }

    setup();
})();