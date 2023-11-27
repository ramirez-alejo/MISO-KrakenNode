const { When, Then, BeforeStep, Given } = require('@cucumber/cucumber');
const TagPage = require('../page_objects/tag_object');
const { expect } = require('chai');
BeforeStep(async function (code) {
    this.tagPage ??= new TagPage(this.driver);
});

When('I create a new tag with name {kraken-string}, slug {kraken-string}, description {kraken-string}', async function (name, slug, description) {
    await this.tagPage.createTag(name, slug, description);
});

When('I set the tag name {kraken-string}, slug {kraken-string} and description {kraken-string}', async function (name, slug, description) {
    await this.tagPage.setTagFieldsAndSave(name, slug, description);
});

When('I select the tag name {kraken-string} from the list', async function (name) {
    await this.tagPage.selectTagFromList(name);
});

When('I delete the tag', async function () {
    await this.tagPage.deleteTag();
});

Then('A tag with the name {kraken-string} should exists on the list', async function (name) {
    const exists = await this.tagPage.isTagInList(name);
    expect(exists).to.be.true;
});

When('I click on the delete tag button', async function () {
    await this.tagPage.deleteTag();
});

When('I confirm the delete dialog', async function () {
    await this.tagPage.confirmDelete();
});

Then('A tag with the name {string} should not exists on the list', async function (name) {
    const exists = await this.tagPage.isTagInList(name);
    expect(exists).to.be.false;
});

Given('I get the tag test data', async function () {
    await this.tagPage.getTestData();
});

When('I try to create a tag with an empty name', async function () {
    await this.tagPage.setTagName('');
    await this.tagPage.save();
});

Then('The error message {string} should be displayed on {string}', async function (errorMessage, inputName) {
    const error = await this.tagPage.getError(inputName);
    expect(error).to.equal(errorMessage)
});

Then('The error message {string} should be displayed on {string} with selector {string}', async function (errorMessage, inputName, elementSelector) {
    const error = await this.tagPage.getError(inputName, elementSelector);
    expect(error).to.equal(errorMessage)
});

Then('The save button should be disabled', async function () {
    const isDisabled = await this.tagPage.isSaveButtonDisabled();
    expect(isDisabled).to.be.true;
});

When('I try to create a tag with an empty slug', async function () {
    await this.tagPage.setTagName(this.tagPage.testData.name);
    await this.tagPage.save();
});

Then('The slug should be equal to the tag name', async function () {
    const slugText = await this.tagPage.getSlugText();
    expect(slugText).to.equal(this.tagPage.testData.name.replace(/\s/g, '-'));
});

When('I try to create a tag with a long name', async function () {
    await this.tagPage.setTagName(this.tagPage.testData.longString);
    await this.tagPage.save();
});

When('I try to create a tag with an invalid color', async function () {
    await this.tagPage.setTagColor(this.tagPage.testData.invalidColor);
    await this.tagPage.save();
});

When('I try to create a tag with a long slug', async function () {
    await this.tagPage.setTagSlug(this.tagPage.testData.longString);
    await this.tagPage.save();
});

When('I try to create a tag with a long description', async function () {
    await this.tagPage.setTagDescription(this.tagPage.testData.longDescription);
    await this.tagPage.save();
});

When('I try to create a tag with a long metadata title', async function () {
    await this.tagPage.toggleCollapsible('Meta data');
    await this.tagPage.setTagMetadataTitle(this.tagPage.testData.longString);
    await this.tagPage.save();
});

When('I try to create a tag with a long metadata description', async function () {
    await this.tagPage.toggleCollapsible('Meta data');
    await this.tagPage.setTagMetadataDescription(this.tagPage.testData.longDescription);
    await this.tagPage.save();
});

When('I try to create a tag with an invalid metadata url', async function () {
    await this.tagPage.toggleCollapsible('Meta data');
    await this.tagPage.setTagMetadataUrl(this.tagPage.testData.invalidUrl);
    await this.tagPage.save();
});

When('I try to create a tag with a x-card long title', async function () {
    await this.tagPage.toggleCollapsible('X card');
    await this.tagPage.setTagName(this.tagPage.testData.name);
    await this.tagPage.setElementValue('#twitter-title', this.tagPage.testData.longDescription);
    await this.tagPage.save();
});

Then('An alert with the message {string} is displayed', async function (message) {
    const element = await this.driver.$('.gh-alert-content');
    await element.waitForDisplayed({ timeout: 5000 });
    const text = await element.getText();
    expect(text).to.equal(message);
});

When('I try to create a tag with a x-card long description', async function () {
    await this.tagPage.toggleCollapsible('X card');
    await this.tagPage.setTagName(this.tagPage.testData.name);
    await this.tagPage.setElementValue('#twitter-description', this.tagPage.testData.longDescription);
    await this.tagPage.save();
});