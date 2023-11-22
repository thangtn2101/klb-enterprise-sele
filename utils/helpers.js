const { Builder, until, By} = require("selenium-webdriver");

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
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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

async function getAllFeeBy(feeCode,feeName) {
  try {
    const token = await getToken();
    let apiURL = apiHost + '/fee/v1/cms/getAll?page=0&size=10';
    if(feeCode && feeCode.trim() !== ''){
      apiURL += '&feeCode=' + encodeURIComponent(feeCode);
    }
    if (feeName && feeName.trim() !== '') {
      apiURL += '&feeName=' + encodeURIComponent(feeName);
    }

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
    throw new Error('Cannot get fee when request is '+ apiURL);
  } catch (error) {
    throw new Error(error);
  }
}


const prefixes = ["Phúc", "Hòa", "Đông", "Minh", "Xanh", "Song", "Vinh", "Thanh", "Tiến", "Vinamilk", "Hà Nội", "Vingroup", "TGDD", "Cửu Long"];
const suffixes = ["Co.", "Ltd.", "Group", "Tech", "Solutions", "Systems", "Partners", "Bank", "Tập đoàn"];

function generateCompanyName() {
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  const companyName = `${randomPrefix} ${randomSuffix}`;

  return companyName;
}

async function waitLoadingStale(driver){
  const loadingPath = "/html/body/app-dashboard/div/main/div[2]/ngx-spinner/div"
  const loadingElement = await driver.wait(until.elementLocated(By.xpath(loadingPath)), 10000);
  await driver.wait(until.stalenessOf(loadingElement), 10000);
}

async function clickOnEditButton(driver) {
  const editFeeBTPath = "//button[contains(span, 'Chỉnh sửa')]";
  const editFeeBT = await driver.wait(until.elementLocated(By.xpath(editFeeBTPath)), 5000);
  await driver.wait(until.elementIsVisible(editFeeBT), 5000);
  await driver.wait(until.elementIsEnabled(editFeeBT), 5000);
  await editFeeBT.click();
}


module.exports = {
  initializeChromeDriver,
  checkUsernameAvailability,
  generateRandomString,
  getAllFeeBy,
  generateCompanyName,
  waitLoadingStale,
  clickOnEditButton
};