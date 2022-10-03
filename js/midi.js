import LogService from "./shared/log-service.js";
import { playNote } from "./synth-keys.js";

const pressedNote = {};

function handleInput(input) {
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    switch (command) {
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

function noteOn(note, velocity) {
    const freq = convertMidiToFrequency(note);
    pressedNote[note.toString()] = playNote(freq, velocity);
}

function noteOff(note) {
    pressedNote[note].stop();
}

function convertMidiToFrequency(note) {
    const a = 440;
    return (a / 32) * 2 ** ((note - 9) / 12);
}

function handleSuccess(midiAccess) {
    const inputs = midiAccess.inputs;

    midiAccess.addEventListener("statechange", (e) => {
        LogService.info(`Name: ${e.port.name}`);
        LogService.info(`Brand: ${e.port.manufacturer}`);
        LogService.info(`State: ${e.port.state}`);
        LogService.info(`Type: ${e.port.type}`);
    });

    inputs.forEach((input) => {
        input.addEventListener("midimessage", handleInput);
    });

    LogService.success("MIDI Access available");
}

export async function setMidiAccess() {
    if (!navigator.requestMIDIAccess) return;

    try {
        const access = await navigator.requestMIDIAccess();
        handleSuccess(access);
    } catch (error) {
        LogService.info("No MIDI Access");
    }
}
