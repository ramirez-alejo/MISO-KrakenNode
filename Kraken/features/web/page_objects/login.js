class LoginPage {
    constructor(driver) {
    this.driver = driver;
    }
    async login(username, password) {
      // First navitage to the login page
      await this.driver.url('http://localhost:2368/ghost/');
      // Enter the email address
      let element = await this.driver.$('#identification');
      await element.setValue(username);
      // Enter the password
      element = await this.driver.$('#password');
      await element.setValue(password);
  
      // Click the login button
      element = await this.driver.$('#ember5');
      await element.click();

      // Expect to see a div with the class gh-dashboard
      await this.driver.$('.gh-nav-list.gh-nav-manage').waitForDisplayed();
    }
  }
  module.exports = LoginPage;