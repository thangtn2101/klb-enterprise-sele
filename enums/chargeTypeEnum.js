function generatePath(key) {    
    return `//span[normalize-space()='${key}']`;
}

module.exports = {
    MONTHLY: generatePath("Thu theo tháng"),
    IMMEDIATELY: generatePath("Thu ngay")
};