// cypress.config.js (in the root folder)
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "Automation_testing/Login_module/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "Automation_testing/Login_module/cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      return config;
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "Automation_testing/Login_module/cypress/reports/html",
    overwrite: false,
    html: true,
    json: true,
  },
});
