const expect = require("chai").expect;
class Page {
  constructor(driver, host) {
    this.driver = driver;
    this.baseUrl = host;
  }
  async createDraftPage(title, content) {
    // visit the relative path /ghost/#/settings
    await this.driver.url(this.baseUrl + "ghost/#/settings");

    //click on the pages menu option data-test-nav="pages"
    let element = await this.driver.$('[data-test-nav="pages"]');
    await element.waitForDisplayed(15000);
    await element.click();

    // click on new pages data-test-new-page-button=""
    element = await this.driver.$("[data-test-new-page-button]");
    await element.waitForDisplayed(15000);
    await element.click();

    //input the title into the textarea data-test-editor-title-input=""
    const titleElement = await this.driver.$(
      "[data-test-editor-title-input]"
    );
    await titleElement.setValue(title);

    //click on the div with role="textbox"
    element = await this.driver.$('[data-koenig-dnd-droppable="true"]');
    await element.waitForDisplayed(15000);
    await element.click();

    //type the contentMarkdown
    await element.setValue(content);

    element = await this.driver.$('[data-test-link="pages"]');
    
    await element.click()
  }

  async createPage(title, content) {
    await this.createDraftPage(title, content);

    // select the page with the provided title
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);
    await element.click();

    // click on the preview button data-test-button="publish-preview"
    element = await this.driver.$('[data-test-button="publish-preview"]');
    await element.waitForDisplayed(15000);
    await element.click();

    //click on the publish button (the one with s span with the test Publish inside)
    element = await this.driver.$("span=Publish");
    await element.waitForDisplayed(15000);
    await element.click();

    // click on the continue button data-test-button="continue"
    element = await this.driver.$('[data-test-button="continue"]');
    await element.waitForDisplayed(15000);
    await element.click();

    //click on publish page data-test-task-button-state="idle"
    element = await this.driver.$('[data-test-task-button-state="idle"]');
    await element.waitForDisplayed(15000);
    await element.click();

    // look for the element with class data-test-publish-flow
     //element = await this.driver.$('[data-test-publish-flow]');
     //await element.waitForDisplayed();

     //Give a little wait to complete
     await this.driver.pause(1000);

    // navigate back to the relative path /dashboard
    await this.driver.url(this.baseUrl + "ghost/#/dashboard");
  }

  async openAndCheck(title) {
    //Navigate to the path /pagetitles
    await this.driver.url(this.baseUrl + title);

    //look for the title element with class gh-article-title is-title
    let element = await this.driver.$(".gh-article-title.is-title");
    await element.waitForDisplayed(15000);
    await element.waitForDisplayed();

    //look for the content section class gh-content gh-canvas is-body
    element = await this.driver.$(".gh-content.gh-canvas.is-body");
    await element.waitForDisplayed(15000);
    await element.waitForDisplayed();
  }

  async checkPageDraft(title) {
    // Navigate to the path /ghost/#/pages
    await this.driver.url(this.baseUrl + "ghost/#/pages");

    //look for the element with x path //li[contains(a, 'page_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);

    // navigate back to the relative path /dashboard
    await this.driver.url(this.baseUrl + "ghost/#/dashboard");
  }

  async editPage(title, newTitle, newContent) {
    // Navigate to the path /ghost/#/pages
    await this.openPage(title);

    //look for the element with class gh-editor-title ember-text-area gh-input ember-view
    let element = await this.driver.$(
      ".gh-editor-title.ember-text-area.gh-input.ember-view"
    );
    await element.waitForDisplayed();
    await element.setValue(newTitle);

    //look for the element with class data-kg="editor"
    element = await this.driver.$('[data-kg="editor"]');
    await element.waitForDisplayed(15000);
    await element.click();

    //type the contentMarkdown
    await element.keys(newContent);

    // get the element with  class data-test-task-button-state="idle"
    element = await this.driver.$('[data-test-task-button-state="idle"]');
    await element.waitForDisplayed(15000);
    await element.click();

    // navigate back to the relative path /dashboard
    await this.driver.url(this.baseUrl + "ghost/#/dashboard");
  }

  async openPage(title) {
    await this.driver.url(this.baseUrl + "ghost/#/pages");
    //look for the element with x path //li[contains(a, 'page_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    //this need a longer wait
    await element.waitForDisplayed(15000);
    await element.click();    
  }

  async unPublishPage(title) {
    // Navigate to the path /ghost/#/pages
    await this.driver.url(this.baseUrl + "ghost/#/pages");
    //look for the element with x path //li[contains(a, 'page_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);
    await element.click();

    //get the element with class data-test-button="update-flow"
    element = await this.driver.$('[data-test-button="update-flow"]');
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
    await this.driver.url(this.baseUrl + title);

    //expect a 404 error
    let element = await this.driver.$("h1=404");
    await element.waitForDisplayed(15000);
  }

  async deletePage(title) {
    // Navigate to the path /ghost/#/pages
    await this.driver.url(this.baseUrl + "ghost/#/pages");

    //look for the element with x path //li[contains(a, 'page_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);
    await element.click();

    //look for the element with class data-test-psm-trigger
    element = await this.driver.$("[data-test-psm-trigger]");
    await element.waitForDisplayed(15000);
    await element.click();

    // Look for a button inside a div with class settings-menu-delete-button
    element = await this.driver.$(".settings-menu-delete-button");
    await element.waitForDisplayed(15000);
    await element.click();

    // confirm click on element with class gh-btn gh-btn-red gh-btn-icon
    element = await this.driver.$(".gh-btn.gh-btn-red.gh-btn-icon");
    await element.waitForDisplayed(15000);
    await element.click();

    // navigate back to the relative path /dashboard
    await this.driver.url(this.baseUrl + "ghost/#/dashboard");
  }

  async openSettingsMenu(title) {
    await this.openPage(title);
    await this.toggleSettingsMenu();
  }

  async toggleSettingsMenu() {
    const element = await this.driver.$('.settings-menu-toggle');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async addTag(tag) {
    const element = this.driver.$('#tag-input > ul > input[type="search"]');
    await element.waitForDisplayed(15000);
    await element.setValue(tag);
    await this.driver.keys(['Enter']);
  }

  async saveChanges() {
    const element = await this.driver.$('.gh-editor-save-trigger');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async pageHasTheTag(number, tag) {
    let element = await this.driver.$('.gh-list');
    await element.waitForDisplayed(15000);
    element = await this.driver.$('.gh-contentfilter-menu.gh-contentfilter-tag');
    await element.waitForDisplayed(15000);
    await element.click();
    element = await this.driver.$('.gh-contentfilter-menu-dropdown');
    await element.waitForDisplayed(15000);
    element = await element.$(`li=${tag}`);
    await element.waitForDisplayed(15000);
    await element.click();
    element = await this.driver.$(`//li[contains(a, "Page_${number}")]`);
    await element.waitForDisplayed(15000);
    return await element.isExisting();
  }
}
module.exports = Page;
