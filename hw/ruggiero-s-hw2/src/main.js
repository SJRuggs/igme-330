/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as audio from './audio.js';
import * as visualizer from './visualizer.js';

const drawParams = {
    bars:             true,
    circles:          true,
    distortion:       false,
    distortionAmount: 20,
    emboss:           false,
    gradient:         true,
    highshelf:        false,
    invert:           false,
    lowshelf:         false,
    noise:            false,
    visualize:        true,
    volume:           50
}

let table;

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/MYSTERY AUDIO.mp3"
});

export const init = e => {
    audio.setupWebaudio(DEFAULTS.sound1);
    let canvasElement = document.querySelector("canvas");
    
    setupUI(canvasElement);
    visualizer.setupCanvas(canvasElement,audio.analyserNode);
    loop();
}

const setupUI = canvasElement => {
    // fullscreen button
    const buttonFs = document.querySelector("#btn-fs");
    buttonFs.onclick = e => {
        console.log("goFullscreen() called");
        canvas.goFullscreen(canvasElement);
    };
    
    // play button
    const playButton = document.querySelector("#btn-play");
    playButton.onclick = e => {
        if (audio.audioCtx.state == "suspended") audio.audioCtx.resume();
        if (e.target.dataset.playing == "no") {
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
        } else {
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
        }
    }

    // volume slider
    let volumeSlider = document.querySelector("#slider-volume");
    let volumeLabel = document.querySelector("#label-volume");
    volumeSlider.oninput = e => {
        audio.setVolume(e.target.value);
        drawParams.volume = e.target.value / 2 * 100;
        volumeLabel.innerHTML = `${Math.round((e.target.value/2 * 100))}%`;
    };
    volumeSlider.dispatchEvent(new Event("input"));

    // track select
    let trackSelect = document.querySelector("#select-track");
    trackSelect.onchange = e => {
        audio.loadSoundFile(e.target.value);
        if (playButton.dataset.playing = "yes") playButton.dispatchEvent(new MouseEvent("click"));
    };

    // checkboxes
    Object.getOwnPropertyNames(drawParams).forEach(param => {
        let cb = document.querySelector(`#cb-${param}`);
        if (cb) {
            cb.checked = drawParams[param];
            cb.onchange = e => {
                drawParams[param] = e.target.checked;
                if      (param == "highshelf")  audio.toggleHighShelf(e.target.checked);
                else if (param == "lowshelf")   audio.toggleLowShelf(e.target.checked);
                else if (param == "distortion") audio.toggleDistortion(e.target.checked, drawParams.distortionAmount);
            }
        }
    });

    // start shelves and distortion
    audio.toggleHighShelf(drawParams.highshelf);
    audio.toggleLowShelf(drawParams.lowshelf);
    audio.toggleDistortion(drawParams.distortion, drawParams.distortionAmount);
}

const loop = e => {
    setTimeout(loop, 1000 / 60);
    visualizer.draw(drawParams);
}