function generatePath(key) {    
    return `//span[normalize-space()='${key}']`;
}

module.exports = {
    CMND: generatePath("CMND"),
    CCCD: generatePath("CCCD"),
    HO_CHIEU: generatePath("Hộ chiếu"),
};