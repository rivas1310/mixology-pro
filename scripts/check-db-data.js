const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkData() {
  try {
    console.log('🔍 Verificando datos en la base de datos...\n')
    
    const cocktails = await prisma.cocktail.findMany()
    const beers = await prisma.beer.findMany()
    const wines = await prisma.wine.findMany()
    const spirits = await prisma.spirit.findMany()
    
    console.log('📊 Resultados:')
    console.log(`  - Cócteles: ${cocktails.length}`)
    console.log(`  - Cervezas: ${beers.length}`)
    console.log(`  - Vinos: ${wines.length}`)
    console.log(`  - Destilados: ${spirits.length}`)
    
    if (cocktails.length > 0) {
      console.log('\n🍸 Primeros 3 cócteles:')
      cocktails.slice(0, 3).forEach(c => {
        console.log(`  - ${c.name} (${c.category})`)
      })
    } else {
      console.log('\n⚠️ No hay cócteles en la base de datos')
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkData()


