const properties = require('../../../properties.json');

module.exports = class GhostPage {

    constructor(driver) {
        this.baseUrl = properties.Host + 'ghost/';
        this.driver = driver;
    }
    /**   
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page)
    */
    async open(path = '') {
        await this.driver.url(`${this.baseUrl}${path}`);
    }

    async setInput(inputName, value) {
        await this.setElementValue(`[data-test-input="${inputName}"]`, value);
    }   

    async setElementValue(selector, value) {
        const element = await this.driver.$(selector);
        await element.setValue(value);
    }

    async clickElement(selector) {
        const element = await this.driver.$(selector);
        await element.click();
    }
}