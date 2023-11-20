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
        element = await this.driver.$('span=Save');
        await element.click();
    }

    async checkIfMenuItemExists(label, url) {
        let element = await this.driver.$(`.nav-${label}`.toLowerCase());
        await element.waitForDisplayed();
        element = await element.$(`[href="${url}"]`);
        return await element.isExisting();
    }


}

module.exports = MenuPage;