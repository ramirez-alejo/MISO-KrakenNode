const GhostPage = require('./GhostPage');

class MenuPage extends GhostPage {
    constructor(driver) {
        super(driver);
    }

    async addPrimaryNavigation(label, url) {
        let element = await this.driver.$('#settings-navigation .gh-blognav-add');
        const lineElement = await element.parentElement();
        element = await lineElement.$('.gh-blognav-label > input[type="text"]');
        await element.setValue(label);
        element = await lineElement.$('.gh-blognav-url > input[type="text"]');
        await element.setValue(url);
        await this.save();
    }

    async checkIfMenuItemExists(label, url) {
        const navElement = await this.driver.$('.nav');
        await navElement.waitForDisplayed();
        let element = await this.driver.$(`.nav-${label}`.toLowerCase());
        if (await element.isExisting()) {
            element = await element.$(`[href="${url}"]`);
            return await element.isExisting();
        }
        return false;
    }

    async save() {
        const element = await this.driver.$('span=Save');
        await element.click();
    }


    async deletePrimaryNavigations() {
        const elements = await this.driver.$$('#settings-navigation button.gh-blognav-delete');
        for (let element of elements) {
            await element.click();
        }
        await this.save();
    }
}

module.exports = MenuPage;