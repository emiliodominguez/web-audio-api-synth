import { keyboardKeys } from "./constants/html-elements.js";
import { audioContext, masterVolume, mainOscillator } from "./constants/audio.js";
import { notes } from "./constants/notes.js";

// #region Global mouse handler
let mouseDown = false;

window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));
//#endregion

/**
 * Plays a note
 * @param {number} frequency The note frequency
 * @returns {OscillatorNode} The note oscillator
 */
function playNote(frequency) {
    const noteOscillator = audioContext.createOscillator();

    noteOscillator.type = mainOscillator.type;
    noteOscillator.frequency.value = frequency;
    noteOscillator.connect(masterVolume);
    noteOscillator.start();

    return noteOscillator;
}

/**
 * Handles the keyboard note press
 * @param {MouseEvent} e The event
 * @returns {OscillatorNode} The note oscillator
 */
function handleKeyPress(e) {
    return playNote(+e.currentTarget.dataset.frequency);
}

/**
 * Handles the keyboard note press
 * @param {MouseEvent} e The event
 * @param {OscillatorNode} note The note oscillator
 */
function handleKeyRelease(_e, note) {
    note?.stop();
}

/**
 * Sets the keyboard keys
 */
export function setKeyboardKeys() {
    for (const octave of notes) {
        for (const [note, frequency] of Object.entries(octave)) {
            const key = document.createElement("button");
            let pressedNote;

            key.dataset.note = note;
            key.dataset.frequency = frequency;
            key.textContent = note;

            key.addEventListener("mousedown", (e) => {
                pressedNote = handleKeyPress(e);
            });

            key.addEventListener("mouseenter", (e) => {
                if (!mouseDown) return;
                pressedNote = handleKeyPress(e);
            });

            key.addEventListener("mouseup", (e) => handleKeyRelease(e, pressedNote));
            key.addEventListener("mouseleave", (e) => handleKeyRelease(e, pressedNote));

            keyboardKeys.append(key);
        }
    }
}
