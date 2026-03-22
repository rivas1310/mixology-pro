import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const cocktail = await prisma.cocktail.create({
      data: {
        name: 'Agent Test Cocktail',
        description: 'Test description to verify DB functionality',
        image: 'https://pub-05204e9160b041cbbf974ab1ad353f85.r2.dev/cocktails/agent-test.jpg',
        imageKey: 'cocktails/agent-test.jpg',
        category: 'CLASSIC',
        difficulty: 'EASY',
        time: '5 min',
        abv: 15,
        isClassic: true,
        isFeatured: false,
        ingredientsText: ['Prueba 30ml', 'Limón 20ml'],
        story: 'Test story',
        trivia: 'Test trivia'
      }
    })

    console.log('✅ TEST PASSED: Cocktail created successfully in local DB. ID:', cocktail.id)

  } catch (error) {
    console.error('❌ TEST FAILED: Error creating cocktail:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
