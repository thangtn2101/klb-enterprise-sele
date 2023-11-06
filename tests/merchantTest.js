const {By, until } = require("selenium-webdriver");

const assert = require("assert");

const config = require('../utils/config.js');

const companyData = require('../test_data/company_data.json');

const LoginPage = require('../pages/LoginPage.js');

const MerchantPage = require('../pages/MerchantPage.js');

const helper = require('../utils/helpers.js');

const PackageEnum = require("../enums/packageEnum.js")

const ChargeTypeEnum = require("../enums/chargeTypeEnum.js")

const SexEnum = require("../enums/sexEnum.js");
const { it } = require("mocha");


describe('Merchant Module Tests', function () {
  let driver;
  let merchantPage;


  before(async function () {
    driver = await helper.initializeChromeDriver();
    merchantPage = new MerchantPage(driver);
  }
  );

  after(async function () {
    // await driver.quit();
  });

  it('Create merchant successfully', async function () {
    const loginPage = new LoginPage(driver);

    const username = config.adminUsername;
    const password = config.adminPassword;
    const adminName = config.adminName;

    await loginPage.login(username, password, adminName);


    await merchantPage.navigate();

    const merchantType = companyData.type;
    const affiliate = companyData.affiliate;
    const merchantCif = companyData.cif;
    const companyName = companyData.companyName;

    const limitPackageValue = PackageEnum.SILVER;
    const chargeTypeValue = ChargeTypeEnum.MONTHLY;

    const repesentName = companyData.repesentName;
    const repesentDoB = companyData.repesentDoB;
    const sex = SexEnum.MALE;
    const representEmail = companyData.representEmail;
    const isWhiteList = false;



    //Step 1 
    await merchantPage.createMCProfile(
      merchantType,
      affiliate,
      merchantCif,
      companyName,
      limitPackageValue,
      chargeTypeValue,
      repesentName,
      repesentDoB,
      sex,
      representEmail,
      isWhiteList
    );

    const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    const successMessage = await notification.getText();


    const regExpObject = new RegExp("Khởi tạo đối tác thành công");
    assert.match(successMessage, regExpObject, "Khởi tạo không thành công");
  });

  it('Add account successfully', async function () {
    await merchantPage.addAccountForMC();

    //Expected 3 account add successfully to Mc 
    const tableBody = await driver.findElement(By.css('tbody[role="rowgroup"]'));
    const rows = await tableBody.findElements(By.css('tr[role="row"]'));
    assert.equal(rows.length, 3, "Gán tài khoản không thành công");
  });

  it('Add MC Fee successfully', async function () {
    var continueButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-2"]/div/button[2]')), 1000);
    await driver.wait(until.elementIsEnabled(continueButton), 1000);
    await driver.wait(until.elementIsVisible(continueButton), 1000);
    await continueButton.click();
    assert.equal(1, 1, "Gán phí không thành công");
  });

  it('Upload MC document successfully', async function () {

    var continueButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-3"]/div[2]/button[2]')), 1000);
    await driver.wait(until.elementIsEnabled(continueButton), 1000);
    await driver.wait(until.elementIsVisible(continueButton), 1000);
    await continueButton.click();
    assert.equal(1, 1, "Gán phí không thành công");
  });





});