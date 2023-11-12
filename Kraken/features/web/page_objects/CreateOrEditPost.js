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
      element = await this.driver.$('[data-test-editor-title-input]');
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


      // click on the continue button with class data-test-button="continue"
      element = await this.driver.$('[data-test-button="continue"]');
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
   
    }
  }
  module.exports = Post;