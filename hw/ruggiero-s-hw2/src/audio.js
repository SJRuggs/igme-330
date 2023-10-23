export let audioCtx, analyserNode;
let element, sourceNode, gainNode;

const DEFAULTS = Object.freeze({
    gain        :   .5,
    numSamples  :   256
});

let audioData = new Uint8Array(DEFAULTS.numSamples / 2);
let highshelfFilter, lowShelfFilter, distortionFilter;

export const setupWebaudio = path => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    element = new Audio();
    loadSoundFile(path);

    // source node
    sourceNode = audioCtx.createMediaElementSource(element);

    // highshelf filter
    highshelfFilter = audioCtx.createBiquadFilter();
    highshelfFilter.type = "highshelf";
    highshelfFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);

    // lowshelf filter
    lowShelfFilter = audioCtx.createBiquadFilter();
    lowShelfFilter.type = "lowshelf";
    lowShelfFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);

    // distortion filter
    distortionFilter = audioCtx.createWaveShaper();

    // analyser node
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = DEFAULTS.numSamples;

    // gain node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    // connect the nodes together
    sourceNode.connect(         highshelfFilter);
    highshelfFilter.connect(    lowShelfFilter);
    lowShelfFilter.connect(     distortionFilter);
    distortionFilter.connect(   analyserNode);
    analyserNode.connect(       gainNode);
    gainNode.connect(           audioCtx.destination);
}

export const loadSoundFile = path =>    element.src = path;
export const playCurrentSound = e =>    element.play();
export const pauseCurrentSound = e =>   element.pause();
export const setVolume = val =>         gainNode.gain.value = Number(val);

export const toggleHighShelf = bool => {
    if (bool) highshelfFilter.gain.setValueAtTime(25, audioCtx.currentTime);
    else      highshelfFilter.gain.setValueAtTime(0,  audioCtx.currentTime);
}

export const toggleLowShelf = bool => {
    if (bool) lowShelfFilter.gain.setValueAtTime(25, audioCtx.currentTime);
    else      lowShelfFilter.gain.setValueAtTime(0,  audioCtx.currentTime);
}

export const toggleDistortion = (bool, amt) => {
    if (bool) distortionFilter.curve = makeDistortionCurve(amt);
    else      distortionFilter.curve = null;
}

const makeDistortionCurve = (amount = 20) => {
    let n_samples = 256, curve = new Float32Array(n_samples);
    for (let i = 0; i < n_samples; ++i) {
        let x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
    }
    return curve;
}