const { Builder } = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

const config = require('../utils/config.js');

const apiHost = 'https://api-flex-staging.kienlongbank.co/paygate/api'
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

    const response = await fetch(apiHost + '/auth/v1/cms/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data.token) {
        return data.data.token;
      }
    }
    throw new Error('Token not received in the response when response ok.');

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

    const apiURL = apiHost+ '/user/v1/cms/checkPortal?portalNumber=' + username;

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

async function getAllFee(feeName) {
  try {
    const token = await getToken();

    const apiURL = apiHost + '/fee/v1/cms/getAll?page=0&size=10&feeName='+feeName+'&sort=createdDate,desc';

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
        //Return a list of fee
        return data.data.content;
      }
    }
    throw new Error('Cannot get fee');
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  initializeChromeDriver,
  checkUsernameAvailability,
  generateRandomString,
  getAllFee
};