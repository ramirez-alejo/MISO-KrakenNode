const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai')

const MembersPage = require('../page_objects/ManageMembers')

When('Create a member with name {kraken-string}, email {kraken-string}, note {kraken-string} and label {kraken-string}', async function (name, email, note, label) {
    this.memberId = await this.membersPage.createMember(name, email, label, note);
    expect(this.memberId).to.not.empty;
});

When('I navigate to the members page', async function () {
    this.membersPage = new MembersPage(this.driver);
    await this.membersPage.open()
});

Then('I should see a new member named {kraken-string} on the members list', async function (name) {
    var exists = await this.membersPage.isInMembersList(name);
    expect(exists).to.be.true;
});

When('I select the member named {kraken-string}', async function (name) {
    await this.membersPage.selectMemberFromList(name);
});

When('I remove the selected member', async function () {
    await this.membersPage.removeMember();
});

Then('I impersonate the selected member', async function () {
    await this.membersPage.impersonateMember();
});

Then('I should not see a member named {kraken-string} on the members list', async function (name) {
    var exists = await this.membersPage.isInMembersList(name);
    expect(exists).to.be.false;
});   
