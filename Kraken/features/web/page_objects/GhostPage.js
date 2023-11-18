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
}