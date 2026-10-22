import { defineConfig } from '@playwright/test'
import { siteSettings } from './shared/site'

const baseURL = `http://127.0.0.1:4173${siteSettings().base}`
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 30000,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL,
    browserName: 'chromium',
    viewport: { width: 1440, height: 1000 },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/preview.mjs',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
})
