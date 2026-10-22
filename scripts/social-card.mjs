import { languages } from '../shared/languages.ts'
import { translateFor } from './translations.mjs'
import { readFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const font = (await readFile('app/assets/fonts/inter-latin-600.woff2')).toString('base64')
const browser = await chromium.launch({ headless: true })
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  for (const { code: language, socialImage } of languages) {
    if (!socialImage) continue
    const copy = [
      'CYBERSÉCURITÉ & RÉSEAUX',
      'Réseaux & cybersécurité',
      'ÉTUDIANT EN MASTER · URCA REIMS',
    ].map((text) => translateFor(text, language))
    await page.setContent(
      `<html lang="${language}"><head><style>@font-face{font-family:Inter;src:url(data:font/woff2;base64,${font});font-weight:600}*{box-sizing:border-box}body{margin:0;background:#0d1420;color:#ecf1f7;font-family:Inter,sans-serif}.card{width:1200px;height:630px;padding:64px;position:relative;overflow:hidden}.name{font-size:24px;letter-spacing:-1px}.eyebrow{font:12px monospace;letter-spacing:2px;color:#a9b7c9;margin-top:74px}h1{font-size:58px;line-height:1.12;letter-spacing:-3px;margin:22px 0;color:#ecf1f7}h1 span{color:#86b7ff}.bottom{position:absolute;bottom:48px;left:64px;right:64px;border-top:1px solid #2a3749;padding-top:22px;font:12px monospace;letter-spacing:2px;color:#a9b7c9}svg{position:absolute;right:-70px;top:80px;color:#86b7ff}</style></head><body><div class="card"><div class="name">k. &nbsp; Kylian Gachet</div><p class="eyebrow">${copy[0]}</p><h1>Kylian Gachet<br><span>${copy[1]}</span></h1><svg width="460" height="460" viewBox="0 0 460 460" fill="none"><circle cx="230" cy="230" r="200" stroke="currentColor" opacity=".18"/><circle cx="230" cy="230" r="150" stroke="currentColor" opacity=".22"/><ellipse cx="230" cy="230" rx="200" ry="65" transform="rotate(-40 230 230)" stroke="currentColor" opacity=".4"/><path d="m230 195 30 17v36l-30 17-30-17v-36z" fill="#1c2b40" stroke="currentColor"/><circle cx="80" cy="120" r="6" fill="currentColor"/><circle cx="345" cy="310" r="6" fill="currentColor"/></svg><div class="bottom">${copy[2]}</div></div></body></html>`,
    )
    await page.evaluate(() => document.fonts.ready)
    await page.screenshot({ path: `public/${socialImage}` })
  }
  console.log('Generated public/social-card.png (1200 × 630)')
} finally {
  await browser.close()
}
