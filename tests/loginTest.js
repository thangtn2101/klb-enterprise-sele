const { By, until } = require("selenium-webdriver");

const assert = require("assert");

const config = require('../utils/config.js');

const LoginPage = require('../pages/LoginPage.js');

const helper = require('../utils/helpers.js');

describe('Login Tests', function () {
  let driver;

  beforeEach(async function () {
    driver = await helper.initializeChromeDriver();

  });


  afterEach(async function () {
    await driver.quit();
  });

  it('[Happy Case] Login successfully', async function () {

    const loginPage = new LoginPage(driver);
    const username = config.adminUsername;
    const password = config.adminPassword; 
    
    await loginPage.loginForTest(username, password);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add assertions to verify successful login
    var h4Element = await driver.wait(until.elementLocated(By.xpath("//div[@class='info']/h4")), 10000);

    const welcomeMessage = await h4Element.getText();

    assert.equal(welcomeMessage, config.adminName);

  });

  it('Show error on invalid login', async function () {
    const loginPage = new LoginPage(driver);

    const username = 'invalid_username';
    const password = 'invalid_password';

    await loginPage.loginForTest(username, password);
    

    const regExpObject = new RegExp("Đăng nhập không thành công, vui lòng thử lại.");
    notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    message = await notification.getText();
    assert.match(message, regExpObject);

    await driver.wait(until.stalenessOf(notification), 10000);

  });
});