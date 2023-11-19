const GhostPage = require('./GhostPage');
class LoginPage extends GhostPage {
  constructor(driver) {
    super(driver);
  }
  async login(username, password) {
    // First navitage to the login page
    await this.open('#/signin');
    // find element #identification
    let userElement = await this.driver.$('#identification');
    await userElement.setValue(username);
    // Enter the password
    let passElement = await this.driver.$('#password');
    await passElement.setValue(password);

    // Click the login button
    let loginElement = await this.driver.$('#ember5');
    await loginElement.click();

    // Expect to see a div with the class gh-dashboard
    await this.driver.$('.gh-nav-list.gh-nav-manage').waitForDisplayed(5000);
  }
}
module.exports = LoginPage;