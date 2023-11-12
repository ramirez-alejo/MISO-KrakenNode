const { Given, When, Then } = require('@cucumber/cucumber');
const expect = require('chai').expect;

//lets import here the page object
const post = require('../page_objects/CreateOrEditPost.js');


When('I create a new post draft with number {string} and content {string} on {string}', async function (number, content, host) {
  const title = 'Post_' + number;
  const createOrEditPost = new post(this.driver, host);
  return await createOrEditPost.createDraftPost(title, content);
});

Then('I verify the post draft was created with number {string} on {string}', async function (number, host) {
  const title = 'Post_' + number;
  const createOrEditPost = new post(this.driver, host);
  return await createOrEditPost.CheckPostDraft(title);
});

When('I create a new post number {string} and content {string} on {string}', async function (number, content, host) {
    const title = 'Post_' + number;
    const createOrEditPost = new post(this.driver, host);
    return await createOrEditPost.createPost(title, content);
  });

Then('I verify the post was created with number {string} on {string}', async function (number, host) {
    const title = 'Post_' + number;
    const createOrEditPost = new post(this.driver, host);
    return await createOrEditPost.OpenAndCheck(title);
  });

