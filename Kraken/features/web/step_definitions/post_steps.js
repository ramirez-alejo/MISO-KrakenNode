const { Given, When, Then, BeforeStep } = require('@cucumber/cucumber');
const expect = require('chai').expect;
const properties = require('../../../properties.json');

//lets import here the page object
const post = require('../page_objects/post_object.js');


BeforeStep(async function () {
  if (!this.postObject)
  {
    this.host = properties.Host;
    this.postObject ??= new post(this.driver, this.host);
  }
});

When('I create a new post draft with number {kraken-string} and content {kraken-string}', async function (number, content) {
  const title = 'Post_' + number;
  return await this.postObject.createDraftPost(title, content);
});

Then('I verify the post draft was created with number {kraken-string}', async function (number) {
  const title = 'Post_' + number;
  return await this.postObject.checkPostDraft(title);
});

When('I create a new post number {kraken-string} and content {kraken-string}', async function (number, content) {
  const title = 'Post_' + number;
  return await this.postObject.createPost(title, content);
});

Then('I verify the post was created with number {kraken-string}', async function (number) {
  const title = 'Post_' + number;
  return await this.postObject.openAndCheckPublished(title);
});

Then('I edit the existing post with title {kraken-string} to have the new number {kraken-string} and new content {kraken-string}', async function (number, newNumber, newContent) {
  const title = 'Post_' + number;
  const newTitle = 'Post_' + newNumber;
  return await this.postObject.editPost(title, newTitle, newContent);
});

Then('I unpublish the post with number {kraken-string}', async function (number) {
  const title = 'Post_' + number;
  return await this.postObject.unPublishPost(title);
});

Then('I check the post with number {kraken-string} is not published', async function (number) {
  const title = 'Post_' + number;
  return await this.postObject.checkIsNotAvailable(title);
});

Then('I delete the post with number {kraken-string}', async function (number) {
  const title = 'Post_' + number;
  return await this.postObject.deletePost(title);
});

When('I open the post number {kraken-string} settings menu', async function (number) {
  await this.postObject.openSettingsMenu('Post_' + number);
});

When('I add the tag {kraken-string} to the post', async function (tag) {
  await this.postObject.addTag(tag);  
});

When('I save the post changes', async function () {
  await this.postObject.saveChanges();  
});

Then('I verify the post with number {kraken-string} has the tag {kraken-string} associated', async function (number, tag) {
  const exists = await this.postObject.postHasTheTag(number, tag);  
  expect(exists).to.be.true;  
});

When('I try to create a new post draft with dynamic invalid title', async function () {
  await this.postObject.getTestDataSet(this.postObject.TestDataTypes.InvalidTitleLength);
  await this.postObject.draftPostCreationFromTestData();


});

When('I try to create a new post draft with dynamic invalid youtube video', async function () {
  await this.postObject.getTestDataSet(this.postObject.TestDataTypes.InvalidDetails);
  await this.postObject.draftPostCreationFromTestDataWithDetails('[data-kg-card-menu-item="YouTube"]');
});

When('I try to create a new post draft with dynamic invalid twitter link', async function () {
  await this.postObject.getTestDataSet(this.postObject.TestDataTypes.InvalidDetails);
  await this.postObject.draftpostCreationFromTestDataWithDetails('[data-kg-card-menu-item="X (formerly Twitter)"]');
});

When('I try to create a new post draft with dynamic invalid Vimeo link', async function () {
  await this.postObject.getTestDataSet(this.postObject.TestDataTypes.InvalidDetails);
  await this.postObject.draftpostCreationFromTestDataWithDetails('[data-kg-card-menu-item="Vimeo"]');
});

When('I try to create a new post draft with dynamic invalid CodePen link', async function () {
  await this.postObject.getTestDataSet(this.postObject.TestDataTypes.InvalidDetails);
  await this.postObject.draftpostCreationFromTestDataWithDetails('[data-kg-card-menu-item="CodePen"]');
});

When('I try to create a new post draft with dynamic invalid Spotify link', async function () {
  await this.postObject.getTestDataSet(this.postObject.TestDataTypes.InvalidDetails);
  await this.postObject.draftpostCreationFromTestDataWithDetails('[data-kg-card-menu-item="Spotify"]');
});

When('I try to create a new post draft with dynamic invalid SoundCloud link', async function () {
  await this.postObject.getTestDataSet(this.postObject.TestDataTypes.InvalidDetails);
  await this.postObject.draftpostCreationFromTestDataWithDetails('[data-kg-card-menu-item="SoundCloud"]');
});

When('I try to create a new post draft with dynamic invalid Other link', async function () {
  await this.postObject.getTestDataSet(this.postObject.TestDataTypes.InvalidDetails);
  await this.postObject.draftpostCreationFromTestDataWithDetails('[data-kg-card-menu-item="Other..."]');
});

Then ('I verify the error is shown for invalid title', async function () {
  await this.postObject.checkError('Title cannot be');
});

Then ('I verify the preview option is not available', async function () {
  await this.postObject.checkPreviewNotAvailable();
});

Then ('I verify the error is shown', async function () {
  await this.postObject.checkError('There was an error');
});

When('I get an error if I try to delete it', async function () {
  await this.postObject.openpostAdvancedOptions();
  await this.postObject.delete();
  await this.postObject.checkErrorAlert('Resource not found error');
});

Then ('I verify I can go back to the dashboard', async function () {
  await this.postObject.navigateToDashboard();
});

Then ('I verify I get an error if I try to remove the author from the post', async function () {
  await this.postObject.removeAuthor();
  await this.postObject.checkError('class');
});


