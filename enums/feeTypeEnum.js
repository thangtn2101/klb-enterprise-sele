function generatePath(key) {    
    return `//mat-option[normalize-space()='${key}']`;
}

module.exports = {
    COBO: generatePath("Thu hộ"),
    POBO: generatePath("Chi hộ nội bộ"),
    EXTER_POBO: generatePath("Chi hộ liên ngân hàng"),
};