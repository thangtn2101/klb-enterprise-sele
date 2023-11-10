const { By, until, Key } = require("selenium-webdriver");

const config = require('../utils/config.js');

const helper = require('../utils/helpers.js');

const assert = require("assert");



class MerchantPage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigate() {
        await this.driver.get(config.host + '#/quan-ly-doi-tac/quan-ly-merchant');
        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);

    }

    //step 1 
    async createMCProfile(merchantType, affiliate, merchantCif, merchantNameValue, limitPackageValue, businessType, chargeTypeValue, repesentName, repesentDoB, sex, representEmail, isWhiteList) {
        //Find button add
        var addMerchantButton = await this.driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Thêm mới')]")), 10000);
        await addMerchantButton.click();

        //Mã giới thiệu 
        var referralDropdown = await this.driver.wait(until.elementLocated(By.id('mat-select-4')), 10000);
        await referralDropdown.click();

        //Chọn giá trị mã giới thiệu 
        var uniReferral = await this.driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='" + affiliate + "']")), 10000);
        await uniReferral.click();

        //Chọn loại hình doanh nghiệp 
        await this.driver.findElement(By.id('mat-select-6')).click();

        var bussinessType = this.driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='" + merchantType + "']")), 10000);
        bussinessType.click();

        //Nhập Cif 
        await this.driver.findElement(By.id('mat-input-2')).sendKeys(merchantCif);

        //Nhấn nút tìm kiếm thông tin Cif 
        const cifCheckButtonPath = "/html[1]/body[1]/app-dashboard[1]/div[1]/main[1]/div[2]/app-content-layout[1]/div[1]/div[1]/app-form-merchant[1]/div[2]/mat-horizontal-stepper[1]/div[2]/div[1]/form[1]/div[1]/div[6]/mat-form-field[1]/div[1]/div[1]/div[1]/button[1]"
        await this.driver.findElement(By.xpath(cifCheckButtonPath)).click();

        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);


        //Đợi CIf hợp lệ 
        const mcInfoPath = "//div[8]//div[2]"
        const mcInfoElement = await this.driver.findElement(By.xpath(mcInfoPath));

        const mcInfoEText = await mcInfoElement.getText();

        const defaultNullValue = "---"

        assert.notEqual(mcInfoEText, defaultNullValue);

        //Thay đổi tên công ty
        const merchantNamePath = "mat-input-1"
        const merchantNameElement = await this.driver.findElement(By.id(merchantNamePath));
        await merchantNameElement.click();
        await merchantNameElement.clear();
        await merchantNameElement.sendKeys(merchantNameValue);

        // Nhấn dropdown hạn mức 
        const limitPackagePath = "mat-select-8"
        const limitPackageElement = await this.driver.findElement(By.id(limitPackagePath));
        await limitPackageElement.click();

        //Chọn giá trị hạn mức 
        var limitPackage = await this.driver.wait(until.elementLocated(By.id(limitPackageValue)), 10000);
        await this.driver.wait(until.elementIsVisible(limitPackage), 3000);
        await this.driver.wait(until.elementIsEnabled(limitPackage), 3000);
        await limitPackage.click();

        //Nhấn dropdown Loại thu phí 
        const chargeTypePath = 'mat-select-12';
        const chargeTypeEle = await this.driver.findElement(By.id(chargeTypePath));
        await this.driver.wait(until.elementIsVisible(chargeTypeEle), 3000);
        await chargeTypeEle.click();

        //Chọn giá trị loại thu phí
        var valueFeeChargeType = await this.driver.wait(until.elementLocated(By.id(chargeTypeValue)), 10000);
        await valueFeeChargeType.click();

        //Chọn loại hình kinh doanh
        const businessCatePath = 'mat-select-10';
        const businessCateEle = await this.driver.findElement(By.id(businessCatePath));
        await this.driver.wait(until.elementIsVisible(businessCateEle), 3000);
        await businessCateEle.click();

        //Chọn giá trị loại hình kinh doanh
        var businessCateValue = await this.driver.wait(until.elementLocated(By.id(businessType)), 10000);
        await businessCateValue.click();



        //Nhập username mới
        let isExisted = true;
        let username;

        while (isExisted) {
            let randomString = helper.generateRandomString(5);
            username = "MC_" + randomString;
            isExisted = await helper.checkUsernameAvailability(username);
        }
        const usernameMC = await this.driver.findElement(By.id('mat-input-3'));
        await usernameMC.click();
        await usernameMC.clear();
        await usernameMC.sendKeys(username);


        //Nhập thông tin người đại diện 
        const repesentNameEle = await this.driver.findElement(By.id('mat-input-4'));
        await repesentNameEle.click();

        const loadingElement1 = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement1), 10000);

        await repesentNameEle.clear();
        await repesentNameEle.sendKeys("[Đại diện]" + repesentName);

        const repesentDoBEle = await this.driver.findElement(By.id('mat-input-5'));
        await repesentDoBEle.sendKeys(repesentDoB);

        //Giới tính
        const sexRadioEle = await this.driver.findElement(By.id(sex));
        await this.driver.wait(until.elementIsVisible(sexRadioEle), 3000);
        await sexRadioEle.click();

        //Chọn quốc tịch 
        const countryId = "mat-select-value-15"
        await this.driver.findElement(By.id(countryId)).click();
        //Chọn Việt Nam
        await this.driver.findElement(By.xpath("//span[@class='mat-option-text']")).click();

        const identification = await this.driver.findElement(By.id('mat-input-6'));
        await identification.click();
        await identification.clear();
        await identification.sendKeys("123456789");

        const identificationType = "mat-select-value-17"
        await this.driver.findElement(By.id(identificationType)).click();
        //Chọn CMND
        var identificationValue = this.driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='CMND']")), 10000);
        await identificationValue.click();

        const issuanceDate = await this.driver.findElement(By.id('mat-input-7'));
        await issuanceDate.clear();
        await issuanceDate.sendKeys("12/12/2011");

        const issuancePlace = await this.driver.findElement(By.id('mat-input-8'));
        await issuancePlace.click();
        await issuancePlace.clear();
        await issuancePlace.sendKeys("Cục cảnh sát quản lý hành chính về trật tự xã hội");

        const positionPath = "mat-select-18"
        await this.driver.findElement(By.id(positionPath)).click();
        //Chọn Chủ tịch hội đồng quản trị
        await this.driver.findElement(By.xpath("//span[contains(text(),'Chủ tịch Hội đồng quản trị')]")).click();


        //Điền thông tin người liên hệ 
        //Tên
        const contactNameEle = await this.driver.findElement(By.id('mat-input-9'));
        await contactNameEle.click();
        await contactNameEle.clear();
        await contactNameEle.sendKeys("[Đại diện]" + repesentName);

        //SDT
        const contactPhoneEle = await this.driver.findElement(By.id('mat-input-10'));
        await contactPhoneEle.click();
        await contactPhoneEle.clear();
        await contactPhoneEle.sendKeys("0798354561");

        //Email
        const contactEmailEle = await this.driver.findElement(By.id('mat-input-11'));
        await contactEmailEle.click();
        await contactEmailEle.clear();
        await contactEmailEle.sendKeys(representEmail);

        if (isWhiteList === false) {
            //Uncheck white list 
            await this.driver.findElement(By.id('mat-checkbox-1')).click();
        }

        //Find merchant ID
        const mcID = await this.driver.findElement(By.xpath("//input[contains(@placeholder, 'Nhập Mã Đối tác')]")).getAttribute('value');

        //Click create 
        await this.driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/div/button')).click();

        // Return merchant ID 

        return mcID;


    }

    //step 2 
    async addAccountForMC(accountNo) {

        const typeValues = [
            "//span[normalize-space()='TK chuyên chi']",
            "//span[normalize-space()='TK chuyên thu']",
            "//span[normalize-space()='TK thu phí']"
        ];
        for (const typeValue of typeValues) {
            //Nhấn button "Thêm mới"
            const addAccountBTPath = "//button[contains(span, 'Thêm mới')]";
            await new Promise(resolve => setTimeout(resolve, 1000));
            const addAccount = await this.driver.wait(until.elementLocated(By.xpath(addAccountBTPath)), 5000);
            await this.driver.wait(until.elementIsVisible(addAccount), 5000);
            await this.driver.wait(until.elementIsEnabled(addAccount), 5000);
            await addAccount.click();

            const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
            const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
            await this.driver.wait(until.stalenessOf(loadingElement), 10000);

            //Nhấn vào dropdown Chọn lọai TK 
            let accountTypeDropPath = "//div[contains(span,'Loại tài khoản')]";

            const accountTypeDropComponent = await this.driver.wait(until.elementLocated(By.xpath(accountTypeDropPath)), 7000);

            await this.driver.wait(until.elementIsVisible(accountTypeDropComponent), 3000);
            await this.driver.wait(until.elementIsEnabled(accountTypeDropComponent), 3000);
            await accountTypeDropComponent.click();

            //Chọn giá trị loại tài khoản
            const addAccountTypeValue = await this.driver.wait(until.elementLocated(By.xpath(typeValue)), 5000);
            await addAccountTypeValue.click();


            // Chọn Tài khoản 
            const accountNumDropPath = "//div[contains(span,'Số tài khoản')]"
            const addAccountNum = await this.driver.wait(until.elementLocated(By.xpath(accountNumDropPath)), 5000);

            await this.driver.wait(until.elementIsVisible(addAccountNum), 3000);
            await this.driver.wait(until.elementIsEnabled(addAccountNum), 3000);
            await addAccountNum.click();

            const addAccountNumValue = await this.driver.wait(until.elementLocated(By.xpath("//mat-option[contains(span,'" + accountNo + "')]")), 5000);
            await addAccountNumValue.click();

            await this.driver.findElement(By.xpath("//span[contains(text(),'Lưu')]")).click();

            const saveLoadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
            const saveLoadingElement = await this.driver.wait(until.elementLocated(By.xpath(saveLoadingPath)), 10000);
            await this.driver.wait(until.stalenessOf(saveLoadingElement), 10000);

        }

        await new Promise(resolve => setTimeout(resolve, 2000));
        var continueButton = await this.driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-1"]/div[2]/button[2]')), 1000);
        await this.driver.wait(until.elementIsEnabled(continueButton), 1000);
        await this.driver.wait(until.elementIsVisible(continueButton), 1000);
        await continueButton.click();
    }

    async uploadDocument(documentType, imageURL) {
        var uploadButton = await this.driver.wait(until.elementLocated(By.xpath(documentType)), 1000);
        await this.driver.wait(until.elementIsEnabled(uploadButton), 1000);
        await uploadButton.sendKeys(imageURL)
        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);
    }

    async generateIntergration(webhookURL, retryValue) {
        const urlHostInput = await this.driver.findElement(By.id('mat-input-16'));
        await this.driver.wait(until.elementIsEnabled(urlHostInput), 2000);
        await this.driver.wait(until.elementIsVisible(urlHostInput), 2000);
        await urlHostInput.sendKeys(webhookURL);

        const retryInput = await this.driver.findElement(By.id('mat-input-18'));
        await retryInput.sendKeys(retryValue);

        const genEKeyButtonPath = '//*[@id="cdk-step-content-0-4"]/div/app-form-tich-hop/form/div[2]/div[6]/div/mat-form-field/div/div[1]/div/button'
        var genEKeyButton = await this.driver.wait(until.elementLocated(By.xpath(genEKeyButtonPath)), 1000);
        await this.driver.wait(until.elementIsEnabled(genEKeyButton), 1000);
        await this.driver.wait(until.elementIsVisible(genEKeyButton), 1000);
        await genEKeyButton.click();

        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);


        const genSKeyButtonPath = '//*[@id="cdk-step-content-0-4"]/div/app-form-tich-hop/form/div[2]/div[8]/div/mat-form-field/div/div[1]/div/button'
        var genSKeyButton = await this.driver.wait(until.elementLocated(By.xpath(genSKeyButtonPath)), 1000);
        await this.driver.wait(until.elementIsEnabled(genSKeyButton), 1000);
        await this.driver.wait(until.elementIsVisible(genSKeyButton), 1000);
        await genSKeyButton.click();

        const loadingElement1 = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement1), 10000);

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

        const loadingElement2 = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement2), 10000);
    }

    async navigateMerchantDetail(id) {
        this.navigate();

        //Search merchant by id 
        const searchInput = await this.driver.wait(until.elementLocated(By.xpath("//input[contains(@placeholder, 'Số CIF')]")), 10000);
        await this.driver.wait(until.elementIsEnabled(searchInput), 2000);
        await this.driver.wait(until.elementIsVisible(searchInput), 2000);
        await searchInput.sendKeys(id, Key.ENTER);

        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);

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

        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);
    }

    async approveMerchant() {
        const approveButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Duyệt')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(approveButton), 1000);
        await approveButton.click();

        const confirmButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xác nhận')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(confirmButton), 1000);
        await confirmButton.click();

        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);
    }

    async deleteMerchant() {
        const approveButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xóa')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(approveButton), 1000);
        await approveButton.click();

        const confirmButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xác nhận')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(confirmButton), 1000);
        await confirmButton.click();

        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);
    }

    async rejectMerchant() {
        const rejectButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Từ chối')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(rejectButton), 1000);
        await rejectButton.click();

        
        const rejectInput = await this.driver.wait(until.elementLocated(By.xpath("//textarea[contains(@placeholder, 'Nhập lý do từ chối')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(rejectInput), 1000);
        await rejectInput.click();
        await rejectInput.sendKeys("Từ chối tự động");

        const confirmButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xác nhận')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(confirmButton), 1000);
        await confirmButton.click();

        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);
    }
}


module.exports = MerchantPage;
