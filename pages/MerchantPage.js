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
        if (username != null) {
            const userNameInput = "//input[contains(@data-placeholder, 'Nhập Tài khoản MC Portal')]"
            await this.clearTextByXpath(userNameInput)
            await this.enterTextByXpath(userNameInput, username);
        }

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

        //Return merchant ID 
        const mcID = await this.getValueByXpath("//input[contains(@placeholder, 'Nhập Mã Đối tác')]");
        return mcID;
    }

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

    async addMCFee(feeType, feeName, dateApply) {
        await this.clickByXpath("(//button[contains(span, 'Thêm mới')])[2]");

        await this.clickByXpath("//div[contains(span,'Loại dịch vụ')]");
        await this.clickByXpath(feeType);
        await this.waitLoadingStale();

        await this.clickByXpath("//div[contains(span,'Biểu phí')]");
        await this.clickByXpath("//mat-option[contains(span,'" + feeName + "')]")

        const tdateApplyInput = "(//div[.//mat-label[text()='Ngày hiệu lực']]//input)[3]"
        await this.enterTextByXpath(tdateApplyInput, dateApply);

        await this.clickByXpath("//span[contains(text(),'Lưu')]")
    }

    async deleteMCFee(feeName,dateApply){

    }

    async uploadDocument(documentType, imageURL) {
        await this.enterTextByXpath(documentType, imageURL);
        await this.waitLoadingStale();
    }

    async enterIntegrationData(webhookURL, retryValue, isChangeTechEmail, techEmail) {
        await this.enterTextByXpath("//input[contains(@data-placeholder, 'Nhập URL')]", webhookURL);
        await this.enterTextByXpath("//input[contains(@data-placeholder, 'Nhập Số lần retry tối đa (x lần)')]", retryValue);

        if (isChangeTechEmail === true) {
            const emailRetryInput = "//input[contains(@data-placeholder, 'Nhập Email nhận thông báo khi @x lần retry thất bại";
            await this.clearTextByXpath(emailRetryInput);
            await this.enterTextByXpath(emailRetryInput, techEmail);
        }

        const genEncryptKeyButtonPath = "(//button[contains(text(), 'Tạo mã')])[1]"
        await this.clickByXpath(genEncryptKeyButtonPath)
        await this.waitLoadingStale();

        const genSecretKeyButtonPath = "(//button[contains(text(), 'Tạo mã')])[2]"
        await this.clickByXpath(genSecretKeyButtonPath)
        await this.waitLoadingStale();
    }

    async enterIPListData(ipData) {
        await this.clickByXpath("(//button[contains(span, 'Thêm mới')])[3]");
        await this.enterTextByXpath("//input[contains(@data-placeholder, 'Nhập Whitelist Ip')]", ipData);
        await this.clickByXpath("//button[contains(span, 'Lưu')]");
    }

    async navigateMerchantDetail(mcPrefix) {
        //Search merchant by id 
        await this.enterTextByXpath("//input[contains(@placeholder, 'Số CIF| Mã Đối tác | Tên đối tác')]", mcPrefix);
        await this.clickByXpath("//button[contains(text(), 'Tìm kiếm')]")
        await this.waitLoadingStale();

        // Get the first row
        const firstRow = await driver.findElement(By.css('tbody > tr'));

        // Click on the first row
        await firstRow.click();
    }

    async sendApproveRequest() {
        await this.clickByXpath("//button[contains(span, 'Gửi duyệt')]");
        await this.clickByXpath("//button[contains(span, 'Xác nhận')]");
        await this.waitLoadingStale();
    }

    async approveMerchant() {
        await this.clickByXpath("//button[contains(span, 'Duyệt')]");
        await this.clickByXpath("//button[contains(span, 'Xác nhận')]");
        await this.waitLoadingStale();
    }

    async deleteMerchant() {
        await this.clickByXpath("//button[contains(span, 'Xóa')]");
        await this.clickByXpath("//button[contains(span, 'Xác nhận')]");
        await this.waitLoadingStale();
    }

    async rejectMerchant(rejectMessage) {
        await this.clickByXpath("//button[contains(span, 'Từ chối')]");
        await this.enterTextByXpath("//textarea[contains(@placeholder, 'Nhập lý do từ chối')]", rejectMessage)
        await this.clickByXpath("//button[contains(span, 'Xác nhận')]");
        await this.waitLoadingStale();
    }
}
module.exports = new MerchantPage();