const GhostPage = require('./GhostPage');

class Member extends GhostPage {
    constructor(driver) {
        super(driver);
    }

    async open() {
        super.open('#/members')
    }

    async createMember(name, email, label, note) {
        await this.clickElement('[data-test-new-member-button]');
        await this.setName(name);
        await this.setEmail(email);
        await this.setNote(note);
        await this.clickElement('[data-test-button="save"]');

        // delay to ensure the create operation
        await this.driver.waitUntil(async () => {
            return (await this.driver.getUrl()).includes('new') === false
          }, {
            timeout: 5000,
            timeoutMsg: 'expected text to be different after 5s'
          });
        const memberUrl = await this.driver.getUrl();
        return memberUrl.substring(memberUrl.lastIndexOf('/') + 1);
    }

    async selectMemberFromList(name) {
        await this.clickElement(`h3=${name}`);
    }

    async removeMember() {
        await this.clickElement('[data-test-button="member-actions"]');
        await this.clickElement('[data-test-button="delete-member"]');
        await this.clickElement('[data-test-button="confirm"]');
    }

    async impersonateMember() {
        await this.clickElement('[data-test-button="member-actions"]');
        await this.clickElement('[data-test-button="impersonate"]');
        const urlElement = await this.driver.$('[data-test-input="member-signin-url"]');
        const url = await urlElement.getValue();
        await this.driver.url(url);
    }

    async isInMembersList(name) {
        return await this.driver.$(`h3=${name}`).isExisting();
    }

    async setNote(note) {
        await this.setField('[data-test-input="member-note"]', note);
    }

    async setEmail(email) {
        await this.setField('[data-test-input="member-email"]', email);
    }

    async setName(name) {
        await this.setField('[data-test-input="member-name"]', name);
    }

    async setField(selector, value) {
        const element = await this.driver.$(selector);
        await element.setValue(value);
    }

    async clickElement(selector) {
        const element = await this.driver.$(selector);
        await element.click();
    }
}

module.exports = Member;