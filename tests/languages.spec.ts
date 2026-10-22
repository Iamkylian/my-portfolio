import { test, expect, type Page } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import AxeBuilder from '@axe-core/playwright'
import { projects } from '../app/data/projects'
import { languages, sourceLanguage } from '../shared/languages'
import { translate, validateDictionary, type Dictionaries } from '../shared/translations'

const dictionaries: Dictionaries = Object.fromEntries(
  await Promise.all(
    languages
      .filter(({ code }) => code !== sourceLanguage)
      .map(async ({ code }) => [
        code,
        validateDictionary(
          JSON.parse(
            await readFile(new URL(`../app/locales/${code}.json`, import.meta.url), 'utf8'),
          ),
          code,
        ),
      ]),
  ),
)

async function switchLanguage(page: Page, label: string) {
  const summary = page.locator('.language-picker summary')
  if (await summary.count()) await summary.click()
  await page.getByRole('link', { name: label }).click()
}

test('English is the default, even with a French browser preference', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ locale: 'fr-FR' })
  const page = await context.newPage()
  await page.goto(baseURL!)
  await expect(page).toHaveURL(new URL('en/', baseURL).href)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('link', { name: 'View my projects' })).toBeVisible()
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Home', exact: true }),
  ).toBeVisible()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await context.close()
})

test('switching preserves the project, query, fragment and theme', async ({ page, baseURL }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.goto('./projets/bastion/?view=details#main')
  await page.getByLabel('Display theme').click()
  await switchLanguage(page, 'Passer en français')
  await expect(page).toHaveURL(/\/fr\/projets\/bastion\/\?view=details#main$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  await expect(page.getByRole('heading', { name: 'Le projet', exact: true })).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
  await expect(page.getByLabel('Thème d’affichage')).toHaveAttribute('aria-pressed', 'true')
  await switchLanguage(page, 'Switch to English')
  await expect(page).toHaveURL(new URL('en/projets/bastion/?view=details#main', baseURL).href)
  expect(new URL(page.url()).pathname).not.toContain('/fr/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { name: 'The project', exact: true })).toBeVisible()
  expect(errors).toEqual([])
})

test('French navigation keeps its language and contact anchor', async ({ page, baseURL }) => {
  await page.goto('./fr/projets/')
  await page.getByRole('navigation').getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page).toHaveURL(/\/fr\/#contact$/)
  await switchLanguage(page, 'Switch to English')
  await expect(page).toHaveURL(new URL('en/#contact', baseURL).href)
  expect(new URL(page.url()).pathname).not.toContain('/fr/')
  await expect(page.getByRole('heading', { name: 'Contact me' })).toBeVisible()
  await page.getByRole('navigation').getByRole('link', { name: 'Background', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { name: 'My background' })).toBeVisible()
})

for (const { code: language } of languages) {
  test(`all project pages are translated and usable without JavaScript: ${language}`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    for (const project of projects) {
      const response = await page.goto(
        new URL(`${language}/projets/${project.slug}/`, baseURL).href,
      )
      expect(response?.status()).toBe(200)
      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(
        translate(project.title, language, dictionaries),
      )
      await expect(page.locator('.project-prose').locator('p').first()).toHaveText(
        translate(project.overview, language, dictionaries),
      )
      const switcher = page.locator('.language-picker a:not([aria-current])')
      await expect(switcher).toHaveCount(languages.length - 1)
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
      expect(canonical).toContain(`${language}/projets/${project.slug}/`)
      for (const { code } of languages) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${code}"]`)).toHaveCount(1)
      }
    }
    await page.goto(new URL(`${language}/`, baseURL).href)
    const target = languages.find(({ code }) => code !== language)!
    await switchLanguage(page, target.switchLabel)
    await expect(page.locator('html')).toHaveAttribute('lang', target.code)
    await context.close()
  })
}

for (const theme of ['light', 'dark'] as const) {
  test(`English accessibility and header layout: ${theme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme })
    for (const route of [
      './',
      './parcours/',
      './projets/',
      './projets/ctf-cyber-resilience/',
      './confidentialite/',
    ]) {
      await page.goto(route)
      await expect(page.getByLabel('Display theme')).toBeEnabled()
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
      expect(result.violations).toEqual([])
    }
    for (const width of [320, 390, 620, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('./')
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      )
      const logo = await page.locator('.wordmark').boundingBox()
      const actions = await page.locator('.header-actions').boundingBox()
      expect(logo!.x + logo!.width).toBeLessThanOrEqual(actions!.x)
      const menu = page.getByRole('button', { name: 'Open menu' })
      if (await menu.isVisible()) {
        await menu.click()
        await page.getByRole('navigation').getByRole('link', { name: 'Background' }).click()
        await expect(page.getByRole('navigation')).toBeHidden()
      }
    }
  })
}

test('old URLs redirect to explicit English paths without JavaScript', async ({
  browser,
  baseURL,
  request,
}) => {
  const response = await request.get(new URL('projets/bastion/?source=old', baseURL).href, {
    maxRedirects: 0,
  })
  expect(response.status()).toBe(301)
  expect(response.headers().location).toBe(
    `${new URL('en/projets/bastion/', baseURL).pathname}?source=old`,
  )
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(new URL('?source=home#contact', baseURL).href)
  await expect(page).toHaveURL(new URL('en/?source=home#contact', baseURL).href)
  await expect(page.getByRole('heading', { name: 'Contact me' })).toBeVisible()
  await context.close()
})

test('static-host fallback preserves the old project URL query and fragment', async ({
  page,
  baseURL,
}) => {
  const old = new URL('projets/bastion/?source=static', baseURL).href
  const html = await readFile('.output/public/projets/bastion/index.html', 'utf8')
  await page.route(old, (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: html }),
  )
  await page.goto(`${old}#main`)
  await expect(page).toHaveURL(new URL('en/projets/bastion/?source=static#main', baseURL).href)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bastion')
})
