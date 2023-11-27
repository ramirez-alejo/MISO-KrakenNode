const GhostPage = require('./GhostPage');
const expect = require("chai").expect;

class Page extends GhostPage {
  TestDataTypes = Object.freeze({
    InvalidTitleLength: 1,
    InvalidDetails: 2,
  });

  constructor(driver, host) {
    super(driver);
    this.rootUrl = host;
    this.testData = [];
  }

  async goToSettings() {
    // visit the relative path /ghost/#/settings
    await this.driver.url(this.rootUrl + "ghost/#/settings");
  }

  async selectPagesFromMenu() {
    //click on the pages menu option data-test-nav="pages"
    let element = await this.driver.$('[data-test-nav="pages"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async clickOnNewPage() {
    // click on new pages data-test-new-page-button=""
    let element = await this.driver.$("[data-test-new-page-button]");
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async setPageTitle(title) {
    //input the title into the textarea data-test-editor-title-input=""
    const titleElement = await this.driver.$("[data-test-editor-title-input]");
    await titleElement.setValue(title);
  }

  async setMarkdownContent(content) {
    //click on the div with role="textbox"
    let element = await this.driver.$('[data-koenig-dnd-droppable="true"]');
    await element.waitForDisplayed(15000);
    await element.click();
    //type the contentMarkdown
    await element.setValue(content);

    /* //look for the element with class data-kg="editor"
    element = await this.driver.$('[data-kg="editor"]');
    await element.waitForDisplayed(15000);
    await element.click();

    //type the contentMarkdown
    await element.keys(newContent); */
  }

  async goBackToPagesList() {
    // look for the element with class data-test-link="pages"
    let element = await this.driver.$('[data-test-link="pages"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async draftPageCreationFromTestData(index) {
    if (index)
    {
        if (index < 0 || index >= this.testData.length) {
          throw new Error("Invalid index");
        }
        const title = this.testData[index].pageTitle;
        return await this.draftPageCreation(title, this.testData[index].pageContent);
    }

    //lets grab a random index
    const randomIndex = Math.floor(Math.random() * this.testData.length);
    const title = this.testData[randomIndex].pageTitle;
    return await this.draftPageCreation(title, this.testData[randomIndex].pageContent);
  }

  async draftPageCreationFromTestDataWithDetails(elementSelector, index) {
    if (index)
    {
        if (index < 0 || index >= this.testData.length) {
          throw new Error("Invalid index");
        }
        const title = this.testData[index].title;
        return await this.draftPageCreation(title, this.testData[index], elementSelector);
    }

    //lets grab a random index
    const randomIndex = Math.floor(Math.random() * this.testData.length);
    const title = this.testData[randomIndex].title;
    return await this.draftPageCreationWitDetails(title, this.testData[randomIndex], elementSelector);
  }

  async draftPageCreationWitDetails(title, details, elementSelector) {
    await this.draftPageCreation(title, details.content);
    if (details.link)
    {
        await this.setLink(elementSelector, details.link);
    }
  }

  async setLink(elementSelector, videoLink) {
    // hit enter key
    await this.driver.keys(["Enter"]);

    let element = await this.driver.$('[data-kg-plus-button]');
    await element.waitForDisplayed(15000);
    await element.click();
    element = await this.driver.$(elementSelector);
    await element.waitForDisplayed(15000);
    await element.click();
    element = await this.driver.$('[data-testid="embed-url"]');
    await element.waitForDisplayed(15000);
    await element.setValue(videoLink);

    // press enter
    await element.keys(["Enter"]);
  }


  async draftPageCreation(title, content) {
    await this.goToSettings();
    await this.selectPagesFromMenu();
    await this.clickOnNewPage();
    await this.setPageTitle(title);
    await this.setMarkdownContent(content);
  }

  async createDraftPage(title, content) {
    await this.draftPageCreation(title, content);
    await this.goBackToPagesList();
  }

  async selectPageFromPagesList(title) {
    //look for the element with x path //li[contains(a, 'page_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async previewPage() {
    // click on the preview button data-test-button="publish-preview"
    let element = await this.driver.$('[data-test-button="publish-preview"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async publishPagePreview() {
    // click on the publish button (the one with s span with the test Publish inside)
    let element = await this.driver.$("span=Publish");
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async continuePagePublication() {
    // click on the continue button data-test-button="continue"
    let element = await this.driver.$('[data-test-button="continue"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async confirmPagePublication() {
    //click on publish page data-test-task-button-state="idle"
    let element = await this.driver.$('[data-test-task-button-state="idle"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async navigateToDashboard() {
    // navigate back to the relative path /dashboard
    await this.driver.url(this.rootUrl + "ghost/#/dashboard");
  }

  async createPage(title, content) {
    await this.createDraftPage(title, content);

    await this.selectPageFromPagesList(title);

    await this.previewPage();

    await this.publishPagePreview();

    await this.continuePagePublication();

    await this.confirmPagePublication();

    // look for the element with class data-test-publish-flow
    //element = await this.driver.$('[data-test-publish-flow]');
    //await element.waitForDisplayed();

    //Give a little wait to complete
    await this.driver.pause(1000);

    // navigate back to the relative path /dashboard
    await this.navigateToDashboard();
  }

  async checkPublishedTitle(title) {
    //look for the title element with class gh-article-title is-title
    let element = await this.driver.$(".gh-article-title.is-title");
    await element.waitForDisplayed(15000);
    await element.waitForDisplayed();
  }

  async checkPublishedContent(content) {
    //look for the content section class gh-content gh-canvas is-body
    let element = await this.driver.$(".gh-content.gh-canvas.is-body");
    await element.waitForDisplayed(15000);
    await element.waitForDisplayed();
  }

  async openAndCheckPublishedPage(title, content) {
    //Navigate to the path /pagetitles
    await this.driver.url(this.rootUrl + title);
    await this.checkPublishedTitle(title);
    if (content) await this.checkPublishedContent(content);
  }

  async checkPageDraft(title) {
    // Navigate to the path /ghost/#/pages
    await this.driver.url(this.rootUrl + "ghost/#/pages");

    //look for the element with x path //li[contains(a, 'page_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);

    // navigate back to the relative path /dashboard
    await this.navigateToDashboard();
  }

  async waitForAutosaveToComplete() {
    // get the element with  class data-test-task-button-state="idle"
    let element = await this.driver.$('[data-test-task-button-state="idle"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async editPage(title, newTitle, newContent) {
    await this.openPageToEdit(title);

    await this.setPageTitle(newTitle);

    await this.setMarkdownContent(newContent);

    await this.waitForAutosaveToComplete();

    await this.navigateToDashboard();
  }

  async navigateToPagesSettings() {
    await this.driver.url(this.rootUrl + "ghost/#/pages");
  }

  async openPageToEdit(title) {
    await this.navigateToPagesSettings();

    await this.driver.url(this.rootUrl + "ghost/#/pages");
    //look for the element with x path //li[contains(a, 'page_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    //this need a longer wait
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async unPublishPage(title) {
    await this.openPageToEdit(title);

    //get the element with class data-test-button="update-flow"
    let element = await this.driver.$('[data-test-button="update-flow"]');
    await element.waitForDisplayed(15000);
    await element.click();

    //click on the unpublish button data-test-button="revert-to-draft"
    element = await this.driver.$('[data-test-button="revert-to-draft"]');
    await element.waitForDisplayed(15000);
    await element.click();

    // We need a little wait here to make sure the button is clickable
    await this.driver.pause(1000);
  }

  async checkIsNotAvailable(title) {
    //Navigate to the path /pagetitle
    await this.driver.url(this.rootUrl + title);

    //expect a 404 error
    let element = await this.driver.$("h1=404");
    await element.waitForDisplayed(15000);
  }

  async openPageAdvancedOptions() {
    //look for the element with class data-test-psm-trigger
    let element = await this.driver.$("[data-test-psm-trigger]");
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async deletePage(title) {
    await this.openPageToEdit(title);
    await this.openPageAdvancedOptions();
    await this.delete();
    await this.navigateToDashboard();
  }

  async delete() {
    // Look for a button inside a div with class settings-menu-delete-button
    let element = await this.driver.$(".settings-menu-delete-button");
    await element.waitForDisplayed(15000);
    await element.click();

    // confirm click on element with class gh-btn gh-btn-red gh-btn-icon
    element = await this.driver.$(".gh-btn.gh-btn-red.gh-btn-icon");
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async openSettingsMenu(title) {
    await this.openPageToEdit(title);
    await this.toggleSettingsMenu();
  }

  async toggleSettingsMenu() {
    const element = await this.driver.$(".settings-menu-toggle");
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async addTag(tag) {
    const element = this.driver.$('#tag-input > ul > input[type="search"]');
    await element.waitForDisplayed(15000);
    await element.setValue(tag);
    await this.driver.keys(["Enter"]);
  }

  async saveChanges() {
    const element = await this.driver.$(".gh-editor-save-trigger");
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async pageHasTheTag(number, tag) {
    let element = await this.driver.$(".gh-list");
    await element.waitForDisplayed(15000);
    element = await this.driver.$(
      ".gh-contentfilter-menu.gh-contentfilter-tag"
    );
    await element.waitForDisplayed(15000);
    await element.click();
    element = await this.driver.$(".gh-contentfilter-menu-dropdown");
    await element.waitForDisplayed(15000);
    element = await element.$(`li=${tag}`);
    await element.waitForDisplayed(15000);
    await element.click();
    element = await this.driver.$(`//li[contains(a, "Page_${number}")]`);
    await element.waitForDisplayed(15000);
    return await element.isExisting();
  }

  async backToEditor() {
    //look for the element with class gh-btn-editor gh-editor-back-button
    let element = await this.driver.$('[gh-btn-editor gh-editor-back-button]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async getTestDataSet(testDataType) {
      let url = "https://my.api.mockaroo.com/";

      if (testDataType == this.TestDataTypes.InvalidTitleLength) {
        url += "invalid_length_title_content.json?key=062d8850";
      }
      else if (testDataType == this.TestDataTypes.InvalidDetails) {
        url += "invalid_details.json?key=062d8850";
      }
      else {
        throw new Error("Invalid test data type");
      }

      await super.getTestData(url, 'GET');
  }

  async checkError(errorContent) {
    // Get the whole page html
    //class="gh-main gh-main-white"
    const html = await this.driver.$(".gh-main.gh-main-white").getHTML(false);
    expect(html).to.contain(errorContent);
  }

  async checkErrorAlert(errorContent) {
    //class="gh-alerts"
    const html = await this.driver.$(".gh-alerts").getHTML(false);
    expect(html).to.contain(errorContent);
  }

  async checkErrorForElement(element, errorContent) {
    await element.waitForDisplayed(15000);
    // get the inner html
    const html = await element.getHTML();
    expect(html).to.contain(errorContent);
  }

  async checkErrorForYoutubeVideo() {
    let element = await this.driver.$('[data-kg-card-selected="true"]');
    await this.checkErrorForElement(element, "There was an error");
  }


  async checkPreviewNotAvailable() {
    //look for the element with class="gh-btn gh-btn-outline gh-publishmenu-button"
    const element = await this.driver.$('[data-test-button="publish-preview"]');
    expect(await element.isExisting()).to.be.false;
  }

  async removeAuthor() {
    await this.openPageAdvancedOptions();
    //[class="ember-power-select-multiple-option js-draggableObject draggable-object ember-view"]
    let element = await this.driver.$(
      ".ember-power-select-multiple-option.js-draggableObject.draggable-object.ember-view"
    );
    await element.waitForDisplayed(15000);

    //find the first element with class class="ember-power-select-multiple-remove-btn"
    let removeElement = await element.$(
      ".ember-power-select-multiple-remove-btn"
    );
    await removeElement.waitForDisplayed(15000);
    await removeElement.click();
  }


}
module.exports = Page;
