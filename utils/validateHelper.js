const { By, until } = require("selenium-webdriver");

const assert = require("assert");


class ValidateHelper {
        async assertNotificationMatchByXpath(notiXpath, expectMessage) {
                const notification = await driver.wait(until.elementLocated(By.xpath(notiXpath)), 5000);
                const message = await notification.getText();
                const regExpObject = new RegExp(expectMessage);
                assert.match(message, regExpObject);
                await driver.wait(until.stalenessOf(notification), 10000);
        }
}


module.exports = new ValidateHelper();