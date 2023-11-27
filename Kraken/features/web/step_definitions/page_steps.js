const { Given, When, Then, BeforeStep } = require('@cucumber/cucumber');
const expect = require('chai').expect;
const properties = require('../../../properties.json');

//lets import here the page object
const page = require('../page_objects/page_object.js');

BeforeStep(async function () {
  if (!this.pageObject)
  {
    this.host = properties.Host;
    this.pageObject ??= new page(this.driver, this.host);
  }
});

When('I create a new page draft with number {kraken-string} and content {kraken-string}', async function (number, content) {
  const title = 'Page_' + number;
  return await this.pageObject.createDraftPage(title, content);
});

Then('I verify the page draft was created with number {kraken-string}', async function (number) {
  const title = 'Page_' + number;
  return await this.pageObject.checkPageDraft(title);
});

When('I create a new page number {kraken-string} and content {kraken-string}', async function (number, content) {
  const title = 'Page_' + number;
  return await this.pageObject.createPage(title, content);
});

Then('I verify the page was created with number {kraken-string}', async function (number) {
  const title = 'Page_' + number;
  return await this.pageObject.openAndCheckPublishedPage(title);
});

Then('I edit the existing page with title {kraken-string} to have the new number {kraken-string} and new content {kraken-string}', async function (number, newNumber, newContent) {
  const title = 'Page_' + number;
  const newTitle = 'Page_' + newNumber;
  return await this.pageObject.editPage(title, newTitle, newContent);
});

Then('I unpublish the page with number {kraken-string}', async function (number) {
  const title = 'Page_' + number;
  return await this.pageObject.unPublishPage(title);
});

Then('I check the page with number {kraken-string} is not published', async function (number) {
  const title = 'Page_' + number;
  return await this.pageObject.checkIsNotAvailable(title);
});

Then('I delete the page with number {kraken-string}', async function (number) {
  const title = 'Page_' + number;
  return await this.pageObject.deletePage(title);
});

When('I open the page number {kraken-string} settings menu', async function (number) {
  await this.pageObject.openSettingsMenu('Page_' + number);
});

When('I add the tag {kraken-string} to the page', async function (tag) {
  await this.pageObject.addTag(tag);
});

When('I save the page changes', async function () {
  await this.pageObject.saveChanges();
});

Then('I verify the page with number {kraken-string} has the tag {kraken-string} associated', async function (number, tag) {
  const exists = await this.pageObject.pageHasTheTag(number, tag);
  expect(exists).to.be.true;
});

When('I try to create a new page draft with dynamic invalid title', async function () {
  await this.pageObject.getTestDataSet(this.pageObject.TestDataTypes.InvalidTitleLength);
  await this.pageObject.draftPageCreationFromTestData();
  //await this.pageObject.previewPage();
  //await this.pageObject.backToEditor();

});

When('I try to create a new page draft with dynamic invalid youtube video', async function () {
  await this.pageObject.getTestDataSet(this.pageObject.TestDataTypes.InvalidDetails);
  await this.pageObject.draftPageCreationFromTestDataWithDetails('[data-kg-card-menu-item="YouTube"]');
});

When('I try to create a new page draft with dynamic invalid twitter link', async function () {
  await this.pageObject.getTestDataSet(this.pageObject.TestDataTypes.InvalidDetails);
  await this.pageObject.draftPageCreationFromTestDataWithDetails('[data-kg-card-menu-item="X (formerly Twitter)"]');
});

When('I try to create a new page draft with dynamic invalid Vimeo link', async function () {
  await this.pageObject.getTestDataSet(this.pageObject.TestDataTypes.InvalidDetails);
  await this.pageObject.draftPageCreationFromTestDataWithDetails('[data-kg-card-menu-item="Vimeo"]');
});

When('I try to create a new page draft with dynamic invalid CodePen link', async function () {
  await this.pageObject.getTestDataSet(this.pageObject.TestDataTypes.InvalidDetails);
  await this.pageObject.draftPageCreationFromTestDataWithDetails('[data-kg-card-menu-item="CodePen"]');
});

When('I try to create a new page draft with dynamic invalid Spotify link', async function () {
  await this.pageObject.getTestDataSet(this.pageObject.TestDataTypes.InvalidDetails);
  await this.pageObject.draftPageCreationFromTestDataWithDetails('[data-kg-card-menu-item="Spotify"]');
});

When('I try to create a new page draft with dynamic invalid SoundCloud link', async function () {
  await this.pageObject.getTestDataSet(this.pageObject.TestDataTypes.InvalidDetails);
  await this.pageObject.draftPageCreationFromTestDataWithDetails('[data-kg-card-menu-item="SoundCloud"]');
});

When('I try to create a new page draft with dynamic invalid Other link', async function () {
  await this.pageObject.getTestDataSet(this.pageObject.TestDataTypes.InvalidDetails);
  await this.pageObject.draftPageCreationFromTestDataWithDetails('[data-kg-card-menu-item="Other..."]');
});

Then ('I verify the error is shown for invalid title', async function () {
  await this.pageObject.checkError('Title cannot be');
});

Then ('I verify the preview option is not available', async function () {
  await this.pageObject.checkPreviewNotAvailable();
});

Then ('I verify the error is shown', async function () {
  await this.pageObject.checkError('There was an error');
});

When('I get an error if I try to delete it', async function () {
  await this.pageObject.openPageAdvancedOptions();
  await this.pageObject.delete();
  await this.pageObject.checkErrorAlert('Resource not found error');
});

Then ('I verify I can go back to the dashboard', async function () {
  await this.pageObject.navigateToDashboard();
});

Then ('I verify I get an error if I try to remove the author', async function () {
  await this.pageObject.removeAuthor();
  await this.pageObject.checkError('class');
});


