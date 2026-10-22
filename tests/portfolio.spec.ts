import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { siteSettings } from '../shared/site'

test.use({ baseURL: `http://127.0.0.1:4173${siteSettings().base}fr/` })

test('navigation, filters, project routes and browser back', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error' || /hydration/i.test(message.text())) errors.push(message.text())
  })
  await page.goto('./')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Kylian Gachet')
  await page.getByRole('link', { name: 'Voir mes projets' }).click()
  await expect(page.locator('.project-card')).toHaveCount(14)
  await page.getByRole('button', { name: 'Systèmes & qualité' }).click()
  await expect(page.locator('.project-card')).toHaveCount(4)
  await expect(page.locator('.results-count')).toContainText('4 projets')
  await page.getByRole('button', { name: 'Tous' }).click()
  await page.getByRole('link', { name: 'Bastion', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bastion')
  await page.reload()
  await expect(page.getByRole('heading', { name: 'Le projet', exact: true })).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL(/\/projets\/$/)
  expect(errors).toEqual([])
})

test('theme toggles directly and persists independently of system changes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('./')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByLabel('Thème d’affichage').click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.getByLabel('Thème d’affichage')).toHaveAttribute('aria-pressed', 'false')
  await page.getByLabel('Thème d’affichage').press('Enter')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.reload()
  await expect(page.getByLabel('Thème d’affichage')).toHaveAttribute('aria-pressed', 'true')
  await page.getByLabel('Thème d’affichage').press('Space')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('theme works when storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get: () => {
        throw new Error('Storage denied')
      },
    })
  })
  await page.goto('./')
  await page.getByLabel('Thème d’affichage').click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('mobile menu, escape and focus return', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('./')
  const button = page.getByRole('button', { name: 'Ouvrir le menu' })
  await button.click()
  await expect(page.getByRole('navigation')).toBeVisible()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Escape')
  await expect(button).toBeFocused()
  await button.click()
  await page.getByRole('navigation').getByRole('link', { name: 'Parcours' }).click()
  await expect(page).toHaveURL(/\/parcours\/$/)
  await expect(page.getByRole('navigation')).toBeHidden()
})

test('keyboard skip link and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  )
})

test('email copy succeeds and fails gracefully', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('./#contact')
  await page.getByRole('button', { name: 'Copier l’adresse email' }).click()
  await expect(page.getByRole('button', { name: 'Adresse copiée' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('kyliangachet@proton.me')
  await page.evaluate(() => {
    navigator.clipboard.writeText = () => Promise.reject(new Error('Denied'))
  })
  await page.getByRole('button', { name: 'Adresse copiée' }).click()
  await expect(page.locator('#contact [role="status"]')).toContainText('Copie indisponible')
})

for (const theme of ['light', 'dark'] as const) {
  for (const route of [
    './',
    './projets/',
    './parcours/',
    './projets/bastion/',
    './confidentialite/',
  ]) {
    test(`accessibility ${theme} ${route}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme })
      await page.goto(route)
      await expect(page.getByLabel('Thème d’affichage')).toBeEnabled()
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
      expect(results.violations).toEqual([])
    })
  }
}

for (const width of [320, 390, 768, 1440, 1920, 2560]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const route of ['./', './projets/', './parcours/', './projets/bastion/']) {
      await page.goto(route)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true)
      for (const card of await page.locator('.project-card').all()) {
        const cardBox = await card.boundingBox()
        const titleBox = await card.locator('h3').boundingBox()
        expect(cardBox).not.toBeNull()
        expect(titleBox).not.toBeNull()
        expect(titleBox!.y + titleBox!.height).toBeLessThanOrEqual(cardBox!.y + cardBox!.height)
      }
    }
  })
}

test('CSP, local resources and clean browser console', async ({ page }) => {
  const issues: string[] = []
  const external: string[] = []
  page.on('pageerror', (error) => issues.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error' || /hydration/i.test(message.text())) issues.push(message.text())
  })
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4173')) external.push(request.url())
  })
  const response = await page.goto('./')
  const headers = response?.headers()
  expect(headers?.['content-security-policy']).toContain("frame-ancestors 'none'")
  expect(headers?.['content-security-policy']).not.toContain('unsafe-inline')
  expect(headers?.['x-content-type-options']).toBe('nosniff')
  await page.getByRole('link', { name: 'Voir mes projets' }).click()
  await page.getByRole('link', { name: 'RAG documentaire', exact: true }).click()
  await page.getByLabel('Thème d’affichage').click()
  expect(issues).toEqual([])
  expect(external).toEqual([])
})

test('unknown routes return 404 with a working home link', async ({ page }) => {
  const response = await page.goto('./page-inconnue/')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('connection')
  await page.getByRole('link', { name: 'Back to home →' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Kylian Gachet')
})

test('core content and routes work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(baseURL!)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Kylian Gachet')
  await page.getByRole('link', { name: 'Voir mes projets' }).click()
  await expect(page.locator('.project-card')).toHaveCount(14)
  await page.getByRole('link', { name: 'Bastion', exact: true }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bastion')
  await context.close()
})

test('current profile comes from the supplied CV, without old applications', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kylian Gachet')
  await expect(page.locator('a[href="mailto:kyliangachet@proton.me"]')).toBeVisible()
  await expect(page.locator('body')).not.toContainText('Penser leur sécurité')
  await page.goto('./parcours/')
  await expect(page.locator('body')).toContainText('Université de Reims')
  await expect(page.getByRole('heading', { name: 'Mes centres d’intérêt' })).toBeVisible()
  await expect(page.locator('body')).toContainText('SEPT. 2023 — JUIN 2025')
  await expect(page.locator('body')).not.toContainText('Coffra')
  await expect(page.locator('body')).not.toContainText('Guerbet')
  await expect(page.locator('body')).not.toContainText('Aix-Marseille')
})

test('production CSP blocks an injected inline script', async ({ page }) => {
  await page.goto('./')
  const result = await page.evaluate(async () => {
    const violation = new Promise<string>((resolve) => {
      document.addEventListener(
        'securitypolicyviolation',
        (event) => resolve(event.effectiveDirective),
        { once: true },
      )
    })
    const script = document.createElement('script')
    script.textContent = 'document.documentElement.dataset.unsafeExecuted = "yes"'
    document.body.append(script)
    return { directive: await violation, executed: document.documentElement.dataset.unsafeExecuted }
  })
  expect(result.directive).toBe('script-src-elem')
  expect(result.executed).toBeUndefined()
})
