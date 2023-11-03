const { Builder, By, Key, until, wait } = require("selenium-webdriver");

const assert = require("assert");

const config = require('../utils/config.js');

const companyData = require('../test_data/company_data.json');

const LoginPage = require('../pages/LoginPage.js');

const MerchantPage = require('../pages/MerchantPage.js');

const helper = require('../utils/helpers.js');

const PackageEnum = require("../enums/packageEnum.js")

const ChargeTypeEnum = require("../enums/chargeTypeEnum.js")

const SexEnum = require("../enums/sexEnum.js")


describe('Merchant Module Tests', function () {
  let driver;

  beforeEach(async function () {
    driver = await helper.initializeChromeDriver();
  }
  );

  afterEach(async function () {
    // await driver.quit();
  });

  it('Create merchant successfully', async function () {
    const loginPage = new LoginPage(driver);

    const username = config.adminUsername;
    const password = config.adminPassword;
    const adminName = config.adminName;

    await loginPage.login(username, password, adminName);

    const merchantPage = new MerchantPage(driver);
    await merchantPage.navigate();

    const merchantType = companyData.type;
    const affiliate = companyData.affiliate;
    const merchantCif = companyData.cif;
    
    const limitPackageValue = PackageEnum.SILVER;
    const chargeTypeValue = ChargeTypeEnum.MONTHLY;

    const repesentName = "Trần Giang Thiếu Anh";
    const repesentDoB = "21/01/2001";
    const sex = SexEnum.MALE;
    const representEmail = "thang@gmail.com.vn"
    const isWhiteList = false;



    //Step 1 
    await merchantPage.createMCProfile(
      merchantType,
      affiliate,
      merchantCif,
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
    assert.match(successMessage, regExpObject);

    //Step 2 
    merchantPage.addAccountForMC();

    
  });

});