const properties = require('../../../properties.json');
const fetch = require('node-fetch');

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
    
    async getInput(inputName) {
        return await this.driver.$(`[data-test-input="${inputName}"]`);
    }

    async setElementValue(selector, value) {
        const element = await this.driver.$(selector);
        await element.setValue(value);
    }

    async clickElement(selector) {
        const element = await this.driver.$(selector);
        await element.click();
    }

    async getTestData(dataUrl, method = 'GET') {
        const response = await fetch(dataUrl, { method: method });
        this.testData = await response.json();
    }
}