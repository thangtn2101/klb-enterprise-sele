const { By, Key, until } = require("selenium-webdriver");
const assert = require("assert");


class IntegrationPage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigate() {
    await this.driver.get(config.host + '#/quan-ly-doi-tac/quan-ly-merchant');
}

  async login(username, password, adminName) {
    var usernameInput = await this.driver.wait(until.elementLocated(By.id('username')), 10000);
    await usernameInput.sendKeys(username);

    await this.driver.findElement(By.id('password')).sendKeys(password, Key.RETURN);

    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add assertions to verify successful login
    var h4Element = await this.driver.wait(until.elementLocated(By.xpath("//div[@class='info']/h4")), 10000);


    const adminNameElement = await h4Element.getText();

    assert.equal(adminNameElement, adminName);

  }
}


module.exports = IntegrationPage;