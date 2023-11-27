const GhostPage = require('./GhostPage');
class TagPage extends GhostPage {
    constructor(driver) {
        super(driver);
    }

    async getTestData() {
        await super.getTestData('https://api.mockaroo.com/api/bfe81490?count=1&key=9d0a4cc0');
    }

    async createTag(name, slug, description) {
        await this.setTagFieldsAndSave(name, slug, description);
        // delay to ensure the create operation
        await this.driver.waitUntil(async () => {
            return (await this.driver.getUrl()).includes('new') === false
        }, {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
        });
        const tagUrl = await this.driver.getUrl();
        return tagUrl.substring(tagUrl.lastIndexOf('/') + 1);
    }

    async setTagFieldsAndSave(name, slug, description) {
        await this.setTagName(name);
        await this.setTagSlug(slug);
        await this.setTagDescription(description);
        await this.save();
    }

    async save() {
        await this.clickElement('[data-test-button="save"]');
    }

    async setTagDescription(description) {
        await this.setInput('tag-description', description);
    }

    async setTagSlug(slug) {
        await this.setInput('tag-slug', slug);
    }

    async setTagName(name) {
        await this.setInput('tag-name', name);
    }

    async setTagColor(color) {
        await this.setInput('accentColor', color);
    }

    async setTagMetadataTitle(title) {
        await this.setElementValue('#meta-title', title);
    }

    async setTagMetadataDescription(description) {
        await this.setElementValue('#meta-description', description);
    }
    async setTagMetadataUrl(url) {
        await this.setElementValue('#canonical-url', url);
    }

    async getError(inputName, elementSelector) {
        elementSelector ??= 'p.response';

        let element;
        if (inputName.startsWith('#'))
            element = await this.driver.$(inputName);
        else
            element = await this.getInput(inputName);
        element = await element.parentElement();
        element = await element.$(elementSelector);
        return element.getText();
    }

    async deleteTag() {
        await this.clickElement('[data-test-button="delete-tag"]');
    }

    async confirmDelete() {
        await this.clickElement('[data-test-button="confirm"]');
    }

    async selectTagFromList(name) {
        const element = await this.getTagFromList(name);
        await element.click();
    }

    async isTagInList(name) {
        const element = await this.getTagFromList(name);
        return await element.isExisting();
    }

    async getTagFromList(name) {
        return await this.driver.$(`[data-test-tag-name]=${name}`);
    }

    async isSaveButtonDisabled() {
        const element = await this.driver.$('[data-test-task-button-state="failure"]');
        return await element.isExisting();
    }

    async getSlugText() {
        const element = await this.getInput('tag-slug');
        return await element.getValue();
    }
    
    async toggleCollapsible(title) {
        let element = await this.driver.$(`.gh-expandable-title=${title}`);
        element = element.parentElement().parentElement().$('span=Expand');
        await element.click();
    }
}

module.exports = TagPage;