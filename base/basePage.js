const helper = require('../utils/helpers.js');
const { By, until } = require('selenium-webdriver');


var driver = helper.initializeChromeDriver();

class BasePage {
    constructor() {
        global.driver = driver;
    }
    async go_to_url(theURL) {
        await driver.get(theURL);
    }

    async enterTextById(id, inputValue) {
        const input = await driver.wait(until.elementLocated(By.id(id)), 10000);
        await input.sendKeys(inputValue);
    }

    async enterTextByCss(css, value) {
        const input = await driver.wait(until.elementLocated(By.css(css)), 10000);
        await input.sendKeys(value);

    }
    async enterTextByXpath(xpath, value) {
        const input = await driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
        await input.sendKeys(value);
    }
    async clearTextByXpath(xpath){
        const input = await driver.wait(until.elementLocated(By.xpath(xpath)), 10000);
        await input.clear();
    }
    async clickById(id) {
        const elementBT = await driver.wait(until.elementLocated(By.id(id)), 5000);
        await driver.wait(until.elementIsVisible(elementBT), 5000);
        await driver.wait(until.elementIsEnabled(elementBT), 5000);
        await elementBT.click();
    }

    async clickByXpath(xpath) {
        const elementBT = await driver.wait(until.elementLocated(By.xpath(xpath)), 5000);
        await driver.wait(until.elementIsVisible(elementBT), 5000);
        await driver.wait(until.elementIsEnabled(elementBT), 5000);
        await elementBT.click();
    }

    async waitLoadingStale(){
        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await driver.wait(until.stalenessOf(loadingElement), 10000);
      }

    async getValueByXpath(xpath){
        return await driver.findElement(By.xpath(xpath)).getAttribute('value');
    }

    async closeBrowser() {
        await driver.quit();
    }
}

module.exports = BasePage;