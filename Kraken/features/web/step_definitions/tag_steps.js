const { When, Then, BeforeStep } = require('@cucumber/cucumber');
const TagPage = require('../page_objects/tag_object');
const { expect } = require('chai')


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