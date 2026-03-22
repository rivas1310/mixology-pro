/**
 * Comprueba conexión a Postgres local y/o Railway según variables de entorno.
 * Carga .env y .env.local (no imprime contraseñas).
 *
 * Uso: npm run db:check
 */
const path = require('path')
const { config } = require('dotenv')
const { PrismaClient } = require('@prisma/client')

const root = path.join(__dirname, '..')
config({ path: path.join(root, '.env'), quiet: true })
config({ path: path.join(root, '.env.local'), quiet: true })

function safeHost(url) {
  if (!url || typeof url !== 'string') return '(sin URL)'
  try {
    const u = new URL(url.replace(/^postgresql:/, 'http:'))
    return `${u.hostname}${u.port ? ':' + u.port : ''}${u.pathname || ''}`
  } catch {
    return '(URL no válida)'
  }
}

async function ping(label, url) {
  const trimmed = url?.trim()
  if (!trimmed) {
    console.log(`  ${label}: omitido (no definida)`)
    return { ok: true, skipped: true, url: '', internalRailway: false }
  }

  const internalRailway = /railway\.internal/i.test(trimmed)

  const prisma = new PrismaClient({
    datasources: { db: { url: trimmed } },
    log: [],
  })

  try {
    await prisma.$queryRaw`SELECT 1`
    console.log(`  ${label}: OK → ${safeHost(trimmed)}`)
    return { ok: true, skipped: false, url: trimmed, internalRailway }
  } catch (err) {
    console.log(`  ${label}: ERROR → ${safeHost(trimmed)}`)
    console.log(`           ${err.message?.split('\n')[0] || err}`)
    if (internalRailway) {
      console.log(
        '           → *.railway.internal solo funciona DENTRO de Railway. En tu PC usa la URL pública (pestaña Connect / “Public Network”).'
      )
    }
    return { ok: false, skipped: false, url: trimmed, internalRailway }
  } finally {
    await prisma.$disconnect().catch(() => {})
  }
}

async function main() {
  console.log('\n=== Verificación de bases de datos ===\n')

  const localUrl = process.env.DATABASE_URL_LOCAL?.trim()
  const railwayUrl = process.env.DATABASE_URL_RAILWAY?.trim()
  const singleUrl = process.env.DATABASE_URL?.trim()
  const target = (process.env.DATABASE_TARGET || 'local').toLowerCase()

  const results = []

  results.push(await ping('LOCAL     (DATABASE_URL_LOCAL)', localUrl))
  results.push(await ping('RAILWAY   (DATABASE_URL_RAILWAY)', railwayUrl))

  // DATABASE_URL explícita (si es distinta o si no hay _LOCAL/_RAILWAY)
  if (singleUrl) {
    const dup =
      singleUrl === localUrl ||
      singleUrl === railwayUrl ||
      (!localUrl && !railwayUrl)
    if (dup && !localUrl && !railwayUrl) {
      results.push(await ping('ÚNICA     (DATABASE_URL)', singleUrl))
    } else if (!dup) {
      results.push(await ping('OTRA      (DATABASE_URL)', singleUrl))
    }
  }

  console.log('')
  console.log(`  DATABASE_TARGET: "${target}"`)

  if (target === 'railway' && !railwayUrl) {
    console.log('  ⚠️  TARGET=railway sin DATABASE_URL_RAILWAY → la app usa DATABASE_URL.')
  }
  if (target === 'local' && !localUrl && singleUrl) {
    console.log('  ℹ️  Sin DATABASE_URL_LOCAL → la app usa DATABASE_URL como local.')
  }

  const tested = results.filter((r) => !r.skipped)
  const failed = tested.filter((r) => !r.ok)
  const okCount = tested.filter((r) => r.ok).length

  if (tested.length === 0) {
    console.log('\n❌ No hay ninguna URL configurada. Añade DATABASE_URL o DATABASE_URL_LOCAL / DATABASE_URL_RAILWAY.\n')
    process.exit(1)
  }

  if (failed.length > 0) {
    const onlyInternalRailway =
      failed.length > 0 &&
      failed.every((r) => r.internalRailway) &&
      okCount > 0

    if (onlyInternalRailway) {
      console.log(
        '\n⚠️  Railway con URL interna no alcanzable desde tu PC (esperado). Al menos otra conexión OK.\n' +
          '    Para probar Railway desde local, usa la URL pública en DATABASE_URL_RAILWAY.\n'
      )
      process.exit(0)
    }

    console.log('\n❌ Una o más conexiones fallaron (revisa URL, Postgres en marcha y red/VPN).\n')
    process.exit(1)
  }

  console.log('\n✅ Todas las URLs probadas respondieron correctamente.\n')
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
