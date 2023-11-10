
const { By, until } = require("selenium-webdriver");

const assert = require("assert");

const config = require('../utils/config.js');

const helper = require('../utils/helpers.js');

const LoginPage = require('../pages/LoginPage.js');

const FeePage = require('../pages/FeePage.js')

const { it } = require("mocha");


describe('Fee Module Tests', function () {
    let driver;
    let feePage;

    before(async function () {
        driver = await helper.initializeChromeDriver();
        feePage = new FeePage(driver);

        const loginPage = new LoginPage(driver);
        const username = config.adminUsername;
        const password = config.adminPassword;
        const adminName = config.adminName;
    
        await loginPage.login(username, password, adminName);

    });


    after(async function () {
        await driver.quit();
    });

    it('Create fee successfully ', async function () {


    });

});