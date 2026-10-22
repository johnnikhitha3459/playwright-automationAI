// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  expect: {
    timeout: 10000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results' }],
  ],
  use: {
    baseURL: process.env.DEMOBLAZE_BASE_URL || 'https://www.demoblaze.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: '**/api.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: '**/api.spec.js',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: '**/api.spec.js',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'api',
      testMatch: '**/api.spec.js',
      use: {
        baseURL: process.env.DEMOBLAZE_API_URL || 'https://api.demoblaze.com',
      },
    },
  ],
});
