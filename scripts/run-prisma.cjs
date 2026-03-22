/**
 * Ejecuta Prisma CLI usando la misma lógica de URLs que la app (local / Railway).
 *
 * Uso:
 *   node scripts/run-prisma.cjs db push
 *   node scripts/run-prisma.cjs --target railway db push
 *   node scripts/run-prisma.cjs --target local studio
 */
const { config } = require('dotenv')
const path = require('path')
const { spawnSync } = require('child_process')

const root = path.join(__dirname, '..')
config({ path: path.join(root, '.env') })
config({ path: path.join(root, '.env.local') })

let target = process.env.DATABASE_TARGET || 'local'
const prismaArgs = []
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--target' && process.argv[i + 1]) {
    target = process.argv[i + 1]
    i++
    continue
  }
  prismaArgs.push(process.argv[i])
}

const t = String(target).toLowerCase()
let url
if (t === 'railway') {
  url = process.env.DATABASE_URL_RAILWAY?.trim()
} else {
  url = process.env.DATABASE_URL_LOCAL?.trim()
}
if (!url) {
  url = process.env.DATABASE_URL?.trim()
}

if (!url) {
  console.error(
    '\n[x] No hay URL de base de datos.\n' +
      '    Define DATABASE_URL, o DATABASE_URL_LOCAL / DATABASE_URL_RAILWAY (ver .env.example).\n'
  )
  process.exit(1)
}

process.env.DATABASE_URL = url
console.info(`[prisma] DATABASE_TARGET efectivo: ${t} → conectando…\n`)

const result = spawnSync('npx', ['prisma', ...prismaArgs], {
  stdio: 'inherit',
  env: process.env,
  shell: true,
  cwd: root,
})

process.exit(result.status ?? 1)
