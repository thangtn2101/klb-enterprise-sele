const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


async function login(){
    
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--disable-web-security");
    // launch broswer 
    //let driver = await new Builder().forBrowser("chrome").build();

    let driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();


    try {


    // open appilication 
    await driver.get('https://cms-web-flex-staging.kienlongbank.co/');

    // Maximize the browser window to make it full-screen
    await driver.manage().window().maximize();


    //await new Promise(resolve => setTimeout(resolve, 5000));
    

    var usernameInput = driver.wait(until.elementLocated(By.id('username')), 10000);

    await usernameInput.sendKeys('343366');

    //await driver.findElement(By.id('username')).sendKeys('343366');
    await driver.findElement(By.id('password')).sendKeys('Klb123@', Key.RETURN);

    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    await driver.findElement(By.xpath("//a[contains(text(),'Quản lý đối tác')]")).click();

    await new Promise(resolve => setTimeout(resolve, 1000));

    await driver.findElement(By.xpath("//a[@href='#/quan-ly-doi-tac/quan-ly-merchant']")).click();

    var addMerchantButton = driver.wait(until.elementLocated(By.xpath("//span[contains(text(),'Thêm mới')]")), 10000);
    addMerchantButton.click();

    await new Promise(resolve => setTimeout(resolve, 5000));

    } finally {
        await driver.quit();
    }



 


}

// Call the login function to start the script
login().catch(error => console.error(error));