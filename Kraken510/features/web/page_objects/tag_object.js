const GhostPage = require('./GhostPage');

class TagPage extends GhostPage {
    constructor(driver) {
        super(driver);
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
        await this.setElementValue('#tag-name', name);
        await this.setElementValue('#tag-slug', slug);
        await this.setElementValue('#tag-description', description);
        await this.clickElement('button=Save');
    }

    async deleteTag() {
        await this.clickElement('button=Delete tag');
    }

    async confirmDelete() {
        await this.clickElement('button=Delete');
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

        const element = await this.driver.$('.tags-list.gh-list');
        await element.waitForDisplayed();
        return await element.$(`h3=${name}`);
    }
}

module.exports = TagPage;