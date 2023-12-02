const { Given, When, Then, BeforeStep } = require('@cucumber/cucumber');
const properties = require('../../../properties.json');

//lets import here the page object
const user = require('../page_objects/user_object.js');

BeforeStep(async function () {
    if (!this.userObject)
    {
        this.host = properties.Host;
        this.userObject ??= new user(this.driver, this.host);
    }
});

When('I navigate to the user profile', async function () {
    return await this.userObject.navigateToProfile();
});

When ('I update the location and bio', async function () {
    return await this.userObject.updateProfileLocationAndBio();
});

When ('I update the location to {kraken-string} and bio to {kraken-string}', async function (city, bio) {
    return await this.userObject.updateProfileLocationAndBio(city, bio);
});

Then ('I verify the users location and bio is updated', async function () {
    return await this.userObject.verifyProfileLocationAndBio();
});

Then ('I verify the users location is {kraken-string} and bio is {kraken-string} updated', async function (city, bio) {
    return await this.userObject.verifyProfileLocationAndBio(city, bio);
});

Then ('I verify the user history', async function () {
    return await this.userObject.verifyUserHistory();
});

When ('I set an invalid website url', async function () {
    return await this.userObject.setInvalidWebsite();
});

Then ('I verify is not allowed to save the changes', async function () {
    return await this.userObject.cannotSaveChanges();
});