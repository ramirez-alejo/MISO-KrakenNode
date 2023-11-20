const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = {
  e2e: {
    specPattern: "**/*.feature",
    baseUrl: "https://equipo16-568.azurewebsites.net/ghost",
    defaultCommandTimeout: 30000,
    requestTimeout:30000,
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
    },
  },
};
