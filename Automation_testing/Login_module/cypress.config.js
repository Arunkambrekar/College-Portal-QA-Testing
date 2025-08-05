const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // no plugin setup needed for now
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
  },

  // ✅ Add reporter configuration for mochawesome
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports/html",  // ✅ folder where reports are saved
    overwrite: false,
    html: true,
    json: true,
  },
});
