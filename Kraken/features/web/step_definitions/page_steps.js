const { Given, When, Then } = require('@cucumber/cucumber');

//lets import here the page object
const page = require('../page_objects/CreateOrEditPage.js');

When('I create a new page with title {string} and content {string}', async function (title, content) {
    const createOrEditPage = new page(this.driver);
    return await createOrEditPage.createPage(title, content);
  });

When('I verify the page was created with title {string}', async function (title) {
    const createOrEditPage = new page(this.driver);
    return await createOrEditPage.OpenAndCheckPage(title);
  });

