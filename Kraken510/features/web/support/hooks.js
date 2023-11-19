const { After, Before, AfterStep, BeforeStep } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');
const fs = require('fs');

Before(async function () {
  this.deviceClient = new WebClient('chrome', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
})

BeforeStep(function () {
  this.currentStep = (this.currentStep || 0) + 1;
})

AfterStep(async function (code) {
  const filePath = `./reports/screenshots/${code.gherkinDocument.feature.name}/${code.pickle.name}`
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }
  await this.driver.saveScreenshot(`${filePath}/${this.currentStep}.png`)
})

After(async function () {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});