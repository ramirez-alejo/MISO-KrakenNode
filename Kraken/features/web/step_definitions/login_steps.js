const { Given, When, Then } = require('@cucumber/cucumber');

//lets import here the page object
const LoginPage = require('../page_objects/login');

Given('I login to the Ghost application with username {string} and password {string}', async function (username, password) {
    const login = new LoginPage(this.driver);
    return await login.login(username, password);
  });

