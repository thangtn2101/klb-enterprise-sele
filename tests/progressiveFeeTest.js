
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

        const feeType = 'Thu hộ'
        const vat = 10;
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
    it('[Happy Case] Reject COBO PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit COBO PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);
        const vat = 5;
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve COBO PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.approveFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });

    
    // ------------------------- POBO -------------------------------------
    it('[Happy Case] Create POBO PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();

        const feeType = 'Chi hộ nội bộ'
        const vat = 10;
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
        ];

        feeCode = await feePage.createFee(feeType, vat, feeMethod, null, null, feeLevelData);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject POBO PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit POBO PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);
        const vat = 5;
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve POBO PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.approveFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });


    // ------------------------- POBO_INTER_BANK -------------------------------------
    it('[Happy Case] Create POBO_INTER_BANK PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();

        const feeType = 'Chi hộ liên ngân hàng'
        const vat = 10;
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
        ];

        feeCode = await feePage.createFee(feeType, vat, feeMethod, null, null, feeLevelData);


        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject POBO_INTER_BANK PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit POBO_INTER_BANK PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);
        const vat = 5;
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve POBO_INTER_BANK PROGRESSIVE FEE successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.approveFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();

        const regExpObject = new RegExp("Duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
});