const { By, Key, until } = require("selenium-webdriver");

const assert = require("assert");

const config = require('../utils/config.js');

const helper = require('../utils/helpers.js');

class FeePage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigate() {
        await this.driver.get(config.host + '#/quan-ly-doi-tac/thiet-lap-bieu-phi');
    }

    async createFee(feeType, vat, feeMethod, feeRule, value) {
        //Click on button "Thêm mới"
        const addFeeBTPath = "//button[contains(span, 'Thêm mới')]";
        const addFeeBT = await this.driver.wait(until.elementLocated(By.xpath(addFeeBTPath)), 5000);
        await this.driver.wait(until.elementIsVisible(addFeeBT), 5000);
        await this.driver.wait(until.elementIsEnabled(addFeeBT), 5000);
        await addFeeBT.click();

        //Click on dropdown fee type 
        const feeTypeDropPath = "//div[contains(span,'Loại dịch vụ')]";
        const feeTypeDropComponent = await this.driver.wait(until.elementLocated(By.xpath(feeTypeDropPath)), 7000);
        await this.driver.wait(until.elementIsVisible(feeTypeDropComponent), 3000);
        await this.driver.wait(until.elementIsEnabled(feeTypeDropComponent), 3000);
        await feeTypeDropComponent.click();
        //Select value of fee type 
        const feeTypeValuePath = "//mat-option[contains(span, '" + feeType + "')]"
        const feeTypeValueBT = await this.driver.wait(until.elementLocated(By.xpath(feeTypeValuePath)), 5000);
        await feeTypeValueBT.click();

        //Generate Fee code 
        let isFeeCodeExisted = true;
        let feeCode;

        while (isFeeCodeExisted) {
            feeCode = "AUTO_" + helper.generateRandomString(6);
            const feesResult = await helper.getAllFeeBy(feeCode);
            if (feesResult.length === 0) {
                isFeeCodeExisted = false;
            }
        }

        //Fill in fee code input 
        const feeCodeInputPath = "//input[contains(@data-placeholder, 'Nhập Mã phí')]"
        const feeCodeInput = await this.driver.findElement(By.xpath(feeCodeInputPath));
        await this.driver.wait(until.elementIsEnabled(feeCodeInput), 2000);
        await this.driver.wait(until.elementIsVisible(feeCodeInput), 2000);
        await feeCodeInput.sendKeys(feeCode);

        //Generate fee name 
        let isFeeNameExisted = true;
        let feeName;

        while (isFeeNameExisted) {
            feeName = "[AUTO-TEST] " + helper.generateCompanyName();
            const feesResult = await helper.getAllFeeBy(null, feeName);
            if (feesResult.length === 0) {
                isFeeNameExisted = false;
            }
        }
        const feeNameInputPath = "//input[contains(@data-placeholder, 'Nhập Tên phí')]"
        const feeNameInput = await this.driver.findElement(By.xpath(feeNameInputPath));
        await this.driver.wait(until.elementIsEnabled(feeNameInput), 2000);
        await this.driver.wait(until.elementIsVisible(feeNameInput), 2000);
        await feeNameInput.sendKeys(feeName);

        const feeVATInputPath = "//input[contains(@data-placeholder, 'Nhập % VAT')]"
        const feeVATInput = await this.driver.findElement(By.xpath(feeVATInputPath));
        await this.driver.wait(until.elementIsEnabled(feeVATInput), 2000);
        await this.driver.wait(until.elementIsVisible(feeVATInput), 2000);
        await feeVATInput.sendKeys(vat);



        //Click on dropdown fee rule dropdown  
        const feeMethodDropPath = "//div[contains(span,'Phương pháp tính phí')]";
        const feeMethodDropComponent = await this.driver.wait(until.elementLocated(By.xpath(feeMethodDropPath)), 7000);
        await this.driver.wait(until.elementIsVisible(feeMethodDropComponent), 3000);
        await this.driver.wait(until.elementIsEnabled(feeMethodDropComponent), 3000);
        await feeMethodDropComponent.click();

        //Select fee method value
        const feeMethodValuePath = "//mat-option[contains(span, '" + feeMethod + "')]"
        const feeMethodValueBT = await this.driver.wait(until.elementLocated(By.xpath(feeMethodValuePath)), 5000);
        await feeMethodValueBT.click();

        if(feeMethod !== "Miễn phí"){
        //Select Fee Mechanism
        const feeMechanismDropPath = "//div[contains(span,'Áp dụng tính theo')]";
        const feeMechanismDropComponent = await this.driver.wait(until.elementLocated(By.xpath(feeMechanismDropPath)), 7000);
        await this.driver.wait(until.elementIsVisible(feeMechanismDropComponent), 3000);
        await this.driver.wait(until.elementIsEnabled(feeMechanismDropComponent), 3000);
        await feeMechanismDropComponent.click();
        const feeMechanismValuePath = "//mat-option[contains(span, 'Theo từng giao dịch')]"
        const feeMechanismValueBT = await this.driver.wait(until.elementLocated(By.xpath(feeMechanismValuePath)), 5000);
        await feeMechanismValueBT.click();
        }

        if (feeMethod === "Phí cố định") {
            //Click on dropdown fee rule dropdown  
            const feeRuleDropPath = "//div[contains(span,'Quy tắc tính phí')]";
            const feeRuleDropComponent = await this.driver.wait(until.elementLocated(By.xpath(feeRuleDropPath)), 7000);
            await this.driver.wait(until.elementIsVisible(feeRuleDropComponent), 3000);
            await this.driver.wait(until.elementIsEnabled(feeRuleDropComponent), 3000);
            await feeRuleDropComponent.click();

            //Select fee method value
            const feeRuleValuePath = "//mat-option[contains(span, '" + feeRule + "')]"
            const feeRuleValueBT = await this.driver.wait(until.elementLocated(By.xpath(feeRuleValuePath)), 5000);
            await feeRuleValueBT.click();
            let feeVATInputPath
            if (feeRule === 'Số tiền phí cố định') {
                feeVATInputPath = "//input[contains(@data-placeholder, 'Nhập Số tiền phí')]"
            }
            if (feeRule === 'Số tiền phí theo tỷ lệ %') {
                feeVATInputPath = "//input[contains(@data-placeholder, 'Nhập Tỷ lệ (%) phí')]"
            }

            const valueInput = await this.driver.findElement(By.xpath(feeVATInputPath));
            await this.driver.wait(until.elementIsEnabled(valueInput), 2000);
            await this.driver.wait(until.elementIsVisible(valueInput), 2000);
            await valueInput.sendKeys(value);
        }

        if (feeMethod === "Phí lũy tiến") {

        }
        await this.driver.findElement(By.xpath("//span[contains(text(),'Lưu')]")).click();
        await helper.waitLoadingStale(this.driver);
    }

    async approveFee(){
        const approveButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Duyệt')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(approveButton), 1000);
        await approveButton.click();

        const confirmButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(span, 'Xác nhận')]")), 1000);
        await this.driver.wait(until.elementIsEnabled(confirmButton), 1000);
        await confirmButton.click();
        await helper.waitLoadingStale(this.driver);
    }

    async rejectFee() {
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


module.exports = FeePage;
