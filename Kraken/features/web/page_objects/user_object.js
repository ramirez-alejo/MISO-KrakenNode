const GhostPage = require("./GhostPage");
const expect = require("chai").expect;


class User extends GhostPage {

    constructor(driver, host) {
        super(driver, host);
        this.rootUrl = host;
        this.city = 'London'
        this.bio = 'I am a test user'
    }

    async navigateToProfile() {
       
        //#/settings/staff/grupo
        await this.driver.url(`${this.rootUrl}ghost/#/settings/staff/grupo`);
        

    }

    async updateProfileLocationAndBio(cityArg, bioArg) {

        const city = cityArg || this.city;
        const bio = bioArg || this.bio;
        
        let element = await this.driver.$('#user-location');
        await element.waitForDisplayed({ timeout: 15000 });
        await element.clearValue();
        await element.setValue(city);

        element = await this.driver.$('#user-bio');
        await element.waitForDisplayed({ timeout: 15000 });
        await element.clearValue();
        await element.setValue(bio);

        element = await this.driver.$('[data-test-task-button-state]'); 
        await element.waitForDisplayed({ timeout: 15000 });
        await element.click();

        await this.driver.waitUntil(async () => {
            // await this.driver.$('[data-test-save-button]').getText() should contain the text saved
            return (await (await this.driver.$('[data-test-save-button]')).getText()).includes('Saved') === true
        });

    }

    async verifyProfileLocationAndBio(cityArg, bioArg) {
        const city = cityArg || this.city;
        const bio = bioArg || this.bio;
        let element = await this.driver.$('#user-location');
        await element.waitForDisplayed({ timeout: 15000 });
        expect(await element.getValue()).to.equal(city);

        element = await this.driver.$('#user-bio');
        await element.waitForDisplayed({ timeout: 15000 });
        expect(await element.getValue()).to.equal(bio);
    }

    async verifyUserHistory() {
        await this.navigateToProfile();

        let element = await this.driver.$('[data-test-user-actions]');
        await element.waitForDisplayed({ timeout: 15000 });
        await element.click();

        element = await this.driver.$('[href="#/settings/history/?user=1"]');
        await element.waitForDisplayed({ timeout: 15000 });
        await element.click();


        //shoudl contain an element with class class="gh-history-description" that contains a span with text "User edited"
        element = await this.driver.$('[class="gh-history-description"]');
        await element.waitForDisplayed({ timeout: 15000 });
        expect(await element.getText()).to.include('User edited');

    }

    async setInvalidWebsite() {
        await this.navigateToProfile();

        let element = await this.driver.$('#user-website');
        element.waitForDisplayed({ timeout: 15000 });
        await element.clearValue();
        await element.setValue('invalid url');
        
    }

    async cannotSaveChanges() {
        let element = await this.driver.$('[data-test-save-button]');
        element.waitForDisplayed({ timeout: 15000 });
        await element.click();

        element = await this.driver.$('[data-test-task-button-state="failure"]');
        element.waitForDisplayed({ timeout: 15000 });
        expect(await element.isExisting()).to.be.true;
    }

}

module.exports = User;