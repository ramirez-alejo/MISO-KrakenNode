const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

//lets import here the page object
const post = require('../page_objects/post_object.js');


When('I create a new post draft with number {kraken-string} and content {kraken-string} on {kraken-string}', async function (number, content, host) {
  const title = 'Post_' + number;
  const postObject = new post(this.driver, host);
  return await postObject.createDraftPost(title, content);
});

Then('I verify the post draft was created with number {kraken-string} on {kraken-string}', async function (number, host) {
  const title = 'Post_' + number;
  const postObject = new post(this.driver, host);
  return await postObject.CheckPostDraft(title);
});

When('I create a new post number {kraken-string} and content {kraken-string} on {kraken-string}', async function (number, content, host) {
    const title = 'Post_' + number;
    const postObject = new post(this.driver, host);
    return await postObject.createPost(title, content);
  });

Then('I verify the post was created with number {kraken-string} on {kraken-string}', async function (number, host) {
    const title = 'Post_' + number;
    const postObject = new post(this.driver, host);
    return await postObject.OpenAndCheck(title);
  });

Then('I edit the existing post with title {kraken-string} to have the new number {kraken-string} and new content {kraken-string} on {kraken-string}', async function (number, newNumber, newContent, host) {
    const title = 'Post_' + number;
    const newTitle = 'Post_' + newNumber;
    const postObject = new post(this.driver, host);
    return await postObject.EditPost(title, newTitle, newContent);
  });

Then ('I unpublish the post with number {kraken-string} on {kraken-string}', async function (number, host) {
    const title = 'Post_' + number;
    const postObject = new post(this.driver, host);
    return await postObject.UnPublishPost(title);
  });

Then ('I check the post with number {kraken-string} is not published on {kraken-string}', async function (number, host) {
    const title = 'Post_' + number;
    const postObject = new post(this.driver, host);
    return await postObject.CheckIsNotAvailable(title);
  });

Then('I delete the post with number {kraken-string} on {kraken-string}' , async function (number, host) {
    const title = 'Post_' + number;
    const postObject = new post(this.driver, host);
    return await postObject.DeletePost(title);
  });

