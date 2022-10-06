import LogService from "../shared/log-service.js";
import { playNote } from "./keys.js";
import { updateScreen } from "./screen.js";

const pressedNote = {};

function handleInput(input) {
    const [command, note, velocity] = input.data;

    switch (command) {
        case 146:
            noteOn(note, velocity > 0 ? velocity : pressedNote);
            break;
        case 130:
            noteOff(note);
            break;
    }
}

function noteOn(note, velocity) {
    const frequency = convertMidiToFrequency(note);
    pressedNote[note.toString()] = playNote(frequency, velocity);
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
    updateScreen("midiAccess", "MIDI Access: available");
}

export async function setMidiAccess() {
    try {
        if (!navigator.requestMIDIAccess) throw new Error();
        const access = await navigator.requestMIDIAccess();
        handleSuccess(access);
    } catch (error) {
        LogService.error("MIDI Access unavailable");
        updateScreen("midiAccess", "MIDI Access: unavailable");
    }
}
