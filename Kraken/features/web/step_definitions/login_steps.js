const { Given, When, Then } = require('@cucumber/cucumber');

//lets import here the page object
const LoginPage = require('../page_objects/login');

Given('I login to the Ghost application with username {kraken-string} and password {kraken-string} on {kraken-string}', async function (username, password, host) {
    const login = new LoginPage(this.driver, host);
    return await login.login(username, password);
});
