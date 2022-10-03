import { masterVolume, mainOscillator, biQuadFilter } from "./constants/audio.js";
import { keyboardControls } from "./constants/html-elements.js";

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
 * Sets the vibrato controls
 */
function setVibratoControls() {
    const vibratoAmountControl = keyboardControls.querySelector("#vibrato-amount");
    const vibratoSpeedControl = keyboardControls.querySelector("#vibrato-speed");
    const delayControl = keyboardControls.querySelector("#delay");
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
    filterAmount.addEventListener("input", (e) => {
        biQuadFilter.frequency.value = e.currentTarget.value;
        filterInfo.textContent = `${e.currentTarget.value}hz`;
    });

    // Filter Q
    filterQ.addEventListener("input", (e) => {
        biQuadFilter.Q.value = e.currentTarget.value;
    });

    // Filter gain
    filterGain.addEventListener("input", (e) => {
        biQuadFilter.gain.value = e.currentTarget.value;
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
 * Initializes the keyboard setup
 */
export function setSynthControls() {
    setVolumeControl();
    setVibratoControls();
    setFilterControls();
    setWaveFormsControl();
}
