const GhostPage = require('./GhostPage');
class LoginPage extends GhostPage {
  constructor(driver) {
    super(driver);
  }
  async login(username, password) {
    // First navitage to the login page
    await this.open();
    // find element #identification
    let userElement = await this.driver.$('[type="email"]');
    await userElement.setValue(username);
    // Enter the password
    let passElement = await this.driver.$('[type="password"]');
    await passElement.setValue(password);

    // Click the login button
    let loginElement = await this.driver.$('[type="submit"]');
    await loginElement.click();

    // Expect to see a div with the class gh-dashboard
    await this.driver.$('.gh-nav-list.gh-nav-manage').waitForDisplayed(5000);
  }
}
module.exports = LoginPage;