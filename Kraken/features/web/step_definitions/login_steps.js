const { Given, When, Then } = require('@cucumber/cucumber');

//lets import here the page object
const LoginPage = require('../page_objects/login');

Given('I login to the Ghost application with username {kraken-string} and password {kraken-string} on {kraken-string}', async function (username, password, host) {
    const loginPage = new LoginPage(this.driver);
    return await loginPage.login(username, password);
});

Given('I login to the Ghost application with username {kraken-string} and password {kraken-string}', async function (username, password) {
    const loginPage = new LoginPage(this.driver);
    return await loginPage.login(username, password);
});
