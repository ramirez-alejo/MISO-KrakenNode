const { When } = require('@cucumber/cucumber');
const properties = require('../../../properties.json');

When('I enter email {string}', async function (email) {
    let element = await this.driver.$('#email');
    return await element.setValue(email);
});

When('I enter password {string}', async function (password) {
    let element = await this.driver.$('#pass');
    return await element.setValue(password);
});

When('I navigate to the path {string}', async function (path) {
    await this.driver.url(`${properties.Host}ghost/#/${path}`);
}) 
