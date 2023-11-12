class Page {
    constructor(driver, host) {
    this.driver = driver;
    this.baseUrl = 'http://localhost:2368/';

    if (host && host !== '<Host>') {
      this.baseUrl = host;
    }

    }
    async createPage(pageTitle, contentMarkdown) {
      
     // visit the relative path /ghost/#/settings
      await this.driver.url(this.baseUrl + 'ghost/#/settings');

      //click on the pages menu option data-test-nav="pages"
      let element = await this.driver.$('[data-test-nav="pages"]');
      await element.click();

      // click on new page data-test-new-page-button=""
      element = await this.driver.$('[data-test-new-page-button]');
      await element.click();

      //input the title into the textarea data-test-editor-title-input=""
      elementContent = await this.driver.$(".koenig-editor__editor");
      await element.setValue(pageTitle);

      //click on the div with role="textbox"
      element = await this.driver.$('[role="textbox"]');
      await element.click();

      //type the contentMarkdown 
      await element.keys(contentMarkdown);

      // click on the preview button data-test-button="publish-preview"
      element = await this.driver.$('[data-test-button="publish-preview"]');
      await element.click();

      //click on the publish button (the one with s span with the test Publish inside)
      element = await this.driver.$('span=Publish');
      await element.click();

      // click on the continue button data-test-button="continue"
      element = await this.driver.$('[data-test-button="continue"]');
      await element.click();

      //click on publish page data-test-task-button-state="idle"
      element = await this.driver.$('[data-test-task-button-state="idle"]');
      await element.click();

     // look for the element with class data-test-publish-flow="complete"
      element = await this.driver.$('[data-test-publish-flow="complete"]');
      await element.waitForDisplayed();

      // navigate back to the relative path /dashboard
      await this.driver.url(this.baseUrl + 'ghost/#/dashboard');

    }

    async OpenAndCheckPage(pageTitle) {
      //Navigate to the path /pagetitle
      await this.driver.url(this.baseUrl + pageTitle);

      //look for the title element with css selector body > div.gh-viewport > main > article > header > h1
      let element = await this.driver.$('body > div.gh-viewport > main > article > header > h1');
      await element.waitForDisplayed();

      //look for the content section class="gh-content gh-canvas is-body"
      element = await this.driver.$('.gh-content.gh-canvas.is-body');
      await element.waitForDisplayed();
      
    }
  }
  module.exports = Page;