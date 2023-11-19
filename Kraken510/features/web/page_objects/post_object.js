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
      let element = await this.driver.$('[href="#/posts/"]');
      await element.click();

      // click on new posts href="#/editor/post/"
      element = await this.driver.$('[href="#/editor/post/"]');
      await element.click();

      //input the title into the textarea data-test-editor-title-input=""
      element = await this.driver.$('[class="gh-editor-title ember-text-area gh-input ember-view"]');
      await element.setValue(title);

      //click on the div with role="textbox"
      element = await this.driver.$('[data-koenig-dnd-droppable="true"]');
      await element.click();

      //type the contentMarkdown 
      await element.setValue(content);

      // click on the preview button 
      element = await this.driver.$('[class="gh-btn gh-btn-editor gh-editor-preview-trigger"]');
      await element.waitForDisplayed(15000);
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
      element = await this.driver.$('[class="gh-btn gh-btn-black gh-btn-large"]');
      element.waitForDisplayed(15000);
      await element.click();

      //click on publish post data-test-button="confirm-publish"
      element = await this.driver.$('[class="gh-btn gh-btn-large gh-btn-pulse ember-view"]');
      await element.click();

     // look for the element with class data-test-publish-flow
     //element = await this.driver.$('[data-test-publish-flow]');
     //await element.waitForDisplayed(15000);

     //Give a little wait to complete
      await this.driver.pause(1000);

      // navigate back to the relative path /dashboard
      await this.driver.url(this.baseUrl + 'ghost/#/dashboard');
    }

    async OpenAndCheck(title) {
      //Navigate to the path /pagetitle
      await this.driver.url(this.baseUrl + title);
  
      //look for the title element with class gh-article-title is-title
      let element = await this.driver.$('[class="article-title"]');
      await element.waitForDisplayed(15000);
  
      //look for the content section class gh-content gh-canvas is-body
      element = await this.driver.$('[class="gh-content gh-canvas"]');
      await element.waitForDisplayed(15000);
    }

    async CheckPostDraft(title) {
      // Navigate to the path /ghost/#/posts?search=title
      await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);

      //look for the element with x path //li[contains(a, 'Post_1')]
      let element = await this.driver.$('//li[contains(a, "' + title + '")]');
      await element.waitForDisplayed(15000);

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
      await element.waitForDisplayed(15000);
      await element.click();

      //look for the element with class gh-editor-title ember-text-area gh-input ember-view
      element = await this.driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
      await element.waitForDisplayed(15000);
      await element.setValue(newTitle);

      //look for the element with class data-kg="editor"
      element = await this.driver.$('[data-kg="editor"]');
      await element.waitForDisplayed(15000);
      await element.click();

      //type the contentMarkdown 
      await element.keys(newContent);

      // click on class="gh-btn gh-btn-editor gh-editor-save-trigger green ember-view"
      element = await this.driver.$('[class="gh-btn gh-btn-editor gh-editor-save-trigger green ember-view"]');
      await element.click();

      // get the element with  class class="class="ember-view gh-btn-editor gh-editor-back-button"
      element = await this.driver.$('[class="ember-view gh-btn-editor gh-editor-back-button"]');
      await element.click();

      //Add a little wait to make sure the button is clickable
      await this.driver.pause(1000);

      // navigate back to the relative path /dashboard
      await this.driver.url(this.baseUrl + 'ghost/#/dashboard');
    }


    async UnPublishPost(title) {
      // Navigate to the path /ghost/#/posts?search=title
      await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);

      //look for the element with x path //li[contains(a, 'Post_1')]
      let element = await this.driver.$('//li[contains(a, "' + title + '")]');
      await element.waitForDisplayed(15000);
      await element.click();

      //get the element with class class="gh-btn gh-btn-editor darkgrey gh-unpublish-trigger"
      element = await this.driver.$('[class="gh-btn gh-btn-editor darkgrey gh-unpublish-trigger"]');
      await element.click();

      //click on the unpublish button data-test-button="revert-to-draft"
      element = await this.driver.$('[class="gh-revert-to-draft"]');
      await element.click();

      // We need a little wait here to make sure the button is clickable
      await this.driver.pause(1000);

    }

    async CheckIsNotAvailable(title) {
      //Navigate to the path /pagetitle
      await this.driver.url(this.baseUrl + title);
  
      //expect a 404 error
      let element = await this.driver.$('h1=404');
      await element.waitForDisplayed(15000);
    }

    async DeletePost(title) {
      // Navigate to the path /ghost/#/posts?search=title
      await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);

      //look for the element with x path //li[contains(a, 'Post_1')]
      let element = await this.driver.$('//li[contains(a, "' + title + '")]');
      await element.waitForDisplayed(15000);
      await element.click();

      //look for the element with class data-test-psm-trigger
      element = await this.driver.$('[class="settings-menu-toggle gh-btn gh-btn-editor gh-btn-icon icon-only gh-btn-action-icon"]');
      await element.click();

      // Look for a button inside a div with class settings-menu-delete-button
      element = await this.driver.$('[class="gh-btn gh-btn-hover-red gh-btn-icon settings-menu-delete-button"]');
      await element.waitForDisplayed(15000);
      await element.click();

      // confirm click on element with class gh-btn gh-btn-red gh-btn-icon
      element = await this.driver.$('.gh-btn.gh-btn-red.gh-btn-icon');
      await element.click();

      // navigate back to the relative path /dashboard
      await this.driver.url(this.baseUrl + 'ghost/#/dashboard');

    }

  }
  module.exports = Post;