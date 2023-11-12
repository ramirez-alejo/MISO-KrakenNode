const expect = require('chai').expect;
class Post {
    constructor(driver, host) {
    this.driver = driver;
    this.baseUrl = 'http://localhost:2368/';

    if (host && host !== '<Host>') {
      this.baseUrl = host;
    }

    }
    async createDraftPost(title, content) {
      
     // visit the relative path /ghost/#/settings
      await this.driver.url(this.baseUrl + 'ghost/#/settings');

      //click on the posts menu option data-test-nav="posts"
      let element = await this.driver.$('[data-test-nav="posts"]');
      await element.click();

      // click on new posts data-test-new-post-button=""
      element = await this.driver.$('[data-test-new-post-button]');
      await element.click();

      //input the title into the textarea data-test-editor-title-input=""
      element = await this.driver.$(".gh-editor-title.ember-text-area.gh-input.ember-view");
      await element.setValue(title);

      //click on the div with role="textbox"
      element = await this.driver.$('[role="textbox"]');
      await element.click();

      //type the contentMarkdown 
      await element.keys(content);

      // click on the preview button data-test-button="publish-preview"
      element = await this.driver.$('[data-test-button="publish-preview"]');
      await element.click();


    }

    async createPost(title, content)
    {

      await this.createDraftPost(title, content);

      // get the element with  class gh-publish-trigger
      let element = await this.driver.$('.gh-publish-trigger');
      await element.click();
      
      // We need a little wait here to make sure the button is clickable
      await this.driver.pause(1000);

      // click on the continue button with xpath //button[contains(span, 'Continue, final review →')]
      element = await this.driver.$('//button[contains(span, "Continue")]');
      element.waitForDisplayed();
      await element.click();

      //click on publish post data-test-button="confirm-publish"
      element = await this.driver.$('[data-test-button="confirm-publish"]');
      await element.click();

     // look for the element with class data-test-publish-flow="complete"
      element = await this.driver.$('[data-test-publish-flow="complete"]');
      await element.waitForDisplayed();

      // navigate back to the relative path /dashboard
      await this.driver.url(this.baseUrl + 'ghost/#/dashboard');
    }

    async OpenAndCheck(title) {
      //Navigate to the path /pagetitle
      await this.driver.url(this.baseUrl + title);
  
      //look for the title element with class gh-article-title is-title
      let element = await this.driver.$('.gh-article-title.is-title');
      await element.waitForDisplayed();
  
      //look for the content section class gh-content gh-canvas is-body
      element = await this.driver.$('.gh-content.gh-canvas.is-body');
      await element.waitForDisplayed();
    }

    async CheckPostDraft(title) {
      // Navigate to the path /ghost/#/posts?search=title
      await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);

      //look for the element with x path //li[contains(a, 'Post_1')]
      let element = await this.driver.$('//li[contains(a, "' + title + '")]');
      await element.waitForDisplayed();

      // click on button with title="Close"
      element = await this.driver.$('[title="Close"]');   
      await element.click();

      // navigate back to the relative path /dashboard
      await this.driver.url(this.baseUrl + 'ghost/#/dashboard');
    }

    async EditPost(title, newTitle, newContent) {
      // Navigate to the path /ghost/#/posts?search=title
      await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);

      //look for the element with x path //li[contains(a, 'Post_1')]
      let element = await this.driver.$('//li[contains(a, "' + title + '")]');
      await element.waitForDisplayed();
      await element.click();

      //look for the element with class gh-editor-title ember-text-area gh-input ember-view
      element = await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
      await element.waitForDisplayed();
      await element.setValue(newTitle);

      //look for the element with class data-kg="editor"
      element = await this.driver.$('[data-kg="editor"]');
      await element.waitForDisplayed();
      await element.click();

      //type the contentMarkdown 
      await element.keys(newContent);

      // get the element with  class data-test-task-button-state="idle"
      element = await this.driver.$('[data-test-task-button-state="idle"]');
      await element.click();

      // navigate back to the relative path /dashboard
      await this.driver.url(this.baseUrl + 'ghost/#/dashboard');
    }


    async UnPublishPost(title) {
      // Navigate to the path /ghost/#/posts?search=title
      await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);

      //look for the element with x path //li[contains(a, 'Post_1')]
      let element = await this.driver.$('//li[contains(a, "' + title + '")]');
      await element.waitForDisplayed();
      await element.click();

      //get the element with class data-test-button="update-flow"
      element = await this.driver.$('[data-test-button="update-flow"]');
      await element.click();

      //click on the unpublish button data-test-button="revert-to-draft"
      element = await this.driver.$('[data-test-button="revert-to-draft"]');
      await element.click();
    }

    async CheckIsNotAvailable(title) {
      //Navigate to the path /pagetitle
      await this.driver.url(this.baseUrl + title);
  
      //expect a 404 error
      let element = await this.driver.$('h1=404');
      await element.waitForDisplayed();
    }

    async DeletePost(title) {
      // Navigate to the path /ghost/#/posts?search=title
      await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);

      //look for the element with x path //li[contains(a, 'Post_1')]
      let element = await this.driver.$('//li[contains(a, "' + title + '")]');
      await element.waitForDisplayed();
      await element.click();

      //look for the element with class data-test-psm-trigger
      element = await this.driver.$('[data-test-psm-trigger]');
      await element.click();

      // Look for a button inside a div with class settings-menu-delete-button
      element = await this.driver.$('.settings-menu-delete-button');
      await element.waitForDisplayed();
      await element.click();

      // confirm click on element with class gh-btn gh-btn-red gh-btn-icon
      element = await this.driver.$('.gh-btn.gh-btn-red.gh-btn-icon');
      await element.click();

      // navigate back to the relative path /dashboard
      await this.driver.url(this.baseUrl + 'ghost/#/dashboard');

    }

  }
  module.exports = Post;