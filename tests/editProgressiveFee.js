
const { By, until } = require("selenium-webdriver");

const assert = require("assert");

const config = require('../utils/config.js');

const helper = require('../utils/helpers.js');

const LoginPage = require('../pages/LoginPage.js');

const FeePage = require('../pages/FeePage.js')

const { it } = require("mocha");


describe('PROGRESSIVE Fee Module Tests', function () {
    let driver;
    let feePage;
    let feeCode;


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

    // ------------------------- COBO -------------------------------------
    it('[Happy Case] Create COBO PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();

        const vat = 10;
        const feeType = 'Thu hộ'
        const feeMethod = 'Phí lũy tiến'
        const feeLevelData = [
            {
                toValue: 19999999,
                feeMoney: 0,
                feePercent: 0.30,
                minFeeMoney: 0
            },
            {
                toValue: 199999999,
                feeMoney: 0,
                feePercent: 0.25,
                minFeeMoney: 0
            },
            {
                toValue: 499999999,
                feeMoney: 0,
                feePercent: 0.20,
                minFeeMoney: 0
            },
            // Add more data as needed
        ];

        feeCode = await feePage.createFee(feeType, vat, feeMethod, null, null, feeLevelData);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });

    it('[Happy Case] Edit VAT with different value than init', async function () {
        //Navigate to fee detail by code
        const newVat = 5;

        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(newVat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });

    it('[Happy Case] Edit Fee Name with different value than init', async function () {
        //Navigate to fee detail by code

        let isFeeNameExisted = true;
        let feeName;

        while (isFeeNameExisted) {
            feeName = "[AUTO] " + helper.generateCompanyName() + " " + helper.generateRandomString(3);
            const feesResult = await helper.getAllFeeBy(null, feeName);
            if (feesResult.length === 0) {
                isFeeNameExisted = false;
            }
        }

        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeName(feeName);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });

    it('[Happy Case] Edit Fee Name with different value than init', async function () {
        //Navigate to fee detail by code

        let isFeeNameExisted = true;
        let feeName;

        while (isFeeNameExisted) {
            feeName = "[AUTO] " + helper.generateCompanyName() + " " + helper.generateRandomString(3);
            const feesResult = await helper.getAllFeeBy(null, feeName);
            if (feesResult.length === 0) {
                isFeeNameExisted = false;
            }
        }

        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeName(feeName);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    

});