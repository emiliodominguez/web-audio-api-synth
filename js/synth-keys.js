import { audioContext, masterVolume, mainOscillator, biQuadFilter } from "./constants/audio.js";
import { keyboardKeys } from "./constants/html-elements.js";
import { notes } from "./constants/notes.js";

// #region Global mouse handler
let mouseDown = false;

window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));
// #endregion

/**
 * Plays a note
 * @param {number} frequency The note frequency
 * @returns {OscillatorNode} The note oscillator
 */
export function playNote(frequency, velocity = 127) {
    const noteOscillator = audioContext.createOscillator();
    const velocityGain = audioContext.createGain();
    const velocityGainAmount = (1 / 127) * velocity;

    noteOscillator.type = mainOscillator.type;
    noteOscillator.frequency.value = frequency;
    velocityGain.gain.value = velocityGainAmount;

    // This is to create a reverb effect, but is only working on left channel.
    // const impulse = impulseResponse(1, 2);
    // const convolver = new ConvolverNode(audioContext, {buffer: impulse})

    noteOscillator.connect(velocityGain);
    velocityGain.connect(biQuadFilter);
    biQuadFilter.connect(masterVolume);
    noteOscillator.start();

    return noteOscillator;
}

/**
 * Handles the keyboard note press
 * @param {MouseEvent} e The event
 * @returns {OscillatorNode} The note oscillator
 */
function handleKeyPress(e) {
    e.currentTarget.classList.add("playing");
    return playNote(+e.currentTarget.dataset.frequency);
}

/**
 * Handles the keyboard note press
 * @param {MouseEvent} e The event
 * @param {OscillatorNode} note The note oscillator
 */
function handleKeyRelease(e, note) {
    e.currentTarget.classList.remove("playing");
    note[Object.keys(note)[0]]?.stop();
}

/**
 * Sets the keyboard keys
 */
export function setSynthKeys() {
    for (const octave of notes) {
        for (const [note, frequency] of Object.entries(octave)) {
            const key = document.createElement("button");
            let pressedNote = {};

            // key.textContent = note;
            key.dataset.note = note;
            key.dataset.frequency = frequency;
            key.classList.add("key");

            if (note.includes("#")) key.classList.add("sharp");

            key.addEventListener("mousedown", (e) => {
                pressedNote[note] = handleKeyPress(e);
            });

            key.addEventListener("mouseenter", (e) => {
                if (!mouseDown) return;
                pressedNote[note] = handleKeyPress(e);
            });

            key.addEventListener("mouseup", (e) => handleKeyRelease(e, pressedNote));
            key.addEventListener("mouseleave", (e) => handleKeyRelease(e, pressedNote));

            keyboardKeys.append(key);
        }
    }
}

// function impulseResponse(duration, decay) {
//     const length = audioContext.sampleRate * duration;
//     const impulse = audioContext.createBuffer(2, length, audioContext.sampleRate);
//     const myImpulse = impulse.getChannelData(0);

//     for (let i = 0; i < length; i++) {
//         myImpulse[i] = (2 * Math.random() - 1) * Math.pow(1 - i / length, decay);
//     }

//     return impulse;
// }
