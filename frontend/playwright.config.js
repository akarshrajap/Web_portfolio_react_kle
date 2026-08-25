// Playwright test configuration for portfolio frontend (ESM)
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  use: {
    headless: true,
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    ignoreHTTPSErrors: true
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
};

export default config;
