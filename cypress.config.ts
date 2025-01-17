import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});


module.exports = {
  e2e: {
    baseUrl: 'http://localhost:4200', // Replace with your localhost URL
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}"
  },
};

