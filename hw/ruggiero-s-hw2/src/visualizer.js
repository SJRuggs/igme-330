/*
	The purpose of this file is to take in the analyser node and a <canvas> element: 
	  - the module will create a drawing context that points at the <canvas> 
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/
import * as sprite from './sprite.js';

let ctx, analyserNode, audioData, table;
let barCount = 100;
let canvas;
let sprites = [];

export const setupCanvas = (canvasElement, analyserNodeRef) => {
	canvas = canvasElement;
	ctx = canvas.getContext("2d"); 							// create drawing context
	analyserNode = analyserNodeRef; 						// keep a reference to the analyser node
	audioData = new Uint8Array(analyserNode.fftSize / 2);	// this is the array where the analyser data will be stored
	table = document.createElement("table");				// create table
    document.querySelector("#data").appendChild(table);		// append table to DOM

	for (let i = 0; i < barCount; i++) {					// create sprites
		sprites.push(new sprite.CircleSprite(ctx.canvas.width / barCount * i, 0, 0));
	}
}

export const draw = (params={}) => {
	analyserNode.getByteFrequencyData(audioData);
	audioData = audioData.slice(0, barCount);

	if (params.visualize) {
		table.style.display = "none";
		canvas.style.display = "block";

		// clear canvas
		ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
		// param interpereation
		if (params.gradient) drawGradient();
		if (params.circles) drawCircles();
		if (params.bars) drawBars(params);
		let imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
		let data = imageData.data;
		let length = data.length;
		let width = imageData.width;
		if (params.noise) drawNoise(data, length);
		if (params.invert) drawInvert(data, length);
		if (params.emboss) drawEmboss(data, length, width);

		// copy image data back to canvas
		ctx.putImageData(imageData, 0, 0);

		// sprites
		for (let i = 0; i < sprites.length; i++) {
			sprites[i].setRadius((audioData[i] / 50) ** 2);
			sprites[i].setColor(`hsl(${i / audioData.length * 255}, 100%, ${params.volume / 2 + 25}%)`);
			sprites[i].update(ctx, audioData[i]);
		}
	}

	else {
		table.style.display = "block";
		canvas.style.display = "none";

		let arr = new Uint8Array(analyserNode.fftSize);
		arr = arr.slice(0, barCount);
		analyserNode.getByteTimeDomainData(arr);
		drawTable(arr);
	}
}

const drawBars = params => {
	let radius = 100;
	for (let i = 0; i < audioData.length; i++) {

		// calc
		let theta = i * 2 * Math.PI / audioData.length;
		let x1 = ctx.canvas.width / 2 + Math.cos(theta - Math.PI / 2) * radius;
		let y1 = ctx.canvas.height / 2 + Math.sin(theta - Math.PI / 2) * radius;
		let x2 = ctx.canvas.width / 2 + Math.cos(theta - Math.PI / 2) * (radius + audioData[i]);
		let y2 = ctx.canvas.height / 2 + Math.sin(theta - Math.PI / 2) * (radius + audioData[i]);
		let lineWidth = 3;
		let strokeStyle = `hsl(${i / audioData.length * 255}, 100%, ${params.volume / 2 + 25}%)`;

		// draw
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.closePath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = strokeStyle;
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}

const drawCircles = e => {
	let maxRadius = ctx.canvas.height / 4;
	ctx.save();
	ctx.globalAlpha = 0.5;
	for (let i = 0; i < audioData.length; i++) {
		let percent = audioData[i] / 255;
		let radius = percent * maxRadius;
		let x = ctx.canvas.width / 2;
		let y = ctx.canvas.height / 2;
		let redColor = 		`rgba(255, 111, 111, ${.34 - percent / 3.0})`;
		let blueColor = 	`rgba(111, 111, 255, ${.10 - percent / 10.0})`;
		let yellowColor =	`rgba(255, 255, 111, ${.25 - percent / 4.0})`;
		let redRadius = 	radius;
		let blueRadius = 	radius * 1.5;
		let yellowRadius = 	radius * 0.5;
		
		// red
		ctx.fillStyle = redColor;
		ctx.beginPath();
		ctx.arc(x, y, redRadius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();

		// blue
		ctx.fillStyle = blueColor;
		ctx.beginPath();
		ctx.arc(x, y, blueRadius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();

		// yellow
		ctx.fillStyle = yellowColor;
		ctx.beginPath();
		ctx.arc(x, y, yellowRadius, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
	ctx.restore();
}

const drawEmboss = (data, length, width) => {
	for (let i = 0; i < length; i++) {
		if (i % 4 == 3) continue; // skip alpha channel
		data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
	}
}

const drawGradient = e => {
	ctx.save();
	ctx.fillStyle = getLinearGradient(ctx, 0, 0, 0, ctx.canvas.height,
		[
			{ percent: 0,   color: "purple"    },
			{ percent: .50, color: "indigo"   },
		]);
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.restore();
}

const drawInvert = (data, length) => {		
	for (let i = 0; i < length; i += 4) {
		let red = data[i], green = data[i + 1], blue = data[i + 2];
		data[i] = 255 - red;
		data[i + 1] = 255 - green;
		data[i + 2] = 255 - blue;
	}
}

const drawNoise = (data, length) => {
	// iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
	for (let i = 0; i < length; i += 4) {
		// randomly change every 20th pixel to red
		if (Math.random() < .05) {
			data[i] = data[i + 1] = data[i + 2] = 0;
			data[i + 2] = 255;
		}
	}
}

const getLinearGradient = (ctx,startX,startY,endX,endY,colorStops) => {
	let lg = ctx.createLinearGradient(startX,startY,endX,endY);
	for(let stop of colorStops) lg.addColorStop(stop.percent,stop.color);
  	return lg;
};

const drawTable = arr => {
	table.innerHTML = "";
	let trs = [document.createElement("tr")];
	for (let i = 0; i < barCount; i++) {
		if (i % 10 == 0) {
			trs.push(document.createElement("tr"));
			trs[trs.length - 1].innerHTML = `<td><b>${i} - ${i + 9}</b></td>`;
		}
		let td = document.createElement("td");
		td.innerHTML = 128 - arr[i];
		td.style.color = `hsl(${Math.pow(arr[i], 2)}, 100%, 50%)`;
		td.style.border = "1px solid black";
		trs[trs.length - 1].appendChild(td);
	}
	trs.forEach(tr => table.appendChild(tr));
}