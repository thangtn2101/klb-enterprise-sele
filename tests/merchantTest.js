const { By, until } = require("selenium-webdriver");

const assert = require("assert");

const config = require('../utils/config.js');

const companyCoreData = require('../test_data/json/personal_data.json');

const loginPage = require('../pages/LoginPage');

const merchantPage = require('../pages/MerchantPage');

const PackageEnum = require("../enums/packageEnum.js")

const AffiliateEnum = require("../enums/affiliateEnum.js")

const ChargeTypeEnum = require("../enums/chargeTypeEnum.js")

const merchantTypeEnum = require("../enums/merchantTypeEnum.js")

const SexEnum = require("../enums/sexEnum.js");

const CountryEnum = require("../enums/countryEnum.js");

const PositionEnum = require("../enums/positionEnum.js");

const IDTypeEnum = require("../enums/IDTypeEnum.js");

const DocEnum = require("../enums/documentEnum.js");

const BusinessCateEnum = require("../enums/businessCategory.js");

const { it } = require("mocha");

const { resolve } = require('path');

const username = config.adminUsername;

const password = config.adminPassword;

const adminName = config.adminName;

const baseurl = config.host;

let mcID;

describe('CREATE MERCHANT SCENARIO', function () {

  before(async function () {
    await loginPage.navigate(baseurl);
    await loginPage.login(username, password, adminName);
  });

  after(async function () {
    await merchantPage.closeBrowser();
  });

  it('[Happy Case] Create merchant Profile successfully', async function () {
    const url = baseurl + '#/quan-ly-doi-tac/quan-ly-merchant';
    await merchantPage.navigate(url);

    const profileParam = {
      merchantType: merchantTypeEnum.PERSONAL, 
      affiliate: AffiliateEnum.CN_BA_RIA_VUNG_TAU, 
      merchantCif: companyCoreData.cif, 
      merchantNameValue: "[TEST] THÙY VINH LỘC", 
      isAutoGenUsername: true,
      username,
      limitPackage: PackageEnum.VIP, 
      businessCategory: BusinessCateEnum.DICH_VU_AN_UONG, 
      chargeTypeValue: ChargeTypeEnum.MONTHLY, 
      representName: "Trần Giang Thiếu Anh", 
      representDoB: "21/01/2001", 
      representGender: SexEnum.MALE,
      representCountry:  CountryEnum.VIETNAM,
      representIDCode: "036093002023", 
      representIDType: IDTypeEnum.HO_CHIEU,
      representIDIssuanceDate: "15/05/2016",
      representIDIssuancePlace: "CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI",
      representPosition: PositionEnum.CHU_TICH_HOI_DONG_QUAN_TRI,
      financeContactName: "Trần Giang Thiếu Anh",
      financeContactEmail: "thieuanh@gmail.com", 
      financeContactPhone: "0773834601",
      techContactName: "Nguyễn Trần Kỹ Thuật",
      techContactEmail: "kythuat@gmail.com",
      techContactPhone: "0945671234",
      isWhiteList: false
    }

    mcID = await merchantPage.createMCProfile(profileParam);

    const notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
    const message = await notification.getText();
    const regExpObject = new RegExp("Khởi tạo đối tác thành công");
    assert.match(message, regExpObject);

    await driver.wait(until.stalenessOf(notification), 10000);

  });

  it('[Happy Case] Add ALL account successfully', async function () {
    //Start add account
    const accountSelect = companyData.account_no
    await merchantPage.addAccountForMC(accountSelect);

    //Expected 3 account add successfully to MC
    const tableBody = await driver.findElement(By.css('tbody[role="rowgroup"]'));
    const rows = await tableBody.findElements(By.css('tr[role="row"]'));
    assert.equal(rows.length, 3, "Gán tài khoản thất bại");
  });

  // //Step 3
  // it('[Happy Case] Add MC Fee successfully', async function () {
  //   var continueButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-2"]/div/button[2]')), 1000);
  //   await driver.wait(until.elementIsEnabled(continueButton), 1000);
  //   await driver.wait(until.elementIsVisible(continueButton), 1000);
  //   await continueButton.click();
  //   assert.equal(1, 1, "Gán phí Thất bại");
  // });

  // //Step 4 
  // it('[Happy Case] Upload MC document successfully', async function () {
  //   const regExpObject = new RegExp("Upload file thành công");
  //   let notification;
  //   let documentURL;
  //   let message;

  //   //Upload Giấy phép đăng ký kinh doanh

  //   documentURL = resolve('./test_data/pdf/Size_8.9MB.pdf');
  //   await merchantPage.uploadDocument(DocEnum.BUSINESSLICENSE, documentURL)

  //   notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message = await notification.getText();

  //   assert.match(message, regExpObject, "Upload Giấy phép KD thất bại");
  //   await driver.wait(until.stalenessOf(notification), 10000);

  //   //Upload Hợp đồng
  //   documentURL = resolve('./test_data/pdf/Hop-dong.pdf')
  //   await merchantPage.uploadDocument(DocEnum.BUSINESSCONTRACT, documentURL)

  //   notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message = await notification.getText();

  //   assert.match(message, regExpObject, "Upload Hợp đồng thất bại");
  //   await driver.wait(until.stalenessOf(notification), 10000);

  //   //Upload Giấy chứng nhận đại diện hợp pháp
  //   documentURL = resolve('./test_data/image/GIAY-PHEP-DKKD_001.jpg')
  //   await merchantPage.uploadDocument(DocEnum.LEGALCONTRACT, documentURL)

  //   notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message = await notification.getText();

  //   assert.match(message, regExpObject, "Upload Giấy chứng nhận đại diện thất bại");
  //   await driver.wait(until.stalenessOf(notification), 10000);

  //   //Upload CMND mặt trước
  //   documentURL = resolve('./test_data/image/fakeFrontID.jpg')
  //   await merchantPage.uploadDocument(DocEnum.FRONTID, documentURL)

  //   notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message = await notification.getText();

  //   assert.match(message, regExpObject, "Upload CMND mặt trước thất bại");
  //   await driver.wait(until.stalenessOf(notification), 10000);

  //   //Upload CMND mặt sau
  //   documentURL = resolve('./test_data/image/fakeBackID.jpg')
  //   await merchantPage.uploadDocument(DocEnum.BACKID, documentURL)

  //   notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message = await notification.getText();

  //   assert.match(message, regExpObject, "Upload CMND mặt sau thất bại");
  //   await driver.wait(until.stalenessOf(notification), 10000);

  //   //Upload giấy tờ khác 
  //   documentURL = resolve('./test_data/image/images.png')
  //   await merchantPage.uploadDocument(DocEnum.ORTHERDOCUMENT, documentURL)

  //   notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message = await notification.getText();

  //   assert.match(message, regExpObject, "Upload giấy tờ khác thất bại");
  //   await driver.wait(until.stalenessOf(notification), 10000);

  //   var continueButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-3"]/div[2]/button[2]')), 1000);
  //   await driver.wait(until.elementIsEnabled(continueButton), 1000);
  //   await driver.wait(until.elementIsVisible(continueButton), 1000);
  //   await continueButton.click();

  // });

  // //Step 5
  // it('[Happy Case] Generate integration Key', async function () {
  //   const webhookURL = 'https://www.google.com/'
  //   const retryValue = '100'
  //   await merchantPage.generateIntergration(webhookURL, retryValue);

  //   notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message = await notification.getText();

  //   const regExpObject = new RegExp("Success");
  //   assert.match(message, regExpObject);
  //   await driver.wait(until.stalenessOf(notification), 10000);

  // });


  // it('[Happy Case] Reject merchant successfully', async function(){
  //   await merchantPage.navigateMerchantDetail(mcID);

  //   await merchantPage.sendApproveRequest();

  //   const regExpObject1 = new RegExp("Gửi duyệt thành công");
  //   notification1 = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message1 = await notification1.getText();
  //   assert.match(message1, regExpObject1);
  //   await driver.wait(until.stalenessOf(notification1), 10000);

  //   await merchantPage.rejectMerchant();

  //   const regExpObject = new RegExp("Từ chối duyệt thành công");
  //   notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message = await notification.getText();
  //   assert.match(message, regExpObject);

  //   await driver.wait(until.stalenessOf(notification), 10000);
  // });

  // it('[Happy Case] Approve merchant successfully', async function(){

  //   await merchantPage.navigateMerchantDetail(mcID);

  //   await merchantPage.sendApproveRequest();

  //   const regExpObject1 = new RegExp("Gửi duyệt thành công");
  //   notification1 = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message1 = await notification1.getText();
  //   assert.match(message1, regExpObject1);
  //   await driver.wait(until.stalenessOf(notification1), 10000);

  //   await merchantPage.approveMerchant();

  //   const regExpObject = new RegExp("Duyệt thành công");
  //   notification = await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);
  //   message = await notification.getText();
  //   assert.match(message, regExpObject);

  //   await driver.wait(until.stalenessOf(notification), 10000);

  // });

});