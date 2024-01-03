function generatePath(key) {    
    return `//mat-option[normalize-space()='${key}']`;
}

module.exports = {
    VIETNAM: generatePath("VIỆT NAM"),
};