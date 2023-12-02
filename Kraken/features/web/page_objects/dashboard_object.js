const GhostPage = require("./GhostPage");
const expect = require("chai").expect;


class Dashboard extends GhostPage {

    constructor(driver, host) {
        super(driver, host);
        this.rootUrl = host;
    }

    async navigateToProfile() {
        //navigate to dashboard
        await this.driver.url(`${this.rootUrl}ghost/`);

    }

    async searchPost(name) {
        // class="gh-nav-btn-search"
        let element = await this.driver.$('.gh-nav-btn-search');
        await element.waitForDisplayed({ timeout: 15000 });
        await element.click();

        // type
        this.driver.keys(name);


        // a list with class class="ember-power-select-options" is shown
        element = await this.driver.$('.ember-power-select-options');
        await element.waitForDisplayed({ timeout: 15000 });

        //and it contains an option with text "Posts"
        element = await this.driver.$('.ember-power-select-group-name');
        await element.waitForDisplayed({ timeout: 15000 });

        // the option with the provided name is shown
        let elements = await this.driver.$$('.ember-power-select-option');
        element = elements.filter(async el => (await el.getText()) === name);
        await element[0].waitForDisplayed({ timeout: 15000 });

    }
    

}

module.exports = Dashboard;