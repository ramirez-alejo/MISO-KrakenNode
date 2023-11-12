const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

//lets import here the page object
const page = require('../page_objects/CreateOrEditPage.js');

When('I create a new page number {kraken-string} and content {kraken-string} on {kraken-string}', async function (number, content, host) {
    const title = 'Page_' + number;
    const createOrEditPage = new page(this.driver, host);
    return await createOrEditPage.createPage(title, content);
  });

Then('I verify the page was created with number {kraken-string} on {kraken-string}', async function (number, host) {
    const title = 'Page_' + number;
    const createOrEditPage = new page(this.driver, host);
    return await createOrEditPage.OpenAndCheckPage(title);
  });

