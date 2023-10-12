/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as canvas from './canvas.js';

let ctx,analyserNode,audioData;


export const setupCanvas = (canvasElement,analyserNodeRef) => {
	// create drawing context
	ctx = canvasElement.getContext("2d");
	// keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize / 2);
}

export const draw = (params={}) => {
  // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference" 
	analyserNode.getByteFrequencyData(audioData);
	// OR
	//analyserNode.getByteTimeDomainData(audioData); // waveform data
	
	// 2 - draw background
	canvas.rect(ctx, { x: 0, y: 0, w: ctx.canvas.width, h: ctx.canvas.height, fillStyle: "black" });
		
	// 3 - draw gradient
	if (params.showGradient) {
		ctx.save();
		ctx.fillStyle = canvas.getLinearGradient(ctx, 0, 0, 0, ctx.canvas.height,
			[
				{ percent: 0,   color: "purple"    },
				{ percent: .50, color: "indigo"   },
			]);
		ctx.globalAlpha = 0.8;
		ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
		ctx.restore();
	}
	
	// 4 - draw circles
	if (params.showCircles) {
		let maxRadius = ctx.canvas.height / 4;
		ctx.save();
		ctx.globalAlpha = 0.5;

		for (let i = 0; i < audioData.length; i++) {
			let percent = audioData[i] / 255;

			let circleRadius = percent * maxRadius;

			// red
			canvas.arc(ctx, {
				x: ctx.canvas.width / 2,
				y: ctx.canvas.height / 2,
				r: circleRadius,
				fillStyle: canvas.makeColor(255, 111, 111,  .34 - percent / 3.0)
			});

			// blue
			canvas.arc(ctx, {
				x: ctx.canvas.width / 2,
				y: ctx.canvas.height / 2,
				r: circleRadius * 1.5,
				fillStyle: canvas.makeColor(111, 111, 255, .10 - percent / 10.0)
			});

			// yellow
			canvas.arc(ctx, {
				x: ctx.canvas.width / 2,
				y: ctx.canvas.height / 2,
				r: circleRadius * 0.5,
				fillStyle: canvas.makeColor(255, 255, 111, .25 - percent / 4.0)
			});
		}

		ctx.restore();
	}
	
	// 5 - draw bars
	if (params.showBars) {
		let radius = 100;
		for (let i = 0; i < audioData.length; i++) {
			let theta = i * 2 * Math.PI / audioData.length;
			let line = {
				x1: ctx.canvas.width  / 2 + Math.cos(theta - Math.PI / 2) * radius,
				y1: ctx.canvas.height / 2 + Math.sin(theta - Math.PI / 2) * radius,
				x2: ctx.canvas.width  / 2 + Math.cos(theta - Math.PI / 2) * (radius + audioData[i]),
				y2: ctx.canvas.height / 2 + Math.sin(theta - Math.PI / 2) * (radius + audioData[i]),
				strokeStyle: `hsl(${i / audioData.length * 255}, 100%, ${params.volume / 2 + 25}%)`,
				lineWidth: 3
			};
			canvas.line(ctx, line);
		}
	}
}