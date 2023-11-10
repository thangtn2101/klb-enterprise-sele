const { By, Key, until } = require("selenium-webdriver");
const assert = require("assert");


class FeePage {
    constructor(driver) {
        this.driver = driver;
    }

    async navigate() {
        await this.driver.get(config.host + '#/quan-ly-doi-tac/thiet-lap-bieu-phi');
        const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
        const loadingElement = await this.driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
        await this.driver.wait(until.stalenessOf(loadingElement), 10000);

    }

    async createFee(serviceType, feeName, vat, feeRule,) {

        //div[contains(span,'Loại dịch vụ')]
        //input[contains(@placeholder, 'Nhập Mã Đối tác')]
        //input[contains(@placeholder, 'Nhập Mã Đối tác')]

        //mat-option[contains(span, 'Thu hộ')]
        //mat-option[contains(span, 'Chi hộ nội bộ')]
        //mat-option[contains(span, 'Chi hộ liên ngân hàng')]


    }
}


module.exports = FeePage;
