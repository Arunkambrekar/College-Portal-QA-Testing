const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js"
    // No baseUrl here!
  },
  // ❌ Remove reporter if you don't need mochawesome or didn't install it
  env: {
    allure: true,
    allureResultsPath: "allure-results"
  }
});
