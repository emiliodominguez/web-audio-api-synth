import { masterVolume, mainOscillator, biQuadFilter, envelope, vibrato, delay, delayAmountGain, feedback } from "../constants/audio.js";
import { keyboardControls } from "../constants/html-elements.js";

/**
 * Sets the volume control
 */
function setVolumeControl() {
    const volumeControl = keyboardControls.querySelector("#volume");

    volumeControl.value = masterVolume.gain.value;

    volumeControl.addEventListener("input", (e) => {
        masterVolume.gain.value = e.currentTarget.value;
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
    const filterInfo = keyboardControls.querySelector("#filter-info");

    // Filters
    for (const input of filtersInputs) {
        input.checked = biQuadFilter.type === input.value;

        input.addEventListener("input", (e) => {
            biQuadFilter.type = e.currentTarget.value;
        });
    }

    // Filter amount
    biQuadFilter.frequency.value = +filterAmount.max;
    filterAmount.value = biQuadFilter.frequency.value;
    filterInfo.textContent = `${biQuadFilter.frequency.value}hz`;

    filterAmount.addEventListener("input", (e) => {
        biQuadFilter.frequency.value = +e.currentTarget.value;
        filterInfo.textContent = `${e.currentTarget.value}hz`;
    });

    // Filter Q
    biQuadFilter.Q.value = +filterQ.min;
    filterQ.value = biQuadFilter.Q.value;

    filterQ.addEventListener("input", (e) => {
        biQuadFilter.Q.value = +e.currentTarget.value;
    });

    // Filter gain
    biQuadFilter.gain.value = 0;
    filterGain.value = biQuadFilter.gain.value;

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
    delayAmountControl.value = delayAmountGain.value;

    delayAmountControl.addEventListener("input", (e) => {
        delayAmountGain.value = +e.currentTarget.value;
    });

    // Delay time
    delay.delayTime.value = 0;
    delayTimeControl.value = delay.delayTime.value;

    delayTimeControl.addEventListener("input", (e) => {
        delay.delayTime.value = +e.currentTarget.value;
    });

    // Feedback
    feedback.gain.value = 0;
    feedbackControl.value = feedback.gain.value;

    feedbackControl.addEventListener("input", (e) => {
        feedback.gain.value = +e.currentTarget.value;
    });
}

/**
 * Initializes the keyboard setup
 */
export function setSynthControls() {
    setVolumeControl();
    setFilterControls();
    setWaveFormsControl();
    setEnvelopeControls();
    setVibratoControls();
    setDelayControls();
}
