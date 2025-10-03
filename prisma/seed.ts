import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de datos...')

  // Limpiar datos existentes
  await prisma.cocktailIngredient.deleteMany()
  await prisma.cocktailInstruction.deleteMany()
  await prisma.cocktail.deleteMany()
  await prisma.ingredient.deleteMany()
  
  console.log('✅ Tablas limpiadas')

  // Crear ingredientes básicos
  const limon = await prisma.ingredient.create({
    data: {
      name: 'Limón',
      type: 'Cítrico',
      category: 'Frutas',
      description: 'El cítrico más versátil en la mixología',
      season: 'Todo el año',
      origin: 'Mediterráneo',
      nutrition: {
        calories: 29,
        vitaminC: 53,
        acidity: 'Alta'
      },
      storage: 'Refrigerado',
      shelfLife: '2-3 semanas',
      isEssential: true
    }
  })

  const lima = await prisma.ingredient.create({
    data: {
      name: 'Lima',
      type: 'Cítrico',
      category: 'Frutas',
      description: 'Esencial para cócteles tropicales',
      season: 'Todo el año',
      origin: 'Asia',
      nutrition: {
        calories: 30,
        vitaminC: 29,
        acidity: 'Alta'
      },
      storage: 'Refrigerado',
      shelfLife: '2-3 semanas',
      isEssential: true
    }
  })

  const menta = await prisma.ingredient.create({
    data: {
      name: 'Menta',
      type: 'Hierba',
      category: 'Hierbas',
      description: 'Hierba aromática esencial para cócteles refrescantes',
      season: 'Primavera-Verano',
      origin: 'Europa',
      nutrition: {
        calories: 44,
        vitaminC: 31,
        acidity: 'Baja'
      },
      storage: 'Agua fresca',
      shelfLife: '1 semana',
      isEssential: true
    }
  })

  const jarabe = await prisma.ingredient.create({
    data: {
      name: 'Jarabe Simple',
      type: 'Dulce',
      category: 'Jarabes',
      description: 'Base dulce fundamental en mixología',
      season: 'Todo el año',
      origin: 'Universal',
      nutrition: {
        calories: 260,
        vitaminC: 0,
        acidity: 'Neutra'
      },
      storage: 'Refrigerado',
      shelfLife: '1 mes',
      isEssential: true
    }
  })

  console.log('✅ Ingredientes creados')

  // Crear cócteles básicos
  const margarita = await prisma.cocktail.create({
    data: {
      name: 'Margarita Clásica',
      description: 'El cóctel mexicano más icónico',
      category: 'CLASSIC',
      difficulty: 'EASY',
      time: '3 min',
      abv: 22,
      isClassic: true,
      isFeatured: true
    }
  })

  const mojito = await prisma.cocktail.create({
    data: {
      name: 'Mojito',
      description: 'Refrescante cóctel cubano',
      category: 'TROPICAL',
      difficulty: 'MEDIUM',
      time: '5 min',
      abv: 13,
      isClassic: true,
      isFeatured: true
    }
  })

  console.log('✅ Cócteles creados')

  // Agregar ingredientes a Margarita
  await prisma.cocktailIngredient.create({
    data: {
      cocktailId: margarita.id,
      ingredientId: lima.id,
      amount: '30',
      unit: 'ml',
      order: 1
    }
  })

  // Agregar ingredientes a Mojito
  await prisma.cocktailIngredient.create({
    data: {
      cocktailId: mojito.id,
      ingredientId: lima.id,
      amount: '20',
      unit: 'ml',
      order: 1
    }
  })

  await prisma.cocktailIngredient.create({
    data: {
      cocktailId: mojito.id,
      ingredientId: menta.id,
      amount: '10',
      unit: 'hojas',
      order: 2
    }
  })

  await prisma.cocktailIngredient.create({
    data: {
      cocktailId: mojito.id,
      ingredientId: jarabe.id,
      amount: '15',
      unit: 'ml',
      order: 3
    }
  })

  console.log('✅ Relaciones de ingredientes creadas')

  // Agregar instrucciones
  await prisma.cocktailInstruction.create({
    data: {
      cocktailId: margarita.id,
      step: 1,
      instruction: 'Preparar el vaso con sal en el borde',
      order: 1
    }
  })

  await prisma.cocktailInstruction.create({
    data: {
      cocktailId: margarita.id,
      step: 2,
      instruction: 'Agitar todos los ingredientes con hielo',
      order: 2
    }
  })

  await prisma.cocktailInstruction.create({
    data: {
      cocktailId: mojito.id,
      step: 1,
      instruction: 'Machacar la menta con azúcar en el vaso',
      order: 1
    }
  })

  await prisma.cocktailInstruction.create({
    data: {
      cocktailId: mojito.id,
      step: 2,
      instruction: 'Agregar hielo picado y mezclar',
      order: 2
    }
  })

  console.log('✅ Instrucciones creadas')
  console.log('🎉 Seed completado exitosamente!')
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
