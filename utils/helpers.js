const { Builder } = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

const config = require("../utils/config"); 

function initializeChromeDriver() {
  const chromeOptions = new chrome.Options();
  chromeOptions.addArguments("--disable-web-security");
  chromeOptions.addArguments("--start-maximized")
  // chromeOptions.addArguments("--auto-open-devtools-for-tabs")

  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  return driver;
}


async function getToken() {
  try {
    const loginData = {
      password: config.adminPassword,
      username: config.adminUsername
    };

    const response = await fetch(config.apiHost + '/auth/v1/cms/login', {
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

async function randomUsername() {
  let username;
  let isExisted = true;
  while (isExisted) {
    let randomString = generateRandomString(6);
    username = "MCUN" + randomString;
    isExisted = await checkUsernameAvailability(username);
  }
  return username;
}

async function checkUsernameAvailability(username) {
  try {
    const token = await getToken();

    const apiURL = config.apiHost + '/user/v1/cms/checkPortal?portalNumber=' + username;

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

async function getAllFeeBy(feeCode, feeName) {
  try {
    const token = await getToken();
    let apiURL = config.apiHost + '/fee/v1/cms/getAll?page=0&size=10';
    if (feeCode && feeCode.trim() !== '') {
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
    throw new Error('Cannot get fee when request is ' + apiURL);
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


module.exports = {
  initializeChromeDriver,
  checkUsernameAvailability,
  generateRandomString,
  getAllFeeBy,
  generateCompanyName,
  randomUsername
};