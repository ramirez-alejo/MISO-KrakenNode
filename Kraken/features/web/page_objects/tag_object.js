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

    async getError(inputName) {
        let element = await this.getInput(inputName);
        element = await element.$('//span/p[1]');
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
}

module.exports = TagPage;