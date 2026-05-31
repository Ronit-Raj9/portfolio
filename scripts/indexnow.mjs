// IndexNow submitter - instant-index the portfolio on Bing/Yandex.
// Run AFTER deploying (the key file must be live first), else 403.
//   node scripts/indexnow.mjs
import fs from 'node:fs'

const HOST = process.env.SITE_HOST ?? 'roniii.vercel.app'
const KEY = '6bb1b030e21c4d57bbf912bac0d0b535'
const BASE = `https://${HOST}`

const projects = JSON.parse(
  fs.readFileSync(new URL('../src/data/projects.json', import.meta.url), 'utf8')
)

// Indexable URLs only (/blog is noindexed → excluded)
const urlList = [
  `${BASE}/`,
  `${BASE}/projects`,
  `${BASE}/resume`,
  `${BASE}/contact`,
  ...projects.map((p) => `${BASE}/projects/${p.id}`),
]

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${BASE}/${KEY}.txt`,
    urlList,
  }),
})

console.log(`Submitted ${urlList.length} URLs → IndexNow`)
console.log(`HTTP ${res.status} ${res.statusText}`)
const body = await res.text()
if (body) console.log(body)
if (res.status !== 200 && res.status !== 202) {
  console.log('\n200/202 = ok. 403 = key file not live yet (deploy first). 422 = host/key mismatch.')
}
