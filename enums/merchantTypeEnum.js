function generatePath(key) {    
    return `//mat-option[normalize-space()='${key}']`;
}

module.exports = {
    PERSONAL: generatePath("Cá nhân"),
    BUSINESS: generatePath("Công ty"),
};