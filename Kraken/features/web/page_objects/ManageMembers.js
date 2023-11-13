const GhostPage = require('./GhostPage');

class Member extends GhostPage {
    constructor(driver) {
        super(driver);
    }

    async open() {
        super.open('#/members')
    }

    async createMember(name, email, label, note) {
        const botonNuevoMiembro = this.driver.$('[data-test-new-member-button]');
        await botonNuevoMiembro.click();

        await this.setName(name);

        await this.setEmail(email);

        await this.setNote(note);
        
        const botonGuardar = this.driver.$('[data-test-button="save"]');
        await botonGuardar.click();        
    }

    async isInMembersList(name) {
        return await this.driver.$('[data-test-list="members-list-item"]').$(`h3.gh-members-list-name=${name}`).isExisting();        
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
        const element = this.driver.$(selector);
        await element.setValue(value);
    }
}

module.exports = Member;