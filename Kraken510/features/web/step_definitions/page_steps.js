const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

//lets import here the page object
const page = require('../page_objects/page_object.js');



When('I create a new page draft with number {kraken-string} and content {kraken-string} on {kraken-string}', async function (number, content, host) {
  const title = 'Page_' + number;
  const pageObject = new page(this.driver, host);
  return await pageObject.createDraftPage(title, content);
});

Then('I verify the page draft was created with number {kraken-string} on {kraken-string}', async function (number, host) {
  const title = 'Page_' + number;
  const pageObject = new page(this.driver, host);
  return await pageObject.checkPageDraft(title);
});

When('I create a new page number {kraken-string} and content {kraken-string} on {kraken-string}', async function (number, content, host) {
  const title = 'Page_' + number;
  const pageObject = new page(this.driver, host);
  return await pageObject.createPage(title, content);
});

Then('I verify the page was created with number {kraken-string} on {kraken-string}', async function (number, host) {
  const title = 'Page_' + number;
  const pageObject = new page(this.driver, host);
  return await pageObject.openAndCheck(title);
});

Then('I edit the existing page with title {kraken-string} to have the new number {kraken-string} and new content {kraken-string} on {kraken-string}', async function (number, newNumber, newContent, host) {
  const title = 'Page_' + number;
  const newTitle = 'Page_' + newNumber;
  const pageObject = new page(this.driver, host);
  return await pageObject.editPage(title, newTitle, newContent);
});

Then('I unpublish the page with number {kraken-string} on {kraken-string}', async function (number, host) {
  const title = 'Page_' + number;
  const pageObject = new page(this.driver, host);
  return await pageObject.unPublishPage(title);
});

Then('I check the page with number {kraken-string} is not published on {kraken-string}', async function (number, host) {
  const title = 'Page_' + number;
  const pageObject = new page(this.driver, host);
  return await pageObject.checkIsNotAvailable(title);
});

Then('I delete the page with number {kraken-string} on {kraken-string}', async function (number, host) {
  const title = 'Page_' + number;
  const pageObject = new page(this.driver, host);
  return await pageObject.deletePage(title);
});

When('I open the page number {kraken-string} settings menu on {kraken-string}', async function (number, host) {
  const pageObject = new page(this.driver, host);
  await pageObject.openSettingsMenu('Page_' + number);
});

When('I add the tag {kraken-string} to the page', async function (tag) {
  const pageObject = new page(this.driver, '');
  await pageObject.addTag(tag);
});

When('I save the page changes', async function () {
  const pageObject = new page(this.driver, '');
  await pageObject.saveChanges();
});

Then('I verify the page with number {kraken-string} has the tag {kraken-string} associated', async function (number, tag) {
  const pageObject = new page(this.driver, '');
  const exists = await pageObject.pageHasTheTag(number, tag);
  expect(exists).to.be.true;
});

