const { By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const BasePage = require("../base/basePage");


class LoginPage extends BasePage {

  async navigate(theURL) {
    await this.go_to_url(theURL);
  }


  // Login for another pages 
  async login(usernameValue, passwordValue, adminName) {
    //Enter user name 
    await this.enterTextById('username', usernameValue);

    //Enter password
    await this.enterTextById('password', passwordValue);

    //Click submit button 
    await this.clickByXpath("//button[@type='submit']") 

    await new Promise(resolve => setTimeout(resolve, 3000));

    // Add assertions to verify successful login
    var h4Element = await driver.wait(until.elementLocated(By.xpath("//div[@class='info']/h4")), 10000);

    const adminNameElement = await h4Element.getText();

    assert.equal(adminNameElement, adminName);

  }

  // Login to run test case 
  async loginForTest(username, password, adminName) {
    var usernameInput = await this.driver.wait(until.elementLocated(By.id('username')), 10000);
    await usernameInput.sendKeys(username);

    await this.driver.findElement(By.id('password')).sendKeys(password, Key.RETURN);

  }
}


module.exports = new LoginPage();
