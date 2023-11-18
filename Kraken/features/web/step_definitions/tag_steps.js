const { When, Then, BeforeStep } = require('@cucumber/cucumber');
const TagPage = require('../page_objects/tag_object');
const { expect } = require('chai')


BeforeStep(async function (code) {
    this.tagPage ??= new TagPage(this.driver);
});

When('I create a new tag with name {kraken-string}, slug {kraken-string}, description {kraken-string}', async function (name, slug, description) {
    await this.tagPage.createTag(name, slug, description);
});

Then('A new tag with the name {kraken-string} should exists on the list', async function (name) {
    const exists = await this.tagPage.isTagInList(name);
    expect(exists).to.be.true;
});