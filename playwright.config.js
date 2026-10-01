// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  timeout: 60 * 1000,

  expect: {
    timeout: 10000
  },

  reporter: [
    ['html', { open: 'on-failure' }]
  ],

  outputDir: 'test-results',

  use: {

    // Base URL
    baseURL: 'https://rahulshettyacademy.com/client',

    // Browser
    browserName: 'chromium',

    headless: false,

    launchOptions: {
      slowMo: 1000
    },

    // Login Once (We'll use this later)
   // storageState: 'playwright/.auth/user.json',

    viewport: {
      width: 1536,
      height: 730
    },

    ignoreHTTPSErrors: true,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    actionTimeout: 15000,

    navigationTimeout: 30000,

    testIdAttribute: 'data-testid'

  },

  projects: [

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }

    /*
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      }
    }
    */

  ]

});