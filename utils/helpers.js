const { Builder } = require("selenium-webdriver");

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

  return driver; // Return the initialized driver
}

async function getToken() {
  try {
    const loginData = {
      password: 'Klb123@',
      username: '343366'
    };

    const response = await fetch('https://api-flex-staging.kienlongbank.co/paygate/api/auth/v1/cms/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        // Add other headers as needed
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data.token) {
        return data.data.token;
      }
    }
    throw new Error('Token not received in the response.');

  } catch (error) {
    throw new Error(error);
  }
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

async function checkUsernameAvailability(username) {
  try {
    const token = await getToken();

    const apiURL = 'https://api-flex-staging.kienlongbank.co/paygate/api/user/v1/cms/checkPortal?portalNumber=' + username;

    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'accept': 'application/json, text/plain, */*',
        'authorization': 'Bearer ' + token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data) {
        return data.data.existed;
      }
    }
    throw new Error('Cannot check Username Availability');
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  initializeChromeDriver,
  waitForInputValue,
  checkUsernameAvailability,
  generateRandomString
};