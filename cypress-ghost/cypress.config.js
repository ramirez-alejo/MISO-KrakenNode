// const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = {
  e2e: {
    specPattern: "**/*.feature",
    baseUrl: "http://localhost:2368/ghost",
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
  },
};
