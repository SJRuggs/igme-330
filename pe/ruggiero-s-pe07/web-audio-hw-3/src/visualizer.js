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

	// 6 - bitmap manipulation
	// TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
	// regardless of whether or not we are applying a pixel effect
	// At some point, refactor this code so that we are looping though the image data only if
	// it is necessary

	// A) grab all of the pixels on the canvas and put them in the `data` array
	// `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
	// the variable `data` below is a reference to that array 
	let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
	let data = imageData.data;
	let length = data.length;
	let width = imageData.width; // not using here
	
	// B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
	for (let i = 0; i < length; i += 4) {

		// C) randomly change every 20th pixel to red
		if (params.showNoise && Math.random() < .05) {
			// data[i] is the red channel
			// data[i+1] is the green channel
			// data[i+2] is the blue channel
			// data[i+3] is the alpha channel
			data[i] = data[i + 1] = data[i + 2] = 0;	// zero out the red and green and blue channels
			data[i + 2] = 255;	// make the red channel 100% red
		}
		
		if (params.showInvert) {
			let red = data[i], green = data[i + 1], blue = data[i + 2];
			data[i] 	= 255 - red;
			data[i + 1] = 255 - green;
			data[i + 2] = 255 - blue;
		}
	}

	// Emboss
	if (params.showEmboss) {
		for (let i = 0; i < length; i++) {
			if (i % 4 == 3) continue; // skip alpha channel
			data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
		}
	}
	
	// D) copy image data back to canvas
	ctx.putImageData(imageData, 0, 0);
}