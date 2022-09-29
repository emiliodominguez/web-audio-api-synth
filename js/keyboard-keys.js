import { keyboardKeys, filterAmountControl, filterInfo, filterType } from "./constants/html-elements.js";
import { audioContext, masterVolume, mainOscillator, filter } from "./constants/audio.js";
import { notes } from "./constants/notes.js";

// #region Global mouse handler
let mouseDown = false;

window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));
filterAmountControl.addEventListener("change", () => filterInfo.textContent = `${filterAmountControl.value}hz`);
filterType.addEventListener("change", () => console.log(filterType.value.toLowerCase()) )
//#endregion

/**
 * Plays a note
 * @param {number} frequency The note frequency
 * @returns {OscillatorNode} The note oscillator
 */
export function playNote(frequency, velocity = 127) {
    const noteOscillator = audioContext.createOscillator();

    const velocityGainAmount = (1 / 127) * velocity;

    noteOscillator.type = mainOscillator.type;
    noteOscillator.frequency.value = frequency;
    
    const velocityGain = audioContext.createGain();
    velocityGain.gain.value = velocityGainAmount;

    noteOscillator.connect(velocityGain);
    velocityGain.connect(filter);
    filter.frequency.value = filterAmountControl.value;
    filter.type = filterType.value.toLowerCase();
    
    filter.connect(masterVolume);
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
export function setKeyboardKeys() {
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
