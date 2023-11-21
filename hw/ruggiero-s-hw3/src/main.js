import * as audio from      './audio.js';
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

export const init = e => {

    // json data
    const xhr = new XMLHttpRequest();
    xhr.onload = e => onLoad(JSON.parse(e.target.response));
    xhr.onerror = e => console.log(e.target.status);
    xhr.open("GET", "./data/av-data.json");
    xhr.send();
}

const onLoad = (json) => {
    document.querySelector("title").innerHTML = json.title;
    document.querySelector("#header").innerHTML = json.title;
    document.querySelector("#description").innerHTML = json.description;
    let trackSelect = document.querySelector("#select-track");
    for (let i = 0; i < json.tracks.length; i++) {
        let element = document.createElement("option");
        element.value = `media/${json.tracks[i]}.mp3`;
        element.innerHTML = json.tracks[i];
        trackSelect.appendChild(element);
    }

    audio.setupWebaudio(`media/${json.tracks[0]}.mp3`);
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
        goFullscreen(canvasElement);
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

const goFullscreen = element => {
    if      (element.requestFullscreen)         element.requestFullscreen();
    else if (element.mozRequestFullscreen)      element.mozRequestFullscreen();
    else if (element.webkitRequestFullscreen)   element.webkitRequestFullscreen();   
};