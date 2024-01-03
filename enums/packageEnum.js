function generatePath(key) {    
    return `//mat-option[contains(span/div/text(), '${key}')]`;
}

module.exports = {
    SIMPLE: generatePath("Gói Simple"),
    SILVER: generatePath("Gói KLB-SILVER"),
    GOLD: generatePath("Gói KLB-GOLD"),
    PLATINUM: generatePath("Gói KLB-PLATINUM"),
    VIP: generatePath("Gói KLB-VIP")
};