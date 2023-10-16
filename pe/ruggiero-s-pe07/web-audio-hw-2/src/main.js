/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as audio from './audio.js';
import * as canvas from './canvas.js';
import * as visualizer from './visualizer.js';

const drawParams = {
    showGradient: true,
    showBars: true,
    showCircles: true,
    showNoise: true,
    volume: 50
}

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/MYSTERY AUDIO.mp3"
});

export const init = e => {
    audio.setupWebaudio(DEFAULTS.sound1);
	console.log("init called");
	console.log(`Testing canvas.getRandomColor() import: ${canvas.getRandomColor()}`);
    let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
    
    setupUI(canvasElement);
    visualizer.setupCanvas(canvasElement,audio.analyserNode);
    loop();
}

const setupUI = canvasElement => {
    // A - hookup fullscreen button
    const fsButton = document.querySelector("#fsButton");
	
    // add .onclick event to button
    fsButton.onclick = e => {
        console.log("goFullscreen() called");
        canvas.goFullscreen(canvasElement);
    };
    
    // B - hookup play button
    const playButton = document.querySelector("#playButton");

    // add .onclick event to button
    playButton.onclick = e => {
        console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        // check if context is in suspended state (autoplay policy)
        if (audio.audioCtx.state == "suspended") audio.audioCtx.resume();

        console.log(`audioCtx.state after = ${audio.audioCtx.state}`);

        if (e.target.dataset.playing == "no") {
            // if track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes"; // our CSS will set the text to "Pause"
            // if track IS playing, pause it
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no"; // our CSS will set the text to "Play"
        }
    }

    // C - hookup volume slider & label
    let volumeSlider = document.querySelector("#volumeSlider");
    let volumeLabel = document.querySelector("#volumeLabel");

    // add .oninput event to slider
    volumeSlider.oninput = e => {
        // set the gain
        audio.setVolume(e.target.value);
        drawParams.volume = e.target.value / 2 * 100;
        // update value of label to match value of slider
        volumeLabel.innerHTML = `${Math.round((e.target.value/2 * 100))}%`;
    };

    // set value of label to match initial value of slider
    volumeSlider.dispatchEvent(new Event("input"));

    // D - hookup track <select>
    let trackSelect = document.querySelector("#trackSelect");
    // add .onchange event to <select>
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        // pause the current track if it is playing
        if (playButton.dataset.playing = "yes") playButton.dispatchEvent(new MouseEvent("click"));
    };

    // E - hookup checkboxes
    let gradientCB = document.querySelector("#gradientCB");
    gradientCB.checked = drawParams.showGradient;
    gradientCB.onchange = e => drawParams.showGradient = e.target.checked;

    let barsCB = document.querySelector("#barsCB");
    barsCB.checked = drawParams.showBars;
    barsCB.onchange = e => drawParams.showBars = e.target.checked;

    let circlesCB = document.querySelector("#circlesCB");
    circlesCB.checked = drawParams.showCircles;
    circlesCB.onchange = e => drawParams.showCircles = e.target.checked;

    let noiseCB = document.querySelector("#noiseCB");
    noiseCB.checked = drawParams.showNoise;
    noiseCB.onchange = e => drawParams.showNoise = e.target.checked;
}

const loop = e => {
    requestAnimationFrame(loop);
    visualizer.draw(drawParams);
}