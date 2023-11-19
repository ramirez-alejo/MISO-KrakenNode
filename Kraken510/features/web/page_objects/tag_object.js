const GhostPage = require('./GhostPage');

class TagPage extends GhostPage {
    constructor(driver) {
        super(driver);
    }

    async createTag(name, slug, description) {
        await this.setInput('tag-name', name);
        await this.setInput('tag-slug', slug);
        await this.setInput('tag-description', description);
        await this.clickElement('[data-test-button="save"]');

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

    async isTagInList(name) {
        return await this.driver.$(`[data-test-tag-name]=${name}`).isExisting();
    }
}

module.exports = TagPage;