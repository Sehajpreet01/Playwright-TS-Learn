import { defineConfig } from '@playwright/test';

// Export the Playwright configuration with our custom settings
export default defineConfig({
  // Global settings for all tests
  use: {
    // The base URL for all our API requests - using JSONPlaceholder, a free fake API for testing
    baseURL: 'https://jsonplaceholder.typicode.com',
  },
  // Global timeout for tests (30 seconds)
  timeout: 30000,
  // Number of retry attempts for failed tests
  retries: 1,
  // Configure the test reporter to generate reports
  reporter: [
    ['html'], // Generate HTML reports for test results
    ['list']  // Show results in console as a list
  ],
});
