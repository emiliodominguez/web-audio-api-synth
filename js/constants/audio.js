// Context
const audioContext = new AudioContext();

// Volume
const masterVolume = audioContext.createGain();
masterVolume.gain.value = 0.1;
masterVolume.connect(audioContext.destination);

// Oscillator
const mainOscillator = audioContext.createOscillator();
mainOscillator.frequency.setValueAtTime(220, 0);
mainOscillator.connect(masterVolume);

export { audioContext, masterVolume, mainOscillator };
