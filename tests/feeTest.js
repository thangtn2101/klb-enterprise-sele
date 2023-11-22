
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
    it('[Happy Case] Create COBO FREE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();

        const feeType = 'Thu hộ' 
        const vat = 10;
        const feeMethod = 'Miễn phí'

        feeCode = await feePage.createFee(feeType, vat, feeMethod);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject COBO FREE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit COBO FREE FEE successfully', async function () {
        const vat = 5;
        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve COBO FREE FEE successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.approveFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Duyệt thành công");
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
        feeCode = await feePage.createFee(feeType, vat, feeMethod, feeRule, value);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject COBO FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit COBO FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee detail by code
        const vat = 5;

        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve COBO FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.approveFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Duyệt thành công");
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
        feeCode = await feePage.createFee(feeType, vat, feeMethod, feeRule, value);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject COBO FIXED FEE WITH PERCENT successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit COBO FIXED FEE WITH PERCENT successfully', async function () {
        const vat = 5;

        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve COBO FIXED FEE WITH PERCENT successfully', async function () {
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
    it('[Happy Case] Create POBO FREE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();

        const feeType = 'Chi hộ nội bộ' 
        const vat = 10;
        const feeMethod = 'Miễn phí'

        feeCode = await feePage.createFee(feeType, vat, feeMethod);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject POBO FREE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit POBO FREE FEE successfully', async function () {
        //Navigate to fee detail by code
        const vat = 5;

        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve POBO FREE FEE successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.approveFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });

    it('[Happy Case] Create POBO FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();
        
        //fee data 
        const feeType = 'Chi hộ nội bộ' 
        const vat = 10;
        const feeMethod = 'Phí cố định'
        const feeRule = 'Số tiền phí cố định'
        const value = 1500

        //Create fee
        feeCode = await feePage.createFee(feeType, vat, feeMethod, feeRule, value);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject POBO FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit POBO FIXED FEE WITH PRICES successfully', async function () {
        const vat = 5;

        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve POBO FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.approveFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });


    it('[Happy Case] Create POBO FIXED FEE WITH PERCENT successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();
        
        //fee data 
        const feeType = 'Chi hộ nội bộ' 
        const vat = 10;
        const feeMethod = 'Phí cố định'
        const feeRule = 'Số tiền phí theo tỷ lệ %'
        const value = 10

        //Create fee
        feeCode = await feePage.createFee(feeType, vat, feeMethod, feeRule, value);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject POBO FIXED FEE WITH PERCENT successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit POBO FIXED FEE WITH PERCENT successfully', async function () {
        const vat = 5;
        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve POBO FIXED FEE WITH PERCENT successfully', async function () {
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
    it('[Happy Case] Create POBO_INTER_BANK FREE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();

        const feeType = 'Chi hộ liên ngân hàng' 
        const vat = 10;
        const feeMethod = 'Miễn phí'

        feeCode = await feePage.createFee(feeType, vat, feeMethod);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject POBO_INTER_BANK FREE FEE successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit POBO_INTER_BANK FREE FEE successfully', async function () {
        const vat = 5;
        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve POBO_INTER_BANK FREE FEE successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.approveFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });

    it('[Happy Case] Create POBO_INTER_BANK FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();
        
        //fee data 
        const feeType = 'Chi hộ liên ngân hàng' 
        const vat = 10;
        const feeMethod = 'Phí cố định'
        const feeRule = 'Số tiền phí cố định'
        const value = 1500

        //Create fee
        feeCode = await feePage.createFee(feeType, vat, feeMethod, feeRule, value);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject POBO_INTER_BANK FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit POBO_INTER_BANK FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee detail by code
        const vat = 5;
        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve POBO_INTER_BANK FIXED FEE WITH PRICES successfully', async function () {
        //Navigate to fee detail by code
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.approveFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });


    it('[Happy Case] Create POBO_INTER_BANK FIXED FEE WITH PERCENT successfully', async function () {
        //Navigate to fee 
        await feePage.navigate();
        
        //fee data 
        const feeType = 'Chi hộ liên ngân hàng' 
        const vat = 10;
        const feeMethod = 'Phí cố định'
        const feeRule = 'Số tiền phí theo tỷ lệ %'
        const value = 10

        //Create fee
        feeCode = await feePage.createFee(feeType, vat, feeMethod, feeRule, value);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Reject POBO_INTER_BANK FIXED FEE WITH PERCENT successfully', async function () {
        //Navigate to fee 
        await feePage.navigateFeeDetailByCode(feeCode);

        await feePage.rejectFee();

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Từ chối duyệt thành công");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Edit POBO_INTER_BANK FIXED FEE WITH PERCENT successfully', async function () {
        //Navigate to fee detail by code
        const vat = 5;
        await feePage.navigateFeeDetailByCode(feeCode);
        await helper.clickOnEditButton(driver);
        await feePage.editFeeVAT(vat);

        const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
        const message = await notification.getText();
    
        const regExpObject = new RegExp("Success");
        assert.match(message, regExpObject);
        await driver.wait(until.stalenessOf(notification), 10000);
    });
    it('[Happy Case] Approve POBO_INTER_BANK FIXED FEE WITH PERCENT successfully', async function () {
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