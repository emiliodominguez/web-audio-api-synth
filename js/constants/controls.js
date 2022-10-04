/**
 * @typedef Range
 * @property {number} min The minimum value
 * @property {number} max The maximum value
 * @property {number} step The range step value
 *
 * @typedef RadioOption
 * @property {string} label The option label
 * @property {string} value The option value
 *
 * @typedef Control
 * @property {"range" | "radio"} type The control type
 * @property {"bar" | "knob" | "radio"} class The control class
 * @property {string} label The control label
 * @property {string} id The control ID
 *
 * @typedef {Control & Range} RangeControl
 * @property {boolean} showInfo Whether if the control should show info or not
 *
 * @typedef {Control} RadioControl
 * @property {RadioOption[]} options The control options
 *
 * @typedef ControlGroup
 * @property {string} name The group name
 * @property {(RangeControl | RadioControl)[]} controls The group controls
 */

/**
 * @type {ControlGroup[]} The synth controls
 */
export const controlsGroups = Object.freeze([
    {
        name: "Volume",
        controls: [{ type: "range", class: "bar", label: "Volume", id: "volume", min: 0, max: 1, step: 0.01 }],
    },
    {
        name: "Wave forms",
        controls: [
            {
                type: "radio",
                class: "radio",
                label: "Wave forms",
                id: "wave-form",
                options: [
                    { label: "Sine wave", value: "sine" },
                    { label: "Square wave", value: "square" },
                    { label: "Triangle wave", value: "triangle" },
                    { label: "Sawtooth wave", value: "sawtooth" },
                ],
            },
        ],
    },
    {
        name: "Filter types",
        controls: [
            {
                type: "radio",
                class: "radio",
                label: "Filter types",
                id: "filter",
                options: [
                    { label: "LowPass", value: "lowpass" },
                    { label: "BandPass", value: "bandpass" },
                    { label: "HighPass", value: "highpass" },
                    { label: "LowShelf", value: "lowshelf" },
                    { label: "HighShelf", value: "highshelf" },
                    { label: "Peaking", value: "peaking" },
                    { label: "Notch", value: "notch" },
                ],
            },
        ],
    },
    {
        name: "Filter attributes",
        controls: [
            { type: "range", class: "knob", label: "Filter amount", id: "filter-amount", min: 50, max: 16000, step: 1 },
            { type: "range", class: "knob", label: "Resonance", id: "filter-q", min: 0.1, max: 30, step: 0.01 },
            { type: "range", class: "knob", label: "Filter Gain", id: "filter-gain", min: -40, max: 40, step: 0.01 },
        ],
    },
    {
        name: "Envelope",
        controls: [
            { type: "range", class: "knob", label: "Attack time", id: "attack-time", min: 0, max: 0.5, step: 0.01 },
            { type: "range", class: "knob", label: "Release time", id: "release-time", min: 0, max: 0.5, step: 0.01 },
            { type: "range", class: "knob", label: "Note length", id: "note-length", min: 0.2, max: 2, step: 0.01 },
        ],
    },
    {
        name: "Vibrato",
        controls: [
            { type: "range", class: "knob", label: "Vibrato amount", id: "vibrato-amount", min: 0, max: 5, step: 0.1 },
            { type: "range", class: "knob", label: "Vibrato speed", id: "vibrato-speed", min: 0, max: 30, step: 0.1 },
        ],
    },
    {
        name: "Delay",
        controls: [
            { type: "range", class: "knob", label: "Delay amount", id: "delay-amount", min: 0, max: 1, step: 0.01 },
            { type: "range", class: "knob", label: "Delay time", id: "delay-time", min: 0, max: 1, step: 0.01 },
            { type: "range", class: "knob", label: "Feedback", id: "feedback", min: 0, max: 1, step: 0.01 },
        ],
    },
]);
