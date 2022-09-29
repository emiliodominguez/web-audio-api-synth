import { setKeyboardControls } from "./keyboard-controls.js";
import { setKeyboardKeys, playNote } from "./keyboard-keys.js";

setKeyboardControls();
setKeyboardKeys();

const pressedNote = {};

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
}

function success(midiAccess) {
    midiAccess.addEventListener('statechange', updateDevices)

    const inputs = midiAccess.inputs;

    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleInput)
    })
}

function midi2Freq(note) {
    const a = 440;
    return (a / 32) * (2 ** ((note - 9) / 12));
}

function handleInput (input) {
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];
    
    switch(command) {
        case 146:
            if (velocity > 0) {
                noteOn(note, velocity);
            } else {
                noteOff(note, pressedNote);
            }
        break;
        case 130:
            noteOff(note);
            break;
    }
}

function noteOn (note, velocity) {
    let freq = midi2Freq(note);
    pressedNote[note.toString()] = playNote(freq, velocity);

}

function noteOff(note) {
    pressedNote[note].stop();
}

function updateDevices(event) {
    console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State: ${event.port.state}, Type: ${event.port.type}`);
}

function failure() {
    console.log('No MIDI Access');
}
