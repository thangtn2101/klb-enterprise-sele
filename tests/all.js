const { Builder, By, Key, until, wait } = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

const assert = require("assert");

const config = require('../utils/config.js');

const data = require('../test_data/company_data.json');


async function login() {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--disable-web-security");

    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    try {
        // Open appilication 
        await driver.get(config.host);

        // Maximize the browser window to make it full-screen
        await driver.manage().window().maximize();

        
        
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
        var uniReferral = await driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='HOI SO NH KIEN LONG']")), 10000);
        await uniReferral.click();

        //Chọn loại hình doanh nghiệp 
        await driver.findElement(By.id('mat-select-6')).click();
        //Chọn giá trị công ty 
        const bussinessTypeValue = data.type

        var bussinessType = driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='" + bussinessTypeValue + "']")), 10000);
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
        await contactEmail.sendKeys("thangtn123@unicloud.com.vn");

        //Uncheck white list 
        await driver.findElement(By.id('mat-checkbox-1')).click();

        //Click create 
        await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/div/button')).click();


        /* ------------------------ TẠO USER THÀNH CÔNG ----------------- */
        await new Promise(resolve => setTimeout(resolve, 2000));

        const typeValues = [
            "//span[@class='mat-option-text'][normalize-space()='TK chuyên chi']",
            "//span[normalize-space()='TK chuyên thu']",
            "//span[normalize-space()='TK thu phí']"
        ];

        for (const typeValue of typeValues) {
            //Nhấn button "Thêm mới"
            let addAccountBTPath;
            if (typeValue === typeValues[0]) {
                addAccountBTPath = "//button[@class='mat-btn-add success mr-0 px-3 py-1 p-button p-component ng-star-inserted']//span[contains(text(),'Thêm mới')]"
            }
            else {
                addAccountBTPath = '//*[@id="cdk-step-content-0-1"]/div[1]/app-thong-tin-tai-khoan/section/main/div[1]/app-new-account/div/button'
            }
            const addAccount = await driver.wait(until.elementLocated(By.xpath(addAccountBTPath)), 10000);
            await driver.wait(until.elementIsVisible(addAccount), 3000);
            await driver.wait(until.elementIsEnabled(addAccount), 3000);
            await addAccount.click();

            await new Promise(resolve => setTimeout(resolve, 2000));

            //Nhấn vào dropdown Chọn lọai TK 
            let accountTypeDropPath;
            if (typeValue === typeValues[2]) {
                accountTypeDropPath = "//div[normalize-space()='TK chuyên thu']"
            } else {
                accountTypeDropPath = "//div[normalize-space()='Loại tài khoản']"
            }
            const accountTypeDropComponent = await driver.wait(until.elementLocated(By.xpath(accountTypeDropPath)), 7000);

            await driver.wait(until.elementIsVisible(accountTypeDropComponent), 3000);
            await driver.wait(until.elementIsEnabled(accountTypeDropComponent), 3000);
            await accountTypeDropComponent.click();

            //Chọn tài khoản chuyen chi {Động}
            const addAccountTypeValue1 = await driver.wait(until.elementLocated(By.xpath(typeValue)), 5000);
            await addAccountTypeValue1.click();

            if (typeValue !== typeValues[2]) {
                // Chọn Tài khoản 
                const accountNumDropPath = "//div[normalize-space()='Số tài khoản']"
                const addAccountNum = await driver.wait(until.elementLocated(By.xpath(accountNumDropPath)), 5000);

                await driver.wait(until.elementIsVisible(addAccountNum), 3000);
                await driver.wait(until.elementIsEnabled(addAccountNum), 3000);
                await addAccountNum.click();

                //Chọn tài khoản chuyen chi - 6788889
                const accountNo = '6788889'
                const addAccountNumValue = await driver.wait(until.elementLocated(By.xpath("//span[normalize-space()='" + accountNo + "']")), 5000);
                await addAccountNumValue.click();
            }


            //Đợi Tài khoản hợp lệ 
            const contentPath = "//div[normalize-space()='Tên tài khoản']//input"
            const accountOwner = await driver.findElement(By.xpath(contentPath));

            const desiredValue = "AAAAAaaabbbcccdddeeeff";
            const isValueSet = await waitForInputValue(accountOwner, desiredValue, 10000);
            if (isValueSet) {
                //Nhấn lưu 
                await driver.findElement(By.xpath("//span[contains(text(),'Lưu')]")).click();
            } else {
                throw new Error("Timeout: Desired value is not set in the input within the specified timeout.");
            }
        }

        await new Promise(resolve => setTimeout(resolve, 2000));

        var continueButton = await driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-1"]/div[2]/button[2]')), 1000);
        await driver.wait(until.elementIsEnabled(continueButton), 1000);
        await driver.wait(until.elementIsVisible(continueButton), 1000);
        await continueButton.click();


        //BY PASS STEP 3 
        var continueButton2 = await driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-2"]/div/button[2]')), 1000);
        await driver.wait(until.elementIsEnabled(continueButton2), 1000);
        await driver.wait(until.elementIsVisible(continueButton2), 1000);
        await continueButton2.click();

        //STEP 4 BẮT ĐẦU Ở ĐÂY
        //Upload Giấy phép kinh doanh
        const uploadBusinessLicenseButtonPath = '//*[@id="BUSINESS_REGISTRATION"]'
        var uploadBusinessLicenseButton = await driver.wait(until.elementLocated(By.xpath(uploadBusinessLicenseButtonPath)), 1000);
        await driver.wait(until.elementIsEnabled(uploadBusinessLicenseButton), 1000);
        await uploadBusinessLicenseButton.sendKeys('/home/unicloud/Documents/PDF example/Size_8.9MB.pdf')



        //Upload Hợp đồng
        const uploadBusinessContractButtonPath = '//*[@id="CONTRACT"]'
        var uploadBusinessContractButton = await driver.wait(until.elementLocated(By.xpath(uploadBusinessContractButtonPath)), 1000);
        await driver.wait(until.elementIsEnabled(uploadBusinessContractButton), 1000);
        await uploadBusinessContractButton.sendKeys('/home/unicloud/Documents/PDF example/Size_8.9MB.pdf')

        
        await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);

        //Upload Giấy chứng nhận đại diện hợp pháp
        const uploadLegalContractButtonPath = '//*[@id="LEGAL_DOCS"]'
        var uploadLegalContractButton = await driver.wait(until.elementLocated(By.xpath(uploadLegalContractButtonPath)), 1000);
        await driver.wait(until.elementIsEnabled(uploadLegalContractButton), 1000);
        await uploadLegalContractButton.sendKeys('/home/unicloud/Documents/PDF example/Size_8.9MB.pdf')

        await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);

        //Upload GTTT mặt trước
        const uploadFrontIDButtonPath = '//*[@id="logo"]'
        var uploadFrontIDButton = await driver.wait(until.elementLocated(By.xpath(uploadFrontIDButtonPath)), 1000);
        await driver.wait(until.elementIsEnabled(uploadFrontIDButton), 1000);
        await uploadFrontIDButton.sendKeys('/home/unicloud/Pictures/backcground.jpg')

        await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);

        //Upload GTTT mặt sau
        const uploadBackIDButtonPath = '//*[@id="logo2"]'
        var uploadBackIDButton = await driver.wait(until.elementLocated(By.xpath(uploadBackIDButtonPath)), 1000);
        await driver.wait(until.elementIsEnabled(uploadBackIDButton), 1000);
        await uploadBackIDButton.sendKeys('/home/unicloud/Pictures/doggie_corgi-1280x600.jpg')

        await driver.wait(until.elementLocated(By.xpath('//p-toastitem')), 5000);

        //Nhấn tiếp tục
        var continueButton3 = await driver.wait(until.elementLocated(By.xpath('//*[@id="cdk-step-content-0-3"]/div[2]/button[2]')), 1000);
        await driver.wait(until.elementIsEnabled(continueButton3), 1000);
        await driver.wait(until.elementIsVisible(continueButton3), 1000);
        await new Promise(resolve => setTimeout(resolve, 5000));

        await continueButton3.click();



        //STEP 5 BẮT ĐẦU Ở ĐÂY 
        const urlHostInput = await driver.findElement(By.id('mat-input-16'));
        await driver.wait(until.elementIsEnabled(urlHostInput), 2000);
        await driver.wait(until.elementIsVisible(urlHostInput), 2000);
        await urlHostInput.sendKeys("https://www.youtube.com/?app=desktop&hl=vi&gl=VN");

        const retryInput = await driver.findElement(By.id('mat-input-18'));
        await retryInput.sendKeys("101");

        const genEKeyButtonPath = '//*[@id="cdk-step-content-0-4"]/div/app-form-tich-hop/form/div[2]/div[6]/div/mat-form-field/div/div[1]/div/button'
        var genEKeyButton = await driver.wait(until.elementLocated(By.xpath(genEKeyButtonPath)), 1000);
        await driver.wait(until.elementIsEnabled(genEKeyButton), 1000);
        await driver.wait(until.elementIsVisible(genEKeyButton), 1000);
        await genEKeyButton.click();

        await new Promise(resolve => setTimeout(resolve, 1000));

        const genSKeyButtonPath = '//*[@id="cdk-step-content-0-4"]/div/app-form-tich-hop/form/div[2]/div[8]/div/mat-form-field/div/div[1]/div/button'
        var genSKeyButton = await driver.wait(until.elementLocated(By.xpath(genSKeyButtonPath)), 1000);
        await driver.wait(until.elementIsEnabled(genSKeyButton), 1000);
        await driver.wait(until.elementIsVisible(genSKeyButton), 1000);
        await genSKeyButton.click();
        await new Promise(resolve => setTimeout(resolve, 2000));

        await driver.findElement(By.id('mat-input-17'))
            .getAttribute('value').then(textValue => {
                assert.notEqual('', textValue);
            });


        await driver.findElement(By.id('mat-input-19'))
            .getAttribute('value').then(textValue => {
                assert.notEqual('', textValue);
            });

        //Nhấn lưu 
        await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-4"]/div/app-form-tich-hop/div[2]/button')).click();


        const deleteMCButtonPath = '//*[@id="mat-tab-content-0-0"]/div/app-khai-bao-merchant/app-footer-merchant/footer/div[2]/button[1]'
        var deleteMCButton = await driver.wait(until.elementLocated(By.xpath(deleteMCButtonPath)), 5000);
        await driver.wait(until.elementIsEnabled(deleteMCButton), 1000);
        await driver.wait(until.elementIsVisible(deleteMCButton), 1000);
        await deleteMCButton.click();

        const confirmDeleteMCButtonPath = '//*[@id="mat-tab-content-0-0"]/div/app-khai-bao-merchant/app-footer-merchant/p-dialog/div/div/div[3]/div/button[2]'
        var confirmDeleteMCButton = await driver.wait(until.elementLocated(By.xpath(confirmDeleteMCButtonPath)), 5000);
        await driver.wait(until.elementIsEnabled(confirmDeleteMCButton), 1000);
        await driver.wait(until.elementIsVisible(confirmDeleteMCButton), 1000);
        await confirmDeleteMCButton.click();

        await new Promise(resolve => setTimeout(resolve, 15000));

        


    } catch (e) {
        console.log(e);
    } finally {
        await driver.quit();
    }






}

// Call the login function to start the script
login().catch(error => console.error(error));



