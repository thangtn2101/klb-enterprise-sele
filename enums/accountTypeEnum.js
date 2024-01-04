function generatePath(value) {
    return `//span[normalize-space()='${value}']`;
  }
  
  module.exports = {
    PAYMENT_ACCOUNT: generatePath('TK chuyên chi'),
    REVENUE_ACCOUNT: generatePath('TK chuyên thu'),
    FEE_PAYMENT_ACCOUNT: generatePath('TK thu phí')
  }