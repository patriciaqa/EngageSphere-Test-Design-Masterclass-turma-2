import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
  env: {
    API_URL: "http://localhost:3001",
    fixturesFolder: false,
    supportFile: false,
  },
});
