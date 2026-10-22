import { spawnSync } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

// Reviewed build-tool exceptions, never a claim of zero vulnerabilities.
// Reassess within one month or fail closed.
const exceptions = new Map([
  ['https://github.com/advisories/GHSA-vfj7-8cjw-p6xm', { name: 'braces', version: '3.0.3' }],
  ['https://github.com/advisories/GHSA-86w9-cpqp-85rv', { name: 'node-forge', version: '1.4.0' }],
])
const expiry = new Date('2026-11-17T00:00:00Z')
const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const result = spawnSync(command, ['audit', '--json'], {
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024,
})
if (result.error) throw result.error
const report = JSON.parse(result.stdout)
if (report.error || !report.metadata)
  throw new Error(`Audit unavailable: ${JSON.stringify(report.error || result.stderr)}`)
await mkdir('.cache/reports', { recursive: true })
await writeFile('.cache/reports/npm-audit.json', `${JSON.stringify(report, null, 2)}\n`)
const lock = JSON.parse(await readFile('package-lock.json', 'utf8'))
let failure = false
const observed = new Set()
for (const vulnerability of Object.values(report.vulnerabilities)) {
  for (const advisory of vulnerability.via.filter((value) => typeof value === 'object')) {
    if (observed.has(advisory.url)) continue
    observed.add(advisory.url)
    const reviewed = exceptions.get(advisory.url)
    const allowed =
      reviewed &&
      Date.now() < expiry.getTime() &&
      vulnerability.nodes.every((node) => lock.packages[node]?.version === reviewed.version) &&
      advisory.name === reviewed.name
    console.log(
      `${allowed ? 'REVIEWED RESIDUAL RISK' : 'UNREVIEWED / EXPIRED'}: ${advisory.title}\n${advisory.url}`,
    )
    if (!allowed) failure = true
  }
}
console.log(JSON.stringify(report.metadata.vulnerabilities))
if (observed.size)
  console.log(
    `Exceptions concern build/development dependencies only; review expires ${expiry.toISOString().slice(0, 10)}. Raw report: .cache/reports/npm-audit.json`,
  )
process.exitCode = failure ? 1 : 0
