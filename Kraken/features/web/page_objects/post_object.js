const expect = require('chai').expect;
class Post {
  constructor(driver, host) {
    this.driver = driver;
    this.baseUrl = host;
  }

  async goToSettings() {
    // visit the relative path /ghost/#/settings
    await this.driver.url(this.baseUrl + "ghost/#/settings");
  }

  async selectPostsFromMenu() {
    //click on the posts menu option data-test-nav="posts"
    let element = await this.driver.$('[data-test-nav="posts"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async newPost() {
    // click on new posts data-test-new-post-button=""
    let element = await this.driver.$('[data-test-new-post-button]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async setPostTitle(title) {
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

  async previewPage() {
    // click on the preview button data-test-button="publish-preview"
    let element = await this.driver.$('[data-test-button="publish-preview"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async createDraftPost(title, content) {

    await this.goToSettings();

    await this.selectPostsFromMenu();

    await this.newPost();

    await this.setPostTitle(title);

    await this.setMarkdownContent(content);

    await this.previewPage();


  }

  async selectPostFromPagesList(title) {
    //look for the element with x path //li[contains(a, 'page_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async previewPost() {
    // click on the preview button data-test-button="publish-preview"
    let element = await this.driver.$('[data-test-button="publish-preview"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async publishPostPreview() {
    // click on the publish button (the one with s span with the test Publish inside)
    let element = await this.driver.$("span=Publish");
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async continuePostPublication() {
    // click on the continue button data-test-button="continue"
    let element = await this.driver.$('[data-test-button="continue"]');
    await element.waitForDisplayed(15000);
    await element.click();

    //class="gh-btn gh-btn-black gh-btn-large
  }

  async confirmPostPublication() {
    //click on publish page data-test-task-button-state="idle"
    let element = await this.driver.$('[data-test-task-button-state="idle"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async navigateToDashboard() {
    // navigate back to the relative path /dashboard
    await this.driver.url(this.baseUrl + "ghost/#/dashboard");
  }

  async createPost(title, content) {

    await this.createDraftPost(title, content);

    await this.publishPostPreview();

    // We need a little wait here to make sure the button is clickable
    await this.driver.pause(1000);

    await this.continuePostPublication();

    await this.confirmPostPublication();

    // look for the element with class data-test-publish-flow
    //element = await this.driver.$('[data-test-publish-flow]');
    //await element.waitForDisplayed(15000);

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

  async openAndCheckPublished(title, content) {
    //Navigate to the path /pagetitles
    await this.driver.url(this.baseUrl + title);
    await this.checkPublishedTitle(title);
    if (content)
      await this.checkPublishedContent(content);
  }

  async checkPostDraft(title) {
    // Navigate to the path /ghost/#/posts?search=title
    await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);

    //look for the element with x path //li[contains(a, 'Post_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);

    // click on button with title="Close"
    element = await this.driver.$('[title="Close"]');
    await element.waitForDisplayed(15000);
    await element.click();

    // navigate back to the relative path /dashboard
    await this.driver.url(this.baseUrl + 'ghost/#/dashboard');
  }


  async editPost(title, newTitle, newContent) {
    // Navigate to the path /ghost/#/posts?search=title
    await this.openPost(title);

    await this.setPostTitle(newTitle);
    await this.setMarkdownContent(newContent);

    await this.confirmPostPublication();

    //Add a little wait to make sure the button is clickable
    await this.driver.pause(1000);

    // navigate back to the relative path /dashboard
    await this.navigateToDashboard();
  }

  async openPost(title) {
    await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);
    //look for the element with x path //li[contains(a, 'Post_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async unPublishPost(title) {
    // Navigate to the path /ghost/#/posts?search=title
    await this.driver.url(this.baseUrl + 'ghost/#/posts?search=' + title);

    //look for the element with x path //li[contains(a, 'Post_1')]
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

    await this.driver.pause(1000);

    //expect a 404 error
    let element = await this.driver.$('h1=404');
    await element.waitForDisplayed(15000);
  }

  async openPostAdvancedOptions() {
    //look for the element with class data-test-psm-trigger
    let element = await this.driver.$("[data-test-psm-trigger]");
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async deletePost(title) {
    await this.openPost(title);

    await this.openPostAdvancedOptions();

    // Look for a button inside a div with class settings-menu-delete-button
    let element = await this.driver.$('.settings-menu-delete-button');
    await element.waitForDisplayed(15000);
    await element.click();

    // confirm click on element with class gh-btn gh-btn-red gh-btn-icon
    element = await this.driver.$('.gh-btn.gh-btn-red.gh-btn-icon');
    await element.waitForDisplayed(15000);
    await element.click();

    // navigate back to the relative path /dashboard
    await this.navigateToDashboard();

  }

  async openSettingsMenu(title) {
    await this.openPost(title);
    await this.toggleSettingsMenu();
  }

  async toggleSettingsMenu() {
    const element = await this.driver.$('.settings-menu-toggle');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async addTag(tag) {
    const element = this.driver.$('#tag-input > ul > input[type="search"]');
    await element.setValue(tag);
    await this.driver.keys(['Enter']);
  }

  async saveChanges() {
    const element = await this.driver.$('.gh-editor-save-trigger');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async postHasTheTag(number, tag) {
    let element = await this.driver.$('.posts-list.gh-list');
    await element.waitForDisplayed(15000);
    element = await this.driver.$('.gh-contentfilter-menu.gh-contentfilter-tag');
    await element.click();
    element = await this.driver.$('.gh-contentfilter-menu-dropdown');
    await element.waitForDisplayed(15000);
    element = await element.$(`li=${tag}`);
    await element.click();
    element = await this.driver.$(`//li[contains(a, "Post_${number}")]`);
    await element.waitForDisplayed(15000);
    return await element.isExisting();
  }
}
module.exports = Post;