const { Builder, By, Key, until, wait } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


async function waitForInputValue(accountOwner, expectedValue, timeout) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const inputValue = await accountOwner.getAttribute('value');
        if (inputValue === expectedValue) {
            return true;
        }
        // Sleep for a short duration before checking again
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    return false; // Return false if the timeout is reached
}


async function login() {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--disable-web-security");

    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    try {
        // open appilication 
        await driver.get('https://cms-web-flex-staging.kienlongbank.co/');

        // Maximize the browser window to make it full-screen
        await driver.manage().window().maximize();

        const usernameValue = "343366";
        const passwordValue = "Klb123@";

        var usernameInput = driver.wait(until.elementLocated(By.id('username')), 10000);
        await usernameInput.sendKeys(usernameValue);

        await driver.findElement(By.id('password')).sendKeys(passwordValue, Key.RETURN);

        await new Promise(resolve => setTimeout(resolve, 1000));
        var merchantBar = await driver.wait(until.elementLocated(By.xpath("//a[contains(text(),'Quản lý đối tác')]")), 10000);
        await merchantBar.click();

        await new Promise(resolve => setTimeout(resolve, 1000));

        await driver.findElement(By.xpath("//a[@href='#/quan-ly-doi-tac/quan-ly-merchant']")).click();

        var addMerchantButton = await driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Thêm mới')]")), 10000);
        await addMerchantButton.click();

        //Mã giới thiệu 
        const referralDropdownPath = 'mat-select-4';
        var referralDropdown = await driver.wait(until.elementLocated(By.id(referralDropdownPath)), 10000);
        await referralDropdown.click();
        //Chọn giá trị mã giới thiệu 
        var uniReferral = await driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='UNICLOUD']")), 10000);
        await uniReferral.click();

        //Chọn loại hình doanh nghiệp 
        const bussinessTypePath = "mat-select-6"
        await driver.findElement(By.id(bussinessTypePath)).click();
        //Chọn giá trị công ty 
        var bussinessType = driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='Công ty']")), 10000);
        bussinessType.click();

        //Nhập Cif 
        await driver.findElement(By.id('mat-input-2')).sendKeys('001281197');

        //Nhan nut tim kiem cif 
        const cifCheckButtonPath = "/html[1]/body[1]/app-dashboard[1]/div[1]/main[1]/div[2]/app-content-layout[1]/div[1]/div[1]/app-form-merchant[1]/div[2]/mat-horizontal-stepper[1]/div[2]/div[1]/form[1]/div[1]/div[6]/mat-form-field[1]/div[1]/div[1]/div[1]/button[1]"
        await driver.findElement(By.xpath(cifCheckButtonPath)).click();

        //Đợi CIf hợp lệ 
        const contentPath = "//div[8]//div[2]"
        const divElement = await driver.findElement(By.xpath(contentPath));
        // Wait for the content of the div to change
        await driver.wait(until.elementTextContains(divElement, "4201867960"), 10000);

        // Nhấn dropdown hạn mức 
        const limitPackagePath = "mat-select-8"
        const limitPackage = await driver.findElement(By.id(limitPackagePath));
        await limitPackage.click();
        //Chọn hạn mức simple
        var simplePackage = await driver.wait(until.elementLocated(By.id("mat-option-14")), 10000);
        await simplePackage.click();


        //Nhấn dropdown Loại thu phí 
        const chargeTypePath = 'mat-select-12';
        const thuphi = await driver.findElement(By.id(chargeTypePath));
        await driver.wait(until.elementIsVisible(thuphi), 3000);
        await thuphi.click();
        //Chọn giá trị thu ngay
        var valueFeechargeType = await driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='Thu ngay']")), 10000);
        await valueFeechargeType.click();


        //Nhập username mới
        var timestamp = new Date().getTime();
        var username = "thang_" + timestamp;
        const usernameMC = await driver.findElement(By.id('mat-input-3'));
        await usernameMC.clear();
        await usernameMC.sendKeys(username);

        //Nhập thông tin người đại diện 

        const repesentName = await driver.findElement(By.id('mat-input-4'));
        await repesentName.sendKeys("Trần Giang Thiếu Anh");

        const repesentDoB = await driver.findElement(By.id('mat-input-5'));
        await repesentDoB.sendKeys("12/12/2011");

        //Giới tính
        const sexRadio = await driver.findElement(By.id('mat-radio-2'));
        await driver.wait(until.elementIsVisible(sexRadio), 3000);
        await sexRadio.click();

        const contryId = "mat-select-value-15"
        await driver.findElement(By.id(contryId)).click();
        //Chọn Việt Nam
        await driver.findElement(By.xpath("//span[@class='mat-option-text']")).click();


        const identification = await driver.findElement(By.id('mat-input-6'));
        await identification.sendKeys("123456789");


        const identificationType = "mat-select-value-17"
        await driver.findElement(By.id(identificationType)).click();
        //Chọn CMND
        var identificationValue = driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='CMND']")), 10000);
        await identificationValue.click();

        const issuanceDate = await driver.findElement(By.id('mat-input-7'));
        await issuanceDate.sendKeys("12/12/2011");

        const issuancePlace = await driver.findElement(By.id('mat-input-8'));
        await issuancePlace.sendKeys("Cục cảnh sát quản lý hành chính về trật tự xã hội");

        const positionPath = "mat-select-18"
        await driver.findElement(By.id(positionPath)).click();
        //Chọn Chủ tịch hội đồng quản trị
        await driver.findElement(By.xpath("//span[contains(text(),'Chủ tịch Hội đồng quản trị')]")).click();


        //Điền thông tin người liên hệ 
        //Tên
        const contactName = await driver.findElement(By.id('mat-input-9'));
        await contactName.click();
        await contactName.clear();
        await contactName.sendKeys("Trần Giang Thiếu Anh");

        //SDT
        const contactPhone = await driver.findElement(By.id('mat-input-10'));
        await contactPhone.click();
        await contactPhone.clear();
        await contactPhone.sendKeys("0798354561");

        //Email
        const contactEmail = await driver.findElement(By.id('mat-input-11'));
        await contactEmail.click();
        await contactEmail.clear();
        await contactEmail.sendKeys("thangtn@unicloud.com.vn");

        //Uncheck white list 
        await driver.findElement(By.id('mat-checkbox-1')).click();

        //Click create 
        await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/div/button')).click();


        /* ------------------------ TẠO USER THÀNH CÔNG ----------------- */
        await new Promise(resolve => setTimeout(resolve, 2000));

        const addAccountBTPath = "//button[@class='mat-btn-add success mr-0 px-3 py-1 p-button p-component ng-star-inserted']//span[contains(text(),'Thêm mới')]"
        const addAccount = await driver.wait(until.elementLocated(By.xpath(addAccountBTPath)), 10000);
        await driver.wait(until.elementIsVisible(addAccount), 3000);
        await driver.wait(until.elementIsEnabled(addAccount), 3000);
        await addAccount.click();
        await new Promise(resolve => setTimeout(resolve, 2000));

        //Chọn lọai TK 
        const addAccountType1 = findElement(By.id('mat-select-22'));
        await driver.wait(until.elementLocated(addAccountType1), 10000)
        await driver.wait(until.elementIsVisible(addAccountType1), 3000);
        await driver.wait(until.elementIsEnabled(addAccountType1), 3000);

        await addAccountType1.click();

        //Chọn tài khoản chuyen chi - 184
        const addAccountTypeValue1 = await driver.wait(until.elementLocated(By.id('mat-option-184')), 10000);
        await addAccountTypeValue1.click();

        //tài khoan chuyen thu -  mat-option-189
        // tài khoản chuyen thu phi mat-option-190

        // Chọn Tài khoản 
        const addAccountNum = await driver.wait(until.elementLocated(By.id('mat-select-24')), 10000);
        await driver.wait(until.elementIsVisible(addAccountNum), 3000);
        await driver.wait(until.elementIsEnabled(addAccountNum), 3000);
        await addAccountNum.click();
        //Chọn tài khoản chuyen chi - 188
        const addAccountNumValue = await driver.wait(until.elementLocated(By.id('mat-option-187')), 10000);
        await addAccountNumValue.click();

        //Đợi Tài khoản hợp lệ 
        const contentID = "mat-input-21"
        const accountOwner = await driver.findElement(By.id(contentID));

        const desiredValue = "AAAAAaaabbbcccdddeeeff";


        const isValueSet = await waitForInputValue(accountOwner, desiredValue, 10000);

        if (isValueSet) {
            //Nhấn lưu 
            await driver.findElement(By.id('cancelVideoCall')).click();
        } else {
            console.log("Timeout: Desired value is not set in the input within the specified timeout.");
        }




        await new Promise(resolve => setTimeout(resolve, 15000));

    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }






}

// Call the login function to start the script
login().catch(error => console.error(error));