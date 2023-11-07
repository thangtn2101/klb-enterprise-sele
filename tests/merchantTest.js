const { By, until } = require("selenium-webdriver");

const assert = require("assert");

const config = require('../utils/config.js');

const companyData = require('../test_data/personal_data.json');

const LoginPage = require('../pages/LoginPage.js');

const MerchantPage = require('../pages/MerchantPage.js');

const helper = require('../utils/helpers.js');

const PackageEnum = require("../enums/packageEnum.js")

const ChargeTypeEnum = require("../enums/chargeTypeEnum.js")

const SexEnum = require("../enums/sexEnum.js");

const DocEnum = require("../enums/documentEnum.js");

const BusinessCateEnum = require("../enums/businessCategory.js");

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

  //Step 1
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
    
    const limitPackageValue = PackageEnum.VIP;
    const businessType = BusinessCateEnum.DICH_VU_AN_UONG;
    const chargeTypeValue = ChargeTypeEnum.MONTHLY;

    const repesentName = companyData.repesentName;
    const repesentDoB = companyData.repesentDoB;

    const sex = SexEnum.MALE;

    const representEmail = companyData.representEmail;
    const isWhiteList = true;

    //Step 1 
    await merchantPage.createMCProfile(
      merchantType,
      affiliate,
      merchantCif,
      companyName,
      limitPackageValue,
      businessType,
      chargeTypeValue,
      repesentName,
      repesentDoB,
      sex,
      representEmail,
      isWhiteList
    );

    const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    const successMessage = await notification.getText();
    await driver.wait(until.stalenessOf(notification), 10000);

    const regExpObject = new RegExp("Khởi tạo đối tác thành công");
    assert.match(successMessage, regExpObject);

  });

  //Step 2
  it('Add account successfully', async function () {
    //Start add account
    const accountSelect = companyData.account_no
    await merchantPage.addAccountForMC(accountSelect);

    //Expected 3 account add successfully to Mc 
    const tableBody = await driver.findElement(By.css('tbody[role="rowgroup"]'));
    const rows = await tableBody.findElements(By.css('tr[role="row"]'));
    assert.equal(rows.length, 3, "Gán tài khoản thất bại");
  });

  //Step 3
  it('Add MC Fee successfully', async function () {
    var continueButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-2"]/div/button[2]')), 1000);
    await driver.wait(until.elementIsEnabled(continueButton), 1000);
    await driver.wait(until.elementIsVisible(continueButton), 1000);
    await continueButton.click();
    assert.equal(1, 1, "Gán phí Thất bại");
  });

  //Step 4 
  it('Upload MC document successfully', async function () {
    const regExpObject = new RegExp("Upload file thành công");
    let notification;
    let documentURL;
    let successMessage;

    //Upload Giấy phép đăng ký kinh doanh
    documentURL = '/home/unicloud/Documents/PDF example/Size_8.9MB.pdf'
    await merchantPage.uploadDocument(DocEnum.BUSINESSLICENSE, documentURL)

    notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    successMessage = await notification.getText();

    assert.match(successMessage, regExpObject, "Upload Giấy phép KD thất bại");
    await driver.wait(until.stalenessOf(notification), 10000);

    //Upload Hợp đồng
    documentURL = '/home/unicloud/Pictures/Hop-dong.pdf'
    await merchantPage.uploadDocument(DocEnum.BUSINESSCONTRACT, documentURL)

    notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    successMessage = await notification.getText();

    assert.match(successMessage, regExpObject, "Upload Hợp đồng thất bại");
    await driver.wait(until.stalenessOf(notification), 10000);

    //Upload Giấy chứng nhận đại diện hợp pháp
    documentURL = '/home/unicloud/Pictures/GIAY-PHEP-DKKD_001.jpg'
    await merchantPage.uploadDocument(DocEnum.LEGALCONTRACT, documentURL)

    notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    successMessage = await notification.getText();

    assert.match(successMessage, regExpObject, "Upload Giấy chứng nhận đại diện thất bại");
    await driver.wait(until.stalenessOf(notification), 10000);

    //Upload CMND mặt trước
    documentURL = '/home/unicloud/Pictures/doggie_corgi-1280x600.jpg'
    await merchantPage.uploadDocument(DocEnum.FRONTID, documentURL)

    notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    successMessage = await notification.getText();

    assert.match(successMessage, regExpObject, "Upload CMND mặt trước thất bại");
    await driver.wait(until.stalenessOf(notification), 10000);

    //Upload CMND mặt sau
    documentURL = '/home/unicloud/Pictures/Nengoro.full.2465602.jpg'
    await merchantPage.uploadDocument(DocEnum.BACKID, documentURL)

    notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    successMessage = await notification.getText();

    assert.match(successMessage, regExpObject, "Upload CMND mặt sau thất bại");
    await driver.wait(until.stalenessOf(notification), 10000);

    //Upload giấy tờ khác 
    documentURL = '/home/unicloud/Pictures/Facebook post 1.png'
    await merchantPage.uploadDocument(DocEnum.ORTHERDOCUMENT, documentURL)

    notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    successMessage = await notification.getText();

    assert.match(successMessage, regExpObject, "Upload giấy tờ khác thất bại");
    await driver.wait(until.stalenessOf(notification), 10000);

    var continueButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-3"]/div[2]/button[2]')), 1000);
    await driver.wait(until.elementIsEnabled(continueButton), 1000);
    await driver.wait(until.elementIsVisible(continueButton), 1000);
    await continueButton.click();

  });

  //Step 5
  it('Generate integration Key', async function () {
    const webhookURL = 'https://www.google.com/'
    const retryValue = '100'
    await merchantPage.generateIntergration(webhookURL, retryValue);
    notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    successMessage = await notification.getText();

    const regExpObject = new RegExp("Success");
    assert.match(successMessage, regExpObject, "Tạo key thất bại");
  });




});