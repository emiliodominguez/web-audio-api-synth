import { volumeControl, waveFormsWrapper } from "./constants/html-elements.js";
import { masterVolume, mainOscillator } from "./constants/audio.js";
import { waveForms } from "./constants/wave-forms.js";

/**
 * Sets the volume input
 */
function setVolumeControl() {
    volumeControl.value = masterVolume.gain.value;

    volumeControl.addEventListener("input", (e) => {
        masterVolume.gain.value = e.currentTarget.value;
    });
}

/**
 * Sets the wave forms options
 */
function setWaveFormsControl() {
    for (const wave of waveForms) {
        const label = document.createElement("label");
        const input = document.createElement("input");

        label.textContent = wave.name;
        label.htmlFor = wave.value;

        input.id = wave.value;
        input.name = "wave-form";
        input.type = "radio";
        input.value = wave.value;
        input.checked = mainOscillator.type === wave.value;

        input.addEventListener("input", (e) => {
            mainOscillator.type = e.currentTarget.value;
        });

        label.append(input);
        waveFormsWrapper.append(label);
    }
}

/**
 * Initializes the keyboard setup
 */
export function setKeyboardControls() {
    setVolumeControl();
    setWaveFormsControl();
}
