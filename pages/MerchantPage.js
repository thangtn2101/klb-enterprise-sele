const { By, until, Key } = require("selenium-webdriver");
const helper = require('../utils/helpers.js');
const assert = require("assert");
const BasePage = require("../base/basePage.js");



class MerchantPage extends BasePage {

    async navigate(theURL) {
        await this.go_to_url(theURL);
        await this.waitLoadingStale();
    }

    //Step 1 
    async createMCProfile({
        merchantType,
        affiliate,
        merchantCif,
        merchantNameValue,
        isAutoGenUsername,
        username,
        limitPackage,
        businessCategory,
        chargeTypeValue,
        representName,
        representDoB,
        representGender,
        representCountry,
        representIDCode,
        representIDType,
        representIDIssuanceDate,
        representIDIssuancePlace,
        representPosition,
        financeContactName,
        financeContactEmail,
        financeContactPhone,
        techContactName,
        techContactEmail,
        techContactPhone,
        isWhiteList }) {
        //Click button add
        await this.clickByXpath("//span[contains(text(),'Thêm mới')]");

        //Chọn đơn vị mở TK
        await this.clickByXpath("//mat-form-field[.//mat-label[contains(text(), 'Đơn vị')]]");
        await this.clickByXpath(affiliate);

        //Chọn loại hình doanh nghiệp
        await this.clickByXpath("//mat-form-field[.//mat-label[contains(text(), 'Loại hình doanh nghiệp')]]");
        await this.clickByXpath(merchantType);

        //Nhập Cif
        await this.enterTextByXpath("//input[contains(@data-placeholder, 'Nhập Số CIF')]", merchantCif);
        await this.clickByXpath("//button[contains(span, 'Tìm kiếm')]");

        await this.waitLoadingStale();

        //Thay đổi tên công ty
        const merchantNameInput = "//input[contains(@data-placeholder, 'Nhập Tên Đối tác')]"
        await this.clearTextByXpath(merchantNameInput)
        await this.enterTextByXpath(merchantNameInput, merchantNameValue);

        // Chọn hạn mức 
        await this.clickByXpath("//mat-form-field[.//mat-label[contains(text(), 'Hạn mức giao dịch')]]");
        await this.clickByXpath(limitPackage);

        //Chọn giá trị loại thu phí
        await this.clickByXpath("//mat-form-field[.//mat-label[contains(text(), 'Loại thu phí')]]");
        await this.clickByXpath(chargeTypeValue);

        //Chọn loại hình kinh doanh
        await this.clickByXpath("//mat-form-field[.//mat-label[contains(text(), 'Ngành nghề kinh doanh')]]");
        await this.clickByXpath(businessCategory);

        //Enter Username
        if (isAutoGenUsername == true) {
            let isExisted = true;
            while (isExisted) {
                let randomString = helper.generateRandomString(6);
                username = "MCUN" + randomString;
                isExisted = await helper.checkUsernameAvailability(username);
            }
        }
        const userNameInput = "//input[contains(@data-placeholder, 'Nhập Tài khoản MC Portal')]"
        await this.clearTextByXpath(userNameInput)
        await this.enterTextByXpath(userNameInput, username);

        //Nhập thông tin người đại diện 
        const representNameInput = "//input[contains(@data-placeholder, 'Nhập Họ tên')]";
        await this.clickByXpath(representNameInput);
        await this.waitLoadingStale();
        await this.clearTextByXpath(representNameInput)
        await this.enterTextByXpath(representNameInput, representName);

        //Ngày sinh
        const repesentDoInput = "//input[contains(@data-placeholder, 'dd/mm/yyyy')]";
        await this.enterTextByXpath(repesentDoInput, representDoB);

        //Giới tính
        await this.clickByXpath(representGender);

        //Chọn quốc tịch Việt Nam
        await this.clickByXpath("//mat-form-field[.//mat-label[contains(text(), 'Quốc tịch')]]");
        await this.clickByXpath(representCountry);

        // Nhập CCCD 
        const idInput = "//input[contains(@data-placeholder, 'Nhập Số giấy tờ')]";
        await this.clearTextByXpath(idInput);
        await this.enterTextByXpath(idInput, representIDCode);

        //Chọn loại giấy tờ CMND 
        await this.clickByXpath("//mat-form-field[.//mat-label[contains(text(), 'Loại giấy tờ')]]");
        await this.clickByXpath(representIDType);

        // Nhập ngày cấp 
        const issuanceDateInput = "(//input[contains(@data-placeholder, 'dd/mm/yyyy')])[2]";
        await this.clearTextByXpath(issuanceDateInput);
        await this.enterTextByXpath(issuanceDateInput, representIDIssuanceDate);

        // Nhập nơi cấp
        const issuancePlace = "//input[contains(@data-placeholder, 'Nhập Nơi cấp')]";
        this.enterTextByXpath(issuancePlace, representIDIssuancePlace)

        //Chọn Chức vụ
        await this.clickByXpath("//mat-form-field[.//mat-label[contains(text(), 'Chức vụ')]]");
        await this.clickByXpath(representPosition);

        //Tên người liên hệ tài chính
        const financeContactNameInput = "(//input[contains(@data-placeholder, 'Nhập Họ và tên')])[1]"
        await this.clearTextByXpath(financeContactNameInput);
        await this.enterTextByXpath(financeContactNameInput, financeContactName);

        //SDT người liên hệ tài chính
        const financeContactPhoneInput = "(//input[contains(@data-placeholder, 'Nhập Số điện thoại')])[1]"
        await this.clearTextByXpath(financeContactPhoneInput);
        await this.enterTextByXpath(financeContactPhoneInput, financeContactPhone);

        //Email người liên hệ tài chính
        const financeContactEmailInput = "(//input[contains(@data-placeholder, 'Nhập Email')])[1]"
        await this.clearTextByXpath(financeContactEmailInput);
        await this.enterTextByXpath(financeContactEmailInput, financeContactEmail);

        //Tên người liên hệ kỹ thuật
        const techContactNameInput = "(//input[contains(@data-placeholder, 'Nhập Họ và tên')])[2]"
        await this.clearTextByXpath(techContactNameInput);
        await this.enterTextByXpath(techContactNameInput, techContactName);

        //SDT người liên hệ kỹ thuật
        const techContactPhoneInput = "(//input[contains(@data-placeholder, 'Nhập Số điện thoại')])[2]"
        await this.clearTextByXpath(techContactPhoneInput);
        await this.enterTextByXpath(techContactPhoneInput, techContactPhone);

        //Email người liên hệ kỹ thuật
        const techContactEmailInput = "(//input[contains(@data-placeholder, 'Nhập Email')])[2]"
        await this.clearTextByXpath(techContactEmailInput);
        await this.enterTextByXpath(techContactEmailInput, techContactEmail);

        if (isWhiteList === false) {
            //Uncheck white list 
            await this.clickById('mat-checkbox-1');
        }

        //Find merchant ID
        const mcID = await this.getValueByXpath("//input[contains(@placeholder, 'Nhập Mã Đối tác')]");

        // Return merchant ID 
        return mcID;
    }

    //step 2 
    async addAccountForMC(accountNo, accountType) {
        //Click on button "Thêm mới"
        await this.clickByXpath("//button[contains(span, 'Thêm mới')]");
        await this.waitLoadingStale();
        
        //Select account type
        await this.clickByXpath("//div[contains(span,'Loại tài khoản')]");
        await this.clickByXpath(accountType)

        //Select account number
        await this.clickByXpath("//div[contains(span,'Số tài khoản')]");
        await this.clickByXpath("//mat-option[contains(span,'" + accountNo + "')]")

        await this.clickByXpath("//span[contains(text(),'Lưu')]")
        await this.waitLoadingStale();
    }

    async uploadDocument(documentType, imageURL) {
        var uploadButton = await this.driver.wait(until.elementLocated(By.xpath(documentType)), 1000);
        await this.driver.wait(until.elementIsEnabled(uploadButton), 1000);
        await uploadButton.sendKeys(imageURL)
        await this.waitLoadingStale();
    }

    async generateIntergration(webhookURL, retryValue) {
        const urlHostInput = await this.driver.findElement(By.xpath("//input[contains(@data-placeholder, 'Nhập URL')]"));
        await this.driver.wait(until.elementIsEnabled(urlHostInput), 2000);
        await this.driver.wait(until.elementIsVisible(urlHostInput), 2000);
        await urlHostInput.sendKeys(webhookURL);

        const retryInput = await this.driver.findElement(By.xpath("//input[contains(@data-placeholder, 'Nhập Số lần retry tối đa (x lần)')]"));
        await retryInput.sendKeys(retryValue);

        const genEKeyButtonPath = '//*[@id="cdk-step-content-0-4"]/div/app-form-tich-hop/form/div[2]/div[6]/div/mat-form-field/div/div[1]/div/button'
        var genEKeyButton = await this.driver.wait(until.elementLocated(By.xpath(genEKeyButtonPath)), 1000);
        await this.driver.wait(until.elementIsEnabled(genEKeyButton), 1000);
        await this.driver.wait(until.elementIsVisible(genEKeyButton), 1000);
        await genEKeyButton.click();
        await helper.waitLoadingStale(this.driver);

        const genSKeyButtonPath = '//*[@id="cdk-step-content-0-4"]/div/app-form-tich-hop/form/div[2]/div[8]/div/mat-form-field/div/div[1]/div/button'
        var genSKeyButton = await this.driver.wait(until.elementLocated(By.xpath(genSKeyButtonPath)), 1000);
        await this.driver.wait(until.elementIsEnabled(genSKeyButton), 1000);
        await this.driver.wait(until.elementIsVisible(genSKeyButton), 1000);
        await genSKeyButton.click();
        await helper.waitLoadingStale(this.driver);

        await this.driver.findElement(By.id('mat-input-17'))
            .getAttribute('value').then(textValue => {
                assert.notEqual('', textValue);
            });


        await this.driver.findElement(By.id('mat-input-19'))
            .getAttribute('value').then(textValue => {
                assert.notEqual('', textValue);
            });

        //Nhấn lưu 
        await this.driver.findElement(By.xpath('//*[@id="cdk-step-content-0-4"]/div/app-form-tich-hop/div[2]/button')).click();
        await helper.waitLoadingStale(this.driver);
    }

    async navigateMerchantDetail(id) {
        this.navigate();
        
        //Search merchant by id 
        const searchInput = await this.driver.wait(until.elementLocated(By.xpath("//input[contains(@placeholder, 'Số CIF')]")), 10000);
        await this.driver.wait(until.elementIsEnabled(searchInput), 2000);
        await this.driver.wait(until.elementIsVisible(searchInput), 2000);
        await searchInput.sendKeys(id, Key.ENTER);

        await helper.waitLoadingStale(this.driver);

        // Get the first row
        const firstRow = await this.driver.findElement(By.css('tbody > tr'));

        // Click on the first row
        await firstRow.click();

    }

    async sendApproveRequest() {
        const approveButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Gửi duyệt')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(approveButton), 1000);
        await approveButton.click();

        const confirmButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xác nhận')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(confirmButton), 1000);
        await confirmButton.click();
        await helper.waitLoadingStale(this.driver);
    }

    async approveMerchant() {
        const approveButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Duyệt')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(approveButton), 1000);
        await approveButton.click();

        const confirmButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xác nhận')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(confirmButton), 1000);
        await confirmButton.click();
        await helper.waitLoadingStale(this.driver);
    }

    async deleteMerchant() {
        const approveButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xóa')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(approveButton), 1000);
        await approveButton.click();

        const confirmButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xác nhận')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(confirmButton), 1000);
        await confirmButton.click();
        await helper.waitLoadingStale(this.driver);
    }

    async rejectMerchant() {
        const rejectButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Từ chối')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(rejectButton), 1000);
        await rejectButton.click();

        const rejectInput = await this.driver.wait(until.elementLocated(By.xpath("//textarea[contains(@placeholder, 'Nhập lý do từ chối')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(rejectInput), 1000);
        await rejectInput.click();
        await rejectInput.sendKeys("Từ chối đối tác tự động");

        const confirmButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xác nhận')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(confirmButton), 1000);
        await confirmButton.click();
        await helper.waitLoadingStale(this.driver);
    }
}

module.exports = new MerchantPage();
