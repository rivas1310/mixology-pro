'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Save, 
  ArrowLeft, 
  Upload,
  Apple,
  Leaf,
  Droplets,
  Zap,
  Heart,
  Award,
  BookOpen,
  BarChart3
} from 'lucide-react'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import toast from 'react-hot-toast'

const ingredientCategories = [
  { value: 'FRUITS', label: 'Frutas' },
  { value: 'HERBS', label: 'Hierbas' },
  { value: 'JUICES', label: 'Jugos' },
  { value: 'SYRUPS', label: 'Jarabes' },
  { value: 'BITTERS', label: 'Bitters' },
  { value: 'GARNISHES', label: 'Decoraciones' },
  { value: 'MIXERS', label: 'Mixers' },
  { value: 'SPICES', label: 'Especias' }
]

const ingredientTypes = [
  { value: 'FRUIT', label: 'Fruta' },
  { value: 'HERB', label: 'Hierba' },
  { value: 'JUICE', label: 'Jugo' },
  { value: 'SYRUP', label: 'Jarabe' },
  { value: 'BITTER', label: 'Bitter' },
  { value: 'GARNISH', label: 'Decoración' },
  { value: 'MIXER', label: 'Mixer' },
  { value: 'SPICE', label: 'Especia' }
]

const seasons = [
  { value: 'SPRING', label: 'Primavera' },
  { value: 'SUMMER', label: 'Verano' },
  { value: 'AUTUMN', label: 'Otoño' },
  { value: 'WINTER', label: 'Invierno' },
  { value: 'YEAR_ROUND', label: 'Todo el año' }
]

export default function NewIngredientPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'FRUIT',
    category: 'FRUITS',
    description: '',
    image: '',
    imageKey: '',
    season: 'YEAR_ROUND',
    origin: '',
    storage: '',
    shelfLife: '',
    isEssential: false
  })

  const [nutrition, setNutrition] = useState({
    calories: '',
    vitaminC: '',
    acidity: '',
    fiber: '',
    sugar: ''
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNutritionChange = (field: string, value: string) => {
    setNutrition(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (url: string, key: string) => {
    setFormData(prev => ({
      ...prev,
      image: url,
      imageKey: key
    }))
    toast.success('Imagen subida exitosamente')
  }

  const handleImageRemove = (key: string) => {
    setFormData(prev => ({
      ...prev,
      image: '',
      imageKey: ''
    }))
    toast.success('Imagen eliminada')
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.type || !formData.category) {
      toast.error('Por favor completa los campos requeridos')
      return
    }

    setIsSubmitting(true)

    try {
      const ingredientData = {
        name: formData.name,
        type: formData.type,
        category: formData.category,
        description: formData.description,
        image: formData.image,
        imageKey: formData.imageKey,
        season: formData.season,
        origin: formData.origin,
        nutrition: JSON.stringify(nutrition),
        storage: formData.storage,
        shelfLife: formData.shelfLife,
        isEssential: formData.isEssential
      }

      const response = await fetch('/api/admin/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredientData),
      })

      if (response.ok) {
        toast.success('Ingrediente creado exitosamente')
        router.push('/admin/ingredients')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Error creando el ingrediente')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nuevo Ingrediente
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Añade un nuevo ingrediente con imagen y detalles
            </p>
          </div>
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Guardar
            </>
          )}
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Información Básica
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre del Ingrediente *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ej: Limón"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo *
                </label>
                <Select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                >
                  {ingredientTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoría *
                </label>
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  {ingredientCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temporada
                </label>
                <Select
                  value={formData.season}
                  onChange={(e) => handleInputChange('season', e.target.value)}
                >
                  {seasons.map(season => (
                    <option key={season.value} value={season.value}>
                      {season.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                placeholder="Describe el ingrediente, su sabor, uso en cócteles..."
              />
            </div>
          </motion.div>

          {/* Image Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Imagen del Ingrediente
            </h2>
            
            <ImageUpload
              folder="ingredients"
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              currentImage={formData.image}
              currentKey={formData.imageKey}
              maxImages={1}
            />
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Información Adicional
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Origen
                </label>
                <Input
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Ej: Mediterráneo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Almacenamiento
                </label>
                <Input
                  value={formData.storage}
                  onChange={(e) => handleInputChange('storage', e.target.value)}
                  placeholder="Ej: Refrigerado"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vida Útil
                </label>
                <Input
                  value={formData.shelfLife}
                  onChange={(e) => handleInputChange('shelfLife', e.target.value)}
                  placeholder="Ej: 2-3 semanas"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Nutrition Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Información Nutricional
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Calorías (kcal/100g)
                </label>
                <Input
                  value={nutrition.calories}
                  onChange={(e) => handleNutritionChange('calories', e.target.value)}
                  placeholder="29"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vitamina C (mg/100g)
                </label>
                <Input
                  value={nutrition.vitaminC}
                  onChange={(e) => handleNutritionChange('vitaminC', e.target.value)}
                  placeholder="53"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Acidez
                </label>
                <Input
                  value={nutrition.acidity}
                  onChange={(e) => handleNutritionChange('acidity', e.target.value)}
                  placeholder="Alta"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fibra (g/100g)
                </label>
                <Input
                  value={nutrition.fiber}
                  onChange={(e) => handleNutritionChange('fiber', e.target.value)}
                  placeholder="2.8"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Azúcar (g/100g)
                </label>
                <Input
                  value={nutrition.sugar}
                  onChange={(e) => handleNutritionChange('sugar', e.target.value)}
                  placeholder="2.5"
                />
              </div>
            </div>
          </motion.div>

          {/* Essential Ingredient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Configuración
            </h3>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isEssential"
                checked={formData.isEssential}
                onChange={(e) => handleInputChange('isEssential', e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isEssential" className="text-sm text-gray-700 dark:text-gray-300">
                Ingrediente esencial
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
