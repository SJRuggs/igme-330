import * as canvas from "./canvas.js";

const init = e => {
	let ctx = document.querySelector('canvas').getContext('2d');
	let rotation = 0;
	let rotationSpeed = .05;
	let transformAmount = 0;
    let strokeStyle = "black";

    const loop = e => {
        requestAnimationFrame(loop);
        ctx.save();
        	ctx.translate(320, 240);
        	ctx.scale(.5, .5);
		ctx.rotate(rotation);
		ctx.lineWidth=1;
		ctx.linePath = "round";
		ctx.lineJoin = "round";
		ctx.beginPath()
		ctx.moveTo(40, 400);
		ctx.bezierCurveTo(420, 78, 178, 93, 600, 400);
		ctx.lineTo(40,400);
		ctx.closePath();
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
		ctx.restore();
        rotation += rotationSpeed;
        transformAmount += .1;
    }

    const fillBGWithRandomTint = () => {
        ctx.save();
        ctx.fillStyle = canvas.getRandomColor();
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    }
    
    // draw background
    fillBGWithRandomTint();
		
    // 2 - schedule some code to fire at regular intervals
    
    // 3 - start the loop animation
    loop(ctx);
}

init();