const { Builder} = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

const config = require('../utils/config.js');


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

// Function to initialize the WebDriver with custom options and navigate to a URL
async function initializeChromeDriver() {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--disable-web-security");
  
    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
  
    // Open application using the uatHostURL from config
    await driver.get(config.host);
  
    // Make it full-screen
    await driver.manage().window().maximize();
    console.log('runokie');

    return driver; // Return the initialized driver
  }

  module.exports = {
    initializeChromeDriver,
    waitForInputValue
  };