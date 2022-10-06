import { masterVolume, mainOscillator, biQuadFilter, envelope, vibrato, delay, delayAmountGain, feedback } from "../constants/audio.js";
import { keyboardControls } from "../constants/html-elements.js";
import { controlsGroups } from "../constants/controls.js";
import { updateScreen } from "./screen.js";

/**
 * Sets the control based on its type
 * @param {RangeControl | RadioControl} control The control
 * @returns {HTMLDivElement | HTMLDivElement[]} The control element(s)
 */
function setControl(control) {
    switch (control.type) {
        case "knob":
        case "range":
            const controlDiv = document.createElement("div");
            controlDiv.classList.add("control");

            if (control.class) controlDiv.classList.add(control.class);

            const controlLabel = document.createElement("label");
            controlLabel.htmlFor = control.id;
            controlLabel.textContent = control.label;

            const controlInput = document.createElement("input");
            controlInput.type = control.type === "knob" ? "number" : "range";
            controlInput.id = control.id;
            controlInput.min = control.min;
            controlInput.max = control.max;
            controlInput.step = control.step;

            controlDiv.append(controlLabel, controlInput);

            return controlDiv;
        case "radio":
            const controls = [];

            for (const option of control.options) {
                const optionDiv = document.createElement("div");
                optionDiv.classList.add("control");

                if (control.class) optionDiv.classList.add(control.class);

                const optionLabel = document.createElement("label");
                optionLabel.htmlFor = option.value;
                optionLabel.textContent = option.label;

                const optionInput = document.createElement("input");
                optionInput.type = "radio";
                optionInput.id = option.value;
                optionInput.name = control.id;
                optionInput.value = option.value;

                optionDiv.append(optionLabel, optionInput);

                controls.push(optionDiv);
            }

            return controls;
    }
}

/**
 * Sets the knobs controls
 */
function setKnobs() {
    const allKnobs = document.querySelectorAll(".knob");

    for (const knob of allKnobs) {
    }
}

/**
 * Sets the controls HTML elements
 */
function setControlsElements() {
    Object.values(controlsGroups).forEach(({ name, controls }) => {
        const controlNameComment = document.createComment(name);
        const controlGroupDiv = document.createElement("div");
        controlGroupDiv.classList.add("controls-group");

        for (const control of controls) {
            const controlElements = setControl(control);

            if (controlElements instanceof HTMLDivElement) {
                controlGroupDiv.append(controlElements);
            } else {
                for (const element of controlElements) {
                    controlGroupDiv.append(element);
                }
            }
        }

        keyboardControls.append(controlNameComment, controlGroupDiv);
    });
}

/**
 * Sets the volume control
 */
function setVolumeControl() {
    const volumeControl = keyboardControls.querySelector("#volume");

    volumeControl.value = +masterVolume.gain.value.toFixed(2);
    updateScreen("volume", `Volume: ${parseInt(+masterVolume.gain.value.toFixed(2) * 100)}%`);

    volumeControl.addEventListener("input", (e) => {
        masterVolume.gain.value = e.currentTarget.value;
        updateScreen("volume", `Volume: ${parseInt(e.currentTarget.value * 100)}%`);
    });
}

/**
 * Sets the filters controls
 */
function setFilterControls() {
    const filtersInputs = keyboardControls.querySelectorAll("[name='filter']");
    const filterAmount = keyboardControls.querySelector("#filter-amount");
    const filterQ = keyboardControls.querySelector("#filter-q");
    const filterGain = keyboardControls.querySelector("#filter-gain");

    // Filters
    for (const input of filtersInputs) {
        input.checked = biQuadFilter.type === input.value;

        input.addEventListener("input", (e) => {
            biQuadFilter.type = e.currentTarget.value;
        });
    }

    // Filter amount
    biQuadFilter.frequency.value = +filterAmount.max;
    filterAmount.value = +biQuadFilter.frequency.value.toFixed(2);

    filterAmount.addEventListener("input", (e) => {
        biQuadFilter.frequency.value = +e.currentTarget.value;
    });

    // Filter Q
    biQuadFilter.Q.value = +filterQ.min;
    filterQ.value = +biQuadFilter.Q.value.toFixed(2);

    filterQ.addEventListener("input", (e) => {
        biQuadFilter.Q.value = +e.currentTarget.value;
    });

    // Filter gain
    biQuadFilter.gain.value = 0;
    filterGain.value = +biQuadFilter.gain.value.toFixed(2);

    filterGain.addEventListener("input", (e) => {
        biQuadFilter.gain.value = +e.currentTarget.value;
    });
}

/**
 * Sets the wave forms control
 */
function setWaveFormsControl() {
    const waveFormInputs = keyboardControls.querySelectorAll("[name='wave-form']");

    for (const input of waveFormInputs) {
        input.checked = mainOscillator.type === input.value;

        input.addEventListener("input", (e) => {
            mainOscillator.type = e.currentTarget.value;
        });
    }
}

/**
 * Sets the envelope controls
 */
function setEnvelopeControls() {
    const attackTimeControl = document.querySelector("#attack-time");
    const releaseTimeControl = document.querySelector("#release-time");
    const noteLengthControl = document.querySelector("#note-length");

    // Attack time
    attackTimeControl.value = envelope.attackTime;

    attackTimeControl.addEventListener("input", (e) => {
        envelope.attackTime = +e.currentTarget.value;
    });

    // Release time
    releaseTimeControl.value = envelope.releaseTime;

    releaseTimeControl.addEventListener("input", (e) => {
        envelope.releaseTime = +e.currentTarget.value;
    });

    // Note length
    noteLengthControl.value = envelope.noteLength;

    noteLengthControl.addEventListener("input", (e) => {
        envelope.noteLength = +e.currentTarget.value;
    });
}

/**
 * Sets the vibrato controls
 */
function setVibratoControls() {
    const vibratoAmountControl = keyboardControls.querySelector("#vibrato-amount");
    const vibratoSpeedControl = keyboardControls.querySelector("#vibrato-speed");

    // Vibrato amount
    vibratoAmountControl.value = vibrato.amount;

    vibratoAmountControl.addEventListener("input", (e) => {
        vibrato.amount = +e.currentTarget.value;
    });

    // Vibrato speed
    vibratoSpeedControl.value = vibrato.speed;

    vibratoSpeedControl.addEventListener("input", (e) => {
        vibrato.speed = +e.currentTarget.value;
    });
}

/**
 * Sets the delay controls
 */
function setDelayControls() {
    const delayAmountControl = keyboardControls.querySelector("#delay-amount");
    const delayTimeControl = keyboardControls.querySelector("#delay-time");
    const feedbackControl = keyboardControls.querySelector("#feedback");

    // Delay amount
    delayAmountGain.value = 0;
    delayAmountControl.value = +delayAmountGain.value.toFixed(2);

    delayAmountControl.addEventListener("input", (e) => {
        delayAmountGain.value = +e.currentTarget.value;
    });

    // Delay time
    delay.delayTime.value = 0;
    delayTimeControl.value = +delay.delayTime.value.toFixed(2);

    delayTimeControl.addEventListener("input", (e) => {
        delay.delayTime.value = +e.currentTarget.value;
    });

    // Feedback
    feedback.gain.value = 0;
    feedbackControl.value = +feedback.gain.value.toFixed(2);

    feedbackControl.addEventListener("input", (e) => {
        feedback.gain.value = +e.currentTarget.value;
    });
}

/**
 * Initializes the keyboard setup
 */
export function setSynthControls() {
    setControlsElements();
    setKnobs();
    setVolumeControl();
    setFilterControls();
    setWaveFormsControl();
    setEnvelopeControls();
    setVibratoControls();
    setDelayControls();
}
