'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  COCKTAIL_CATEGORIES, 
  DIFFICULTY_LEVELS, 
  GLASS_TYPES, 
  PREPARATION_TECHNIQUES,
  INGREDIENT_UNITS
} from '@/lib/constants'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'

interface Cocktail {
  id: string
  name: string
  description: string
  image?: string
  imageKey?: string
  category: string
  difficulty: string
  time: string
  abv?: number
  isClassic: boolean
  isFeatured: boolean
  story?: string
  trivia?: string
  ingredientsText: string[]
  instructions: Array<{
    id: string
    step: number
    instruction: string
  }>
}

export default function EditCocktailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [cocktail, setCocktail] = useState<Cocktail | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    imageKey: '',
    category: 'CLASSIC',
    difficulty: 'EASY',
    time: '',
    abv: 0,
    isClassic: false,
    isFeatured: false,
    story: '',
    trivia: '',
    ingredientsText: [''],
    instructions: [{ id: 'temp-1', step: 1, instruction: '' }]
  })

  // Cargar cóctel existente
  useEffect(() => {
    const loadCocktail = async () => {
      try {
        const response = await fetch(`/api/admin/cocktails/${id}`)
        if (response.ok) {
          const data = await response.json()
          setCocktail(data)
          
          // Convertir ingredientsText de string[] a string[] si es necesario
          const ingredients = Array.isArray(data.ingredientsText) 
            ? data.ingredientsText 
            : []

          // Asegurar que instructions tenga la estructura correcta
          const instructions = Array.isArray(data.instructions) 
            ? data.instructions.map((inst: any, index: number) => ({
                id: inst.id || `temp-${index}`,
                step: inst.step || index + 1,
                instruction: inst.instruction || ''
              }))
            : [{ id: 'temp-1', step: 1, instruction: '' }]

          setFormData({
            name: data.name || '',
            description: data.description || '',
            image: data.image || '',
            imageKey: data.imageKey || '',
            category: data.category || 'CLASSIC',
            difficulty: data.difficulty || 'EASY',
            time: data.time || '',
            abv: data.abv || 0,
            isClassic: data.isClassic || false,
            isFeatured: data.isFeatured || false,
            story: data.story || '',
            trivia: data.trivia || '',
            ingredientsText: ingredients.length > 0 ? ingredients : [''],
            instructions: instructions
          })
        } else {
          console.error('Error loading cocktail')
        }
      } catch (error) {
        console.error('Error loading cocktail:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadCocktail()
    }
  }, [id])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...formData.ingredientsText]
    newIngredients[index] = value
    setFormData(prev => ({
      ...prev,
      ingredientsText: newIngredients
    }))
  }

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredientsText: [...prev.ingredientsText, '']
    }))
  }

  const removeIngredient = (index: number) => {
    if (formData.ingredientsText.length > 1) {
      const newIngredients = formData.ingredientsText.filter((_, i) => i !== index)
      setFormData(prev => ({
        ...prev,
        ingredientsText: newIngredients
      }))
    }
  }

  const handleInstructionChange = (index: number, field: 'step' | 'instruction', value: any) => {
    const newInstructions = [...formData.instructions]
    newInstructions[index] = {
      ...newInstructions[index],
      [field]: value
    }
    setFormData(prev => ({
      ...prev,
      instructions: newInstructions
    }))
  }

  const addInstruction = () => {
    const newStep = formData.instructions.length + 1
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, { id: `temp-${newStep}`, step: newStep, instruction: '' }]
    }))
  }

  const removeInstruction = (index: number) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions.filter((_, i) => i !== index)
      // Renumerar pasos
      const renumberedInstructions = newInstructions.map((inst, i) => ({
        ...inst,
        step: i + 1
      }))
      setFormData(prev => ({
        ...prev,
        instructions: renumberedInstructions
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Filtrar ingredientes vacíos
      const filteredIngredients = formData.ingredientsText.filter(ingredient => ingredient.trim() !== '')
      
      // Preparar datos para enviar
      const submitData = {
        ...formData,
        ingredientsText: filteredIngredients,
        instructions: formData.instructions.map((inst, index) => ({
          id: inst.id.startsWith('temp-') ? undefined : inst.id,
          step: index + 1,
          instruction: inst.instruction
        }))
      }

      console.log('Updating cocktail with data:', submitData)

      const response = await fetch(`/api/admin/cocktails/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      if (response.ok) {
        alert('Cóctel actualizado exitosamente')
        router.push('/admin/products')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error || 'Error al actualizar el cóctel'}`)
      }
    } catch (error) {
      console.error('Error updating cocktail:', error)
      alert('Error al actualizar el cóctel')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Cargando cóctel...</p>
        </div>
      </div>
    )
  }

  if (!cocktail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Cóctel no encontrado
          </h1>
          <button
            onClick={() => router.push('/admin/products')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            Volver a Productos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Editar Cóctel
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Modifica los datos del cóctel &quot;{cocktail.name}&quot;
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Información Básica */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Información Básica
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nombre del cóctel"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categoría *
              </label>
              <Select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {COCKTAIL_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dificultad *
              </label>
              <Select
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
              >
                {DIFFICULTY_LEVELS.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tiempo de preparación *
              </label>
              <Input
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                placeholder="ej: 5 min"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ABV (%)
              </label>
              <Input
                type="number"
                value={formData.abv}
                onChange={(e) => handleInputChange('abv', parseFloat(e.target.value) || 0)}
                placeholder="0"
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isClassic}
                  onChange={(e) => handleInputChange('isClassic', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cóctel Clásico
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Destacado
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descripción *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descripción del cóctel..."
              rows={3}
              required
            />
          </div>
        </div>

        {/* Imagen */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Imagen
          </h2>
          <ImageUpload
            folder="cocktails"
            currentImage={formData.image}
            currentKey={formData.imageKey}
            onImageUpload={(url, key) => {
              handleInputChange('image', url)
              handleInputChange('imageKey', key)
            }}
            onImageRemove={(key) => {
              handleInputChange('image', '')
              handleInputChange('imageKey', '')
            }}
            maxImages={1}
          />
        </div>

        {/* Ingredientes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Ingredientes
            </h2>
            <Button
              type="button"
              onClick={addIngredient}
              variant="outline"
              size="sm"
            >
              + Agregar Ingrediente
            </Button>
          </div>

          <div className="space-y-4">
            {formData.ingredientsText.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ingrediente ${index + 1} (ej: Tequila 60ml)`}
                  />
                </div>
                {formData.ingredientsText.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Instrucciones de Preparación
            </h2>
            <Button
              type="button"
              onClick={addInstruction}
              variant="outline"
              size="sm"
            >
              + Agregar Paso
            </Button>
          </div>

          <div className="space-y-4">
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12">
                  <Input
                    value={instruction.step}
                    onChange={(e) => handleInstructionChange(index, 'step', parseInt(e.target.value) || index + 1)}
                    type="number"
                    min="1"
                    className="text-center"
                  />
                </div>
                <div className="flex-1">
                  <Textarea
                    value={instruction.instruction}
                    onChange={(e) => handleInstructionChange(index, 'instruction', e.target.value)}
                    placeholder={`Paso ${index + 1}: Describe la acción...`}
                    rows={2}
                  />
                </div>
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className="flex-shrink-0 p-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Historia y Trivia */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Información Adicional
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Historia
              </label>
              <Textarea
                value={formData.story}
                onChange={(e) => handleInputChange('story', e.target.value)}
                placeholder="Cuenta la historia de este cóctel..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Curiosidad/Trivia
              </label>
              <Textarea
                value={formData.trivia}
                onChange={(e) => handleInputChange('trivia', e.target.value)}
                placeholder="Datos curiosos sobre este cóctel..."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/products')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </form>
    </div>
  )
}


