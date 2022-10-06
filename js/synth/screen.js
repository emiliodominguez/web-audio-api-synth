const screenData = document.querySelector("#screen-data");
const screenDataItems = Object.freeze({
    volume: { value: "-", id: "screen-volume" },
    midiAccess: { value: "-", id: "screen-midi-access" },
});

/**
 * Updates screen data items on any change
 * @param {keyof typeof screenDataItems} id The item ID
 * @param {string | number} value The updated value
 */
export function updateScreen(id, value) {
    const item = screenDataItems[id];

    if (!item) return;

    let htmlElement = screenData.querySelector(`#${item.id}`);

    if (!htmlElement) {
        htmlElement = document.createElement("li");
        htmlElement.id = item.id;
        screenData.append(htmlElement);
    }

    htmlElement.textContent = value;
}
