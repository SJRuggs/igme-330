import * as utils from "./utils.js";
import * as canvasUtils from "./canvas-utils.js";
import * as spritesUtils from "./sprites.js";

(() => {
    // canvas
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext("2d");

    // animation states
    let paused = false;

    // sprites
    let sprites = [];

    // setup event handlers and call first update
    const setup = () => {
        document.querySelector("#btn-pause").onclick = (e) => paused = true;
        document.querySelector("#btn-play").onclick = (e) => {
            if (paused) {
                paused = false;
                update();
            }
        };

        sprites.push(new spritesUtils.Arc({
            x: 100,
            y: 100,
            r: 50,
            fillStyle: "red"
        }));

        update();
    }

    // called once each frame
    const update = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!paused) requestAnimationFrame(update);
        sprites.forEach(sprite => {
            sprite.draw(ctx);
            sprite.update();
        });
    }

    setup();
})();