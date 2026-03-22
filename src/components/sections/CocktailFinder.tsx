'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, X, Sparkles, Wine, ArrowRight, Clock, Star, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Cocktail {
  id: string
  name: string
  description: string
  image?: string
  ingredients: string[]
  difficulty: string
  time: string
  rating: number
  category: string
}

export default function CocktailFinder() {
  const [ingredientInputs, setIngredientInputs] = useState<string[]>([''])
  const [licoresInput, setLicoresInput] = useState('')
  const [destiladosInput, setDestiladosInput] = useState('')
  const [matchingCocktails, setMatchingCocktails] = useState<Cocktail[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleAddIngredientField = () => {
    setIngredientInputs([...ingredientInputs, ''])
  }

  const handleRemoveIngredientField = (index: number) => {
    if (ingredientInputs.length > 1) {
      const newInputs = ingredientInputs.filter((_, i) => i !== index)
      setIngredientInputs(newInputs)
    }
  }

  const handleIngredientChange = (index: number, value: string) => {
    const newInputs = [...ingredientInputs]
    newInputs[index] = value
    setIngredientInputs(newInputs)
  }

  const handleSearch = () => {
    const allIngredients = [
      ...ingredientInputs.filter(i => i.trim()),
      licoresInput.trim() && licoresInput,
      destiladosInput.trim() && destiladosInput
    ].filter(Boolean).map(i => i.toLowerCase())

    if (allIngredients.length === 0) {
      setMatchingCocktails([])
      return
    }

    searchCocktails(allIngredients)
  }

  const searchCocktails = async (ingredientsList: string[]) => {
    setIsSearching(true)
    
    try {
      // Obtener todos los cócteles de la base de datos
      const response = await fetch('/api/cocktails')
      if (!response.ok) {
        throw new Error('Error fetching cocktails')
      }

      const data = await response.json()
      const allCocktails = data.cocktails || data || []
      
      console.log('Total cocktails from DB:', allCocktails.length)
      console.log('User ingredients:', ingredientsList)
      console.log('All cocktails data:', allCocktails.map((c: any) => ({
        name: c.name,
        ingredientsText: c.ingredientsText
      })))

      // Transformar y filtrar cócteles
      const matches: Cocktail[] = []

      for (const cocktail of allCocktails) {
        console.log(`\n=== EVALUANDO CÓCTEL: ${cocktail.name} ===`)
        
        // Obtener ingredientes del cóctel
        let cocktailIngredients: string[] = []
        
        // Intentar obtener de ingredientsText (JSON array)
        if (cocktail.ingredientsText && Array.isArray(cocktail.ingredientsText)) {
          // Extraer solo los nombres de ingredientes (sin cantidades)
          cocktailIngredients = cocktail.ingredientsText.map((ing: string) => {
            // Eliminar medidas comunes para obtener solo el ingrediente
            const cleanIng = ing.toLowerCase()
              .replace(/\d+\s*(ml|oz|cl|gr|g|kg|l|cucharada|cdta|cda|pizca|dash|gotas?|cube|cubes|twist|twists|pinch|slice|slices|unidad|unidades|hoja|hojas|rama|ramas)/gi, '')
              .replace(/\d+\s*$/g, '') // Eliminar números al final
              .replace(/^\s*-\s*/, '') // Eliminar guiones al inicio
              .trim()
            console.log(`    Original: "${ing}" → Limpio: "${cleanIng}"`)
            return cleanIng
          }).filter(Boolean)
        }
        
        // También buscar en las relaciones de ingredientes si existen
        if (cocktail.ingredients && Array.isArray(cocktail.ingredients)) {
          const relatedIngredients = cocktail.ingredients.map((ing: any) => 
            ing.ingredient?.name?.toLowerCase() || ''
          ).filter(Boolean)
          cocktailIngredients = [...new Set([...cocktailIngredients, ...relatedIngredients])]
        }

        console.log('Ingredientes extraídos:', cocktailIngredients)
        
        if (cocktailIngredients.length === 0) {
          console.log('No hay ingredientes, saltando...')
          continue
        }

        // Contar coincidencias usando una búsqueda estricta y precisa
        const matchCount = cocktailIngredients.filter(ing => 
          ingredientsList.some(userIng => {
            // Normalizar para comparación
            const normalizedIng = ing.toLowerCase().trim()
            const normalizedUserIng = userIng.toLowerCase().trim()
            
            // OPCIÓN 1: Coincidencia exacta de palabras completas
            // El ingrediente del usuario debe ser una palabra completa en el ingrediente del cóctel
            const ingWords = normalizedIng.split(/\s+/)
            const userWords = normalizedUserIng.split(/\s+/)
            
            // Buscar si alguna palabra del usuario coincide EXACTAMENTE con alguna palabra del ingrediente
            const exactWordMatch = ingWords.some(ingWord => 
              userWords.some(userWord => {
                // Ignorar palabras muy cortas (de, el, o, y, etc.) que causan falsos positivos
                if (ingWord.length <= 2 || userWord.length <= 2) {
                  return ingWord === userWord  // Solo coincidencia exacta para palabras cortas
                }
                
                return (
                  ingWord === userWord || 
                  // O si el ingrediente contiene completamente el input del usuario (ej: "tequila" contiene "tequila")
                  (normalizedUserIng.length >= 3 && ingWord.includes(normalizedUserIng)) ||
                  // O si el input del usuario contiene completamente el ingrediente (ej: "whiskey bourbon" contiene "whiskey")
                  (ingWord.length >= 3 && normalizedUserIng.includes(ingWord))
                )
              })
            )
            
            // OPCIÓN 2: Coincidencia de substring significativo (mínimo 4 caracteres para evitar falsos positivos)
            const significantSubstringMatch = 
              (normalizedUserIng.length >= 4 && normalizedIng.includes(normalizedUserIng)) ||
              (normalizedIng.length >= 4 && normalizedUserIng.includes(normalizedIng))
            
            const result = exactWordMatch || significantSubstringMatch
            
            if (result) {
              console.log(`  ✓ MATCH: "${ing}" con "${userIng}"`)
            }
            
            return result
          })
        ).length
        
        console.log(`Total matches para ${cocktail.name}: ${matchCount}`)

        // Mostrar SOLO si tiene al menos 1 ingrediente coincidente
        if (matchCount >= 1) {
          // Calcular el porcentaje de match real para verificación
          const realMatchPercentage = Math.round((matchCount / cocktailIngredients.length) * 100)
          
          // Solo agregar si realmente tiene match > 0%
          if (realMatchPercentage > 0) {
            console.log(`  ✓ AGREGANDO ${cocktail.name} con ${realMatchPercentage}% match`)
            matches.push({
              id: cocktail.id,
              name: cocktail.name,
              description: cocktail.description || '',
              image: cocktail.image,
              ingredients: cocktailIngredients,
              difficulty: cocktail.difficulty === 'EASY' ? 'Fácil' : 
                         cocktail.difficulty === 'MEDIUM' ? 'Intermedio' : 'Avanzado',
              time: cocktail.time || '5 min',
              rating: cocktail.rating || 4.5,
              category: cocktail.category
            })
          } else {
            console.log(`  ✗ NO AGREGANDO ${cocktail.name} - porcentaje real: ${realMatchPercentage}%`)
          }
        } else {
          console.log(`  ✗ NO AGREGANDO ${cocktail.name} - sin matches`)
        }
      }

      // Ordenar por número de ingredientes coincidentes
      matches.sort((a, b) => {
        const aMatches = a.ingredients.filter(ing => 
          ingredientsList.some(userIng => {
            const normalizedIng = ing.toLowerCase().trim()
            const normalizedUserIng = userIng.toLowerCase().trim()
            
            const ingWords = normalizedIng.split(/\s+/)
            const userWords = normalizedUserIng.split(/\s+/)
            
            const exactWordMatch = ingWords.some(ingWord => 
              userWords.some(userWord => {
                if (ingWord.length <= 2 || userWord.length <= 2) {
                  return ingWord === userWord
                }
                
                return (
                  ingWord === userWord || 
                  (normalizedUserIng.length >= 3 && ingWord.includes(normalizedUserIng)) ||
                  (ingWord.length >= 3 && normalizedUserIng.includes(ingWord))
                )
              })
            )
            
            const significantSubstringMatch = 
              (normalizedUserIng.length >= 4 && normalizedIng.includes(normalizedUserIng)) ||
              (normalizedIng.length >= 4 && normalizedUserIng.includes(normalizedIng))
            
            return exactWordMatch || significantSubstringMatch
          })
        ).length
        
        const bMatches = b.ingredients.filter(ing => 
          ingredientsList.some(userIng => {
            const normalizedIng = ing.toLowerCase().trim()
            const normalizedUserIng = userIng.toLowerCase().trim()
            
            const ingWords = normalizedIng.split(/\s+/)
            const userWords = normalizedUserIng.split(/\s+/)
            
            const exactWordMatch = ingWords.some(ingWord => 
              userWords.some(userWord => {
                if (ingWord.length <= 2 || userWord.length <= 2) {
                  return ingWord === userWord
                }
                
                return (
                  ingWord === userWord || 
                  (normalizedUserIng.length >= 3 && ingWord.includes(normalizedUserIng)) ||
                  (ingWord.length >= 3 && normalizedUserIng.includes(ingWord))
                )
              })
            )
            
            const significantSubstringMatch = 
              (normalizedUserIng.length >= 4 && normalizedIng.includes(normalizedUserIng)) ||
              (normalizedIng.length >= 4 && normalizedUserIng.includes(normalizedIng))
            
            return exactWordMatch || significantSubstringMatch
          })
        ).length
        
        return bMatches - aMatches
      })

      console.log('Matching cocktails found:', matches.length)
      console.log('Final matches with percentages:', matches.map((m: Cocktail) => ({
        name: m.name,
        totalIngredients: m.ingredients.length,
        matchPercentage: Math.round((m.ingredients.filter(ing => 
          ingredientsList.some(userIng => {
            const normalizedIng = ing.toLowerCase().trim()
            const normalizedUserIng = userIng.toLowerCase().trim()
            
            const ingWords = normalizedIng.split(/\s+/)
            const userWords = normalizedUserIng.split(/\s+/)
            
            const exactWordMatch = ingWords.some(ingWord => 
              userWords.some(userWord => {
                if (ingWord.length <= 2 || userWord.length <= 2) {
                  return ingWord === userWord
                }
                
                return (
                  ingWord === userWord || 
                  (normalizedUserIng.length >= 3 && ingWord.includes(normalizedUserIng)) ||
                  (ingWord.length >= 3 && normalizedUserIng.includes(ingWord))
                )
              })
            )
            
            const significantSubstringMatch = 
              (normalizedUserIng.length >= 4 && normalizedIng.includes(normalizedUserIng)) ||
              (normalizedIng.length >= 4 && normalizedUserIng.includes(normalizedIng))
            
            return exactWordMatch || significantSubstringMatch
          })
        ).length / m.ingredients.length) * 100)
      })))
      
      setMatchingCocktails(matches)

    } catch (error) {
      console.error('Error searching cocktails:', error)
      setMatchingCocktails([])
    } finally {
      setIsSearching(false)
    }
  }

  const getMatchPercentage = (cocktail: Cocktail) => {
    const allIngredients = [
      ...ingredientInputs.filter(i => i.trim()),
      licoresInput.trim() && licoresInput,
      destiladosInput.trim() && destiladosInput
    ].filter(Boolean).map(i => i.toLowerCase())

    console.log(`\n📊 getMatchPercentage para: ${cocktail.name}`)
    console.log(`  - Total ingredientes del cóctel: ${cocktail.ingredients.length}`)
    console.log(`  - Ingredientes del cóctel:`, cocktail.ingredients)
    console.log(`  - Ingredientes del usuario:`, allIngredients)

    const matchCount = cocktail.ingredients.filter(ing => 
      allIngredients.some(userIng => {
        const normalizedIng = ing.toLowerCase().trim()
        const normalizedUserIng = userIng.toLowerCase().trim()
        
        const ingWords = normalizedIng.split(/\s+/)
        const userWords = normalizedUserIng.split(/\s+/)
        
        const exactWordMatch = ingWords.some(ingWord => 
          userWords.some(userWord => {
            // Ignorar palabras muy cortas (de, el, o, y, etc.) que causan falsos positivos
            if (ingWord.length <= 2 || userWord.length <= 2) {
              return ingWord === userWord  // Solo coincidencia exacta para palabras cortas
            }
            
            return (
              ingWord === userWord || 
              // O si el ingrediente contiene completamente el input del usuario (ej: "tequila" contiene "tequila")
              (normalizedUserIng.length >= 3 && ingWord.includes(normalizedUserIng)) ||
              // O si el input del usuario contiene completamente el ingrediente (ej: "whiskey bourbon" contiene "whiskey")
              (ingWord.length >= 3 && normalizedUserIng.includes(ingWord))
            )
          })
        )
        
        const significantSubstringMatch = 
          (normalizedUserIng.length >= 4 && normalizedIng.includes(normalizedUserIng)) ||
          (normalizedIng.length >= 4 && normalizedUserIng.includes(normalizedIng))
        
        return exactWordMatch || significantSubstringMatch
      })
    ).length
    
    const percentage = Math.round((matchCount / cocktail.ingredients.length) * 100)
    
    console.log(`  - Ingredientes que coinciden: ${matchCount}`)
    console.log(`  - Porcentaje calculado: ${percentage}%`)
    
    // Asegurar que nunca devuelva 0% para cócteles que están siendo mostrados
    return percentage > 0 ? percentage : 1
  }

  const getMissingIngredients = (cocktail: Cocktail) => {
    const allIngredients = [
      ...ingredientInputs.filter(i => i.trim()),
      licoresInput.trim() && licoresInput,
      destiladosInput.trim() && destiladosInput
    ].filter(Boolean).map(i => i.toLowerCase())

    return cocktail.ingredients.filter(ing => 
      !allIngredients.some(userIng => {
        const normalizedIng = ing.toLowerCase().trim()
        const normalizedUserIng = userIng.toLowerCase().trim()
        
        const ingWords = normalizedIng.split(/\s+/)
        const userWords = normalizedUserIng.split(/\s+/)
        
        const exactWordMatch = ingWords.some(ingWord => 
          userWords.some(userWord => {
            // Ignorar palabras muy cortas (de, el, o, y, etc.) que causan falsos positivos
            if (ingWord.length <= 2 || userWord.length <= 2) {
              return ingWord === userWord  // Solo coincidencia exacta para palabras cortas
            }
            
            return (
              ingWord === userWord || 
              // O si el ingrediente contiene completamente el input del usuario (ej: "tequila" contiene "tequila")
              (normalizedUserIng.length >= 3 && ingWord.includes(normalizedUserIng)) ||
              // O si el input del usuario contiene completamente el ingrediente (ej: "whiskey bourbon" contiene "whiskey")
              (ingWord.length >= 3 && normalizedUserIng.includes(ingWord))
            )
          })
        )
        
        const significantSubstringMatch = 
          (normalizedUserIng.length >= 4 && normalizedIng.includes(normalizedUserIng)) ||
          (normalizedIng.length >= 4 && normalizedUserIng.includes(normalizedIng))
        
        return exactWordMatch || significantSubstringMatch
      })
    )
  }

  const hasAnyInput = () => {
    return ingredientInputs.some(i => i.trim()) || licoresInput.trim() || destiladosInput.trim()
  }

  return (
    <section id="finder" className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-gold" />
              <Wine className="absolute -bottom-1 -right-1 h-6 w-6 text-olive" />
            </div>
          </div>
          <h2 className="mb-4 text-4xl text-primary-800">
            ¿Qué puedes preparar hoy?
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-primary-600">
            Escribe los ingredientes, licores y destilados que tienes y descubre qué cócteles puedes preparar
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="border border-beige bg-cream-50 p-8 shadow-sm">
            {/* Ingredientes Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-primary-700">
                  <span className="h-2 w-2 rounded-full bg-olive"></span>
                  Ingredientes
                </label>
                <button
                  onClick={handleAddIngredientField}
                  className="flex items-center gap-1 text-sm font-semibold text-gold-dark transition-colors hover:text-primary-800"
                >
                  <Plus className="h-4 w-4" />
                  Agregar campo
                </button>
              </div>
              
              <div className="space-y-3">
                {ingredientInputs.map((input, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder={`Ingrediente ${index + 1} (ej: limón, azúcar, menta, hielo...)`}
                      className="input flex-1"
                    />
                    {ingredientInputs.length > 1 && (
                      <button
                        onClick={() => handleRemoveIngredientField(index)}
                        className="rounded-sm p-3 text-red-600 transition-colors hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Licores Section */}
            <div className="mb-6">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary-700">
                <span className="h-2 w-2 rounded-full bg-gold"></span>
                Licores
              </label>
              <input
                type="text"
                value={licoresInput}
                onChange={(e) => setLicoresInput(e.target.value)}
                placeholder="Licores que tienes (ej: cointreau, baileys, kahlúa, amaretto...)"
                className="input"
              />
            </div>

            {/* Destilados Section */}
            <div className="mb-6">
              <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary-700">
                <span className="h-2 w-2 rounded-full bg-olive"></span>
                Destilados
              </label>
              <input
                type="text"
                value={destiladosInput}
                onChange={(e) => setDestiladosInput(e.target.value)}
                placeholder="Destilados que tienes (ej: ron, vodka, gin, tequila, whiskey...)"
                className="input"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!hasAnyInput()}
              className="flex w-full items-center justify-center gap-2 border border-primary-700 bg-primary-800 py-4 text-lg font-semibold text-cream-50 transition-all duration-300 hover:bg-primary-900 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <Search className="h-5 w-5" />
              Buscar Cócteles
            </button>

            {/* Helper Text */}
            <div className="mt-6 border border-beige bg-white p-4">
              <p className="text-sm text-primary-600">
                <strong>💡 Consejo:</strong> Escribe uno o varios ingredientes en cada campo. Por ejemplo: &quot;limón, naranja&quot; o &quot;menta fresca&quot;. Puedes agregar más campos de ingredientes si lo necesitas.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        {isSearching ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Buscando cócteles...</p>
          </div>
        ) : matchingCocktails.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ¡Encontramos {matchingCocktails.length} {matchingCocktails.length === 1 ? 'cóctel' : 'cócteles'} para ti!
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Puedes preparar estos cócteles con los ingredientes que tienes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingCocktails.map((cocktail, index) => {
                const matchPercentage = getMatchPercentage(cocktail)
                const missingIngredients = getMissingIngredients(cocktail)

                return (
                  <motion.div
                    key={cocktail.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/cocktails/${cocktail.category}/${cocktail.id}`}>
                      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          {cocktail.image ? (
                            <img
                              src={cocktail.image}
                              alt={cocktail.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                              <Wine className="h-16 w-16 text-purple-600 dark:text-purple-400" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Match Percentage */}
                          <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                            <div className={`px-3 py-1 rounded-full font-bold text-sm shadow-lg ${
                              matchPercentage === 100 
                                ? 'bg-green-500 text-white' 
                                : matchPercentage >= 80
                                ? 'bg-green-400 text-white'
                                : matchPercentage >= 50
                                ? 'bg-yellow-400 text-gray-900'
                                : 'bg-orange-400 text-white'
                            }`}>
                              {matchPercentage}% Match
                            </div>
                            
                            {/* Etiqueta especial para más del 80% */}
                            {matchPercentage >= 80 && matchPercentage < 100 && (
                              <div className="px-3 py-1.5 bg-green-500/95 backdrop-blur-sm text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                ⭐ ¡Casi listo!
                              </div>
                            )}
                          </div>

                          {/* Difficulty */}
                          <div className="absolute top-4 left-4">
                            <span className="px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full">
                              {cocktail.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {cocktail.name}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                            {cocktail.description}
                          </p>

                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <Clock className="h-4 w-4" />
                              {cocktail.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              {cocktail.rating}
                            </div>
                          </div>

                          {/* Missing Ingredients */}
                          {missingIngredients.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Te faltan:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {missingIngredients.slice(0, 3).map((ing, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded capitalize"
                                  >
                                    {ing}
                                  </span>
                                ))}
                                {missingIngredients.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                                    +{missingIngredients.length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {matchPercentage === 100 && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
                              <p className="text-xs text-green-700 dark:text-green-300 font-semibold">
                                ✓ ¡Tienes todos los ingredientes!
                              </p>
                            </div>
                          )}
                          
                          {matchPercentage >= 80 && matchPercentage < 100 && (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
                              <p className="text-xs text-green-700 dark:text-green-300 font-semibold">
                                ⭐ ¡Tienes lo suficiente! Solo te faltan {missingIngredients.length} ingrediente{missingIngredients.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                              Ver receta
                            </span>
                            <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ) : hasAnyInput() && !isSearching ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8">
                <Wine className="h-16 w-16 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No encontramos cócteles exactos
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Intenta agregar más ingredientes o destilados comunes como ron, vodka, gin o tequila.
                </p>
                <Link
                  href="/cocktails"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Explorar todos los cócteles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Wine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Completa los campos y haz clic en &quot;Buscar Cócteles&quot; para descubrir qué puedes preparar
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}