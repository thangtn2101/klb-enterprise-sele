
const { By, until } = require("selenium-webdriver");

const assert = require("assert");

const config = require('../utils/config.js');

const helper = require('../utils/helpers.js');

const LoginPage = require('../pages/LoginPage.js');

const FeePage = require('../pages/FeePage.js')

const { it } = require("mocha");


describe('Fee Module Tests', function () {
    let driver;
    let feePage;

    before(async function () {
        driver = await helper.initializeChromeDriver();
        feePage = new FeePage(driver);

        const loginPage = new LoginPage(driver);
        const username = config.adminUsername;
        const password = config.adminPassword;
        const adminName = config.adminName;
    
        await loginPage.login(username, password, adminName);

    });


    after(async function () {
        await driver.quit();
    });

    it('[Happy Case]Create COBO FREE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();

        const feeType = 'Thu hộ' 
        const vat = 10;
        const feeMethod = 'Miễn phí'

        await feePage.createFee(feeType, vat, feeMethod);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });

    it('[Happy Case] Create COBO FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();
        
        //fee data 
        const feeType = 'Thu hộ' 
        const vat = 10;
        const feeMethod = 'Phí cố định'
        const feeRule = 'Số tiền phí cố định'
        const value = 1500

        //Create fee
        await feePage.createFee(feeType, vat, feeMethod, feeRule, value);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });

    it('[Happy Case] Create COBO FIXED FEE WITH PERCENT successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();
        
        //fee data 
        const feeType = 'Thu hộ' 
        const vat = 10;
        const feeMethod = 'Phí cố định'
        const feeRule = 'Số tiền phí theo tỷ lệ %'
        const value = 10

        //Create fee
        await feePage.createFee(feeType, vat, feeMethod, feeRule, value);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });

});