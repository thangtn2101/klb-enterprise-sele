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

    // var tabBar7 = driver.wait(until.elementLocated(By.xpath('/html/body/app-dashboard/div/app-sidebar/app-sidebar-nav/app-sidebar-nav-items/app-sidebar-nav-dropdown[7]/a')), 10000);
    // tabBar7.click();
    
    await driver.findElement(By.xpath('/html/body/app-dashboard/div/app-sidebar/app-sidebar-nav/app-sidebar-nav-items/app-sidebar-nav-dropdown[7]/a')).click();


    var merchantBar = driver.wait(until.elementLocated(By.xpath('/html/body/app-dashboard/div/app-sidebar/app-sidebar-nav/app-sidebar-nav-items/app-sidebar-nav-dropdown[7]/app-sidebar-nav-items/app-sidebar-nav-link[1]')), 10000);
    merchantBar.click();

    } finally {
        await driver.quit();
    }



 


}

// Call the login function to start the script
login().catch(error => console.error(error));