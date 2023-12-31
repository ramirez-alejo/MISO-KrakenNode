const { When, Then, BeforeStep } = require('@cucumber/cucumber');
const { expect } = require('chai');
const MenuPage = require('../page_objects/menu_object');


BeforeStep(async function (code) {
    this.menuPage ??= new MenuPage(this.driver);
});

When('I add a new label {kraken-string} with a url {kraken-string}', async function (label, url) {
    await this.menuPage.addPrimaryNavigation(label, url);
});

Then('Should exists a new menu item with label {kraken-string} and url {kraken-string}', async function (label, url) {
    const exists = await this.menuPage.checkIfMenuItemExists(label, url);
    expect(exists).to.be.true;
});

When('I delete the label {kraken-string} and save', async function (label) {
    await this.menuPage.deletePrimaryNavigations();
});

Then('Should not exists a menu item with label {kraken-string} and url {kraken-string}', async function (label, url) {
    const exists = await this.menuPage.checkIfMenuItemExists(label, url);
    expect(exists).to.be.false;
});