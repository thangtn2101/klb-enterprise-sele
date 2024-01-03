function generatePath(key) {
    return `//mat-radio-button//span[text()='${key}']`;
}

module.exports = {
    MALE: generatePath("Nam"),
    FEMALE: generatePath("Nữ")
};