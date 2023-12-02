const GhostPage = require('./GhostPage');
const expect = require('chai').expect;
class Post extends GhostPage {
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

  async selectPostsFromMenu() {
    //click on the posts menu option data-test-nav="posts"
    let element = await this.driver.$('[data-test-nav="posts"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async clickOnNewPost() {
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

  async goBackToPostList() {
    // click on the preview button data-test-button="publish-preview"
    let element = await this.driver.$('[data-test-button="publish-preview"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async draftPostCreationFromTestData(index) {
    if (index)
    {
        if (index < 0 || index >= this.testData.length) {
          throw new Error("Invalid index");
        }
        const title = this.testData[index].pageTitle;
        return await this.draftPostCreation(title, this.testData[index].pageContent);
    }

    //lets grab a random index
    const randomIndex = Math.floor(Math.random() * this.testData.length);
    const title = this.testData[randomIndex].pageTitle;
    return await this.draftPostCreation(title, this.testData[randomIndex].pageContent);
  }

  async draftPostCreationFromTestDataWithDetails(elementSelector, index) {
    if (index)
    {
        if (index < 0 || index >= this.testData.length) {
          throw new Error("Invalid index");
        }
        const title = this.testData[index].title;
        return await this.draftPostCreation(title, this.testData[index], elementSelector);
    }

    //lets grab a random index
    const randomIndex = Math.floor(Math.random() * this.testData.length);
    const title = this.testData[randomIndex].title;
    return await this.draftPostCreationWitDetails(title, this.testData[randomIndex], elementSelector);
  }

  async draftPostCreationWitDetails(title, details, elementSelector) {
    await this.draftPostCreation(title, details.content);
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


  async draftPostCreation(title, content) {
    await this.goToSettings();

    await this.selectPostsFromMenu();

    await this.clickOnNewPost();

    await this.setPostTitle(title);

    await this.setMarkdownContent(content);
  }

  async createDraftPost(title, content) {
    await this.draftPostCreation(title, content);
    await this.goBackToPostList();
  }

  async selectPostFromPostsList(title) {
    //look for the element with x path //li[contains(a, 'post_1')]
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
    //click on publish post data-test-task-button-state="idle"
    let element = await this.driver.$('[data-test-task-button-state="idle"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async navigateToDashboard() {
    // navigate back to the relative path /dashboard
    await this.driver.url(this.rootUrl + "ghost/#/dashboard");
  }

  async createPost(title, content) {

    await this.createDraftPost(title, content);

    await this.previewPost();

    // We need a little wait here to make sure the button is clickable
    await this.driver.pause(3000);
    await this.publishPostPreview();

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
    //Navigate to the path /poststitles
    await this.driver.url(this.rootUrl + title);
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

    // navigate back to the relative path /dashboard
    await this.navigateToDashboard();
  }

  async waitForAutosaveToComplete() {
    // get the element with  class data-test-task-button-state="idle"
    let element = await this.driver.$('[data-test-task-button-state="idle"]');
    await element.waitForDisplayed(15000);
    await element.click();
  }


  async editPost(title, newTitle, newContent) {
    // Navigate to the path /ghost/#/posts?search=title
    await this.openPostToEdit(title);

    await this.setPostTitle(newTitle);
    await this.setMarkdownContent(newContent);

    await this.waitForAutosaveToComplete();

    await this.navigateToDashboard();
  }

  async navigateToPostsSettings() {
    await this.driver.url(this.rootUrl + "ghost/#/posts");
  }

  async openPostToEdit(title) {
    await this.navigateToPostsSettings();

    await this.driver.url(this.rootUrl + "ghost/#/posts");
    //look for the element with x path //li[contains(a, 'post_1')]
    let element = await this.driver.$('//li[contains(a, "' + title + '")]');
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async unPublishPost(title) {
    await this.openPostToEdit(title);

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
    //Navigate to the path /posttitle
    await this.driver.url(this.rootUrl + title);

    //expect a 404 error
    let element = await this.driver.$("h1=404");
    await element.waitForDisplayed(15000);
  }

  async openPostAdvancedOptions() {
    //look for the element with class data-test-psm-trigger
    let element = await this.driver.$("[data-test-psm-trigger]");
    await element.waitForDisplayed(15000);
    await element.click();
  }

  async deletePost(title) {
    await this.openPostToEdit(title);
    await this.openPostAdvancedOptions();
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
    await this.openPostToEdit(title);
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

  async postHasTheTag(number, tag) {
    let element = await this.driver.$('.posts-list.gh-list');
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
    element = await this.driver.$(`//li[contains(a, "Post_${number}")]`);
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
    // Get the whole post html
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
    await this.openPostAdvancedOptions();
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

  async checkPostHistory(title) {
    await this.openSettingsMenu(title);
    
    let element = await this.driver.$('[data-test-toggle="post-history"]');
    await element.waitForDisplayed(15000);
    await element.click();

    //shoudl show an ul with class class="nav-list"
    element = await this.driver.$('[class="nav-list"]');
    await element.waitForDisplayed(15000);


    //should have more than 1 li with class class="nav-list-item"
    let elements = await this.driver.$$('.nav-list-item');
    await elements[0].waitForDisplayed(15000);
    expect(elements.length).to.be.greaterThan(1);


  }


}
module.exports = Post;