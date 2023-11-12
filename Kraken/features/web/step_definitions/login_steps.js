const { Given, When, Then } = require('@cucumber/cucumber');

//lets import here the page object
const LoginPage = require('../page_objects/login');

Given('I login to the Ghost application with username {string} and password {string} on {string}', async function (username, password, host) {
    const login = new LoginPage(this.driver, host);
    return await login.login(username, password);
  });
