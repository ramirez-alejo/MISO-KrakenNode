const { Given, When, Then, BeforeStep } = require('@cucumber/cucumber');
const properties = require('../../../properties.json');

//lets import here the page object
const dashboard = require('../page_objects/dashboard_object.js');

BeforeStep(async function () {
    if (!this.dashboardObject)
    {
        this.host = properties.Host;
        this.dashboardObject ??= new dashboard(this.driver, this.host);
    }
});

Then ('I can find the post with number {kraken-string} using the search bar', async function (number) {
    const post = 'Post_' + number;
    return await this.dashboardObject.searchPost(post);
});
