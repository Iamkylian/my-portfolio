import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import { siteSettings } from '../shared/site.ts'

await mkdir('test-results', { recursive: true })
const browser = await chromium.launch()
try {
  for (const [name, width, height, colorScheme] of [
    ['desktop-light', 1440, 1000, 'light'],
    ['desktop-dark', 1440, 1000, 'dark'],
    ['mobile-light', 390, 844, 'light'],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      colorScheme,
      deviceScaleFactor: 1,
    })
    await page.goto(`http://127.0.0.1:4173${siteSettings().base}`, { waitUntil: 'networkidle' })
    await page.screenshot({ path: `test-results/${name}.png`, fullPage: true })
    console.log(`Captured ${name}`)
    await page.close()
  }
} finally {
  await browser.close()
}
