// Context
const audioContext = new AudioContext();

// Volume
const masterVolume = audioContext.createGain();
masterVolume.gain.value = 0.1;
masterVolume.connect(audioContext.destination);

// Oscillator
const mainOscillator = audioContext.createOscillator();
mainOscillator.frequency.setValueAtTime(220, 0);

// Filter
const biQuadFilter = audioContext.createBiquadFilter();

// Envelope
const envelope = Object.seal({
    attackTime: 0,
    sustainLevel: 0,
    releaseTime: 0,
    noteLength: 0,
});

// Vibrato
const vibrato = Object.seal({
    speed: 0,
    amount: 0,
});

// Delay
const delay = audioContext.createDelay();
const delayAmountGain = audioContext.createGain();
const feedback = audioContext.createGain();
delayAmountGain.connect(delay);
delay.connect(feedback);
feedback.connect(delay);
delay.connect(masterVolume);

export { audioContext, masterVolume, mainOscillator, biQuadFilter, envelope, vibrato, delay, delayAmountGain, feedback };
