'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Upload,
  Wine,
  Clock,
  Star,
  AlertCircle,
  Check
} from 'lucide-react'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const categories = [
  { value: 'CLASSIC', label: 'Clásico' },
  { value: 'TROPICAL', label: 'Tropical' },
  { value: 'MODERN', label: 'Moderno' },
  { value: 'MOCKTAIL', label: 'Sin Alcohol' },
  { value: 'SHOT', label: 'Shot' },
  { value: 'PUNCH', label: 'Punch' },
  { value: 'HOT_DRINK', label: 'Bebida Caliente' },
  { value: 'FROZEN', label: 'Frozen' }
]

const difficulties = [
  { value: 'EASY', label: 'Fácil' },
  { value: 'MEDIUM', label: 'Medio' },
  { value: 'HARD', label: 'Difícil' },
  { value: 'EXPERT', label: 'Experto' }
]

const glassTypes = [
  'Copa Martini',
  'Vaso Old Fashioned',
  'Copa de Vino',
  'Vaso Highball',
  'Copa Margarita',
  'Vaso Collins',
  'Copa Coupé',
  'Vaso Rocks',
  'Copa Flute',
  'Vaso Shot'
]

const techniques = [
  'Shake',
  'Stir',
  'Build',
  'Muddle',
  'Blend',
  'Layer',
  'Roll',
  'Whip'
]

export default function NewCocktailPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableIngredients, setAvailableIngredients] = useState<any[]>([])
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    story: '',
    trivia: '',
    category: 'CLASSIC',
    difficulty: 'EASY',
    prepTime: 3,
    glass: 'Copa Margarita',
    garnish: '',
    technique: 'Shake',
    isAlcoholic: true,
    abv: 22,
    image: '',
    imageKey: '',
    status: 'draft'
  })

  const [ingredients, setIngredients] = useState([
    { id: '1', name: '', amount: 0, unit: 'ml', order: 1, isOptional: false }
  ])

  const [steps, setSteps] = useState([
    { id: '1', description: '', order: 1 }
  ])

  const [tags, setTags] = useState<string[]>([])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addIngredient = () => {
    const newIngredient = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      unit: 'ml',
      order: ingredients.length + 1,
      isOptional: false
    }
    setIngredients([...ingredients, newIngredient])
  }

  const removeIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id))
  }

  const addStep = () => {
    const newStep = {
      id: Date.now().toString(),
      description: '',
      order: steps.length + 1
    }
    setSteps([...steps, newStep])
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id))
  }

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
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
    if (!formData.name || !formData.description) {
      toast.error('Por favor completa los campos requeridos')
      return
    }

    setIsSubmitting(true)

    try {
      const cocktailData = {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        imageKey: formData.imageKey,
        category: formData.category,
        difficulty: formData.difficulty,
        time: `${formData.prepTime} min`,
        abv: formData.isAlcoholic ? formData.abv : null,
        isClassic: formData.category === 'CLASSIC',
        isFeatured: false,
        story: formData.story || null,
        trivia: formData.trivia || null,
        ingredients: ingredients
          .filter(ing => ing.name.trim() !== '' && ing.amount > 0)
          .map(ing => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit
          })),
        instructions: steps
          .filter(step => step.description.trim() !== '')
          .map(step => step.description)
      }

      const response = await fetch('/api/admin/cocktails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cocktailData),
      })

      if (response.ok) {
        toast.success('Cóctel creado exitosamente')
        router.push('/admin/cocktails')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Error creando el cóctel')
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
          <a
            href="/admin/cocktails"
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </a>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nuevo Cóctel
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Crea una nueva receta con ingredientes y técnicas
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Upload className="h-4 w-4" />
            Subir Imagen
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
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
          </button>
        </div>
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
                  Nombre del Cóctel *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Ej: Margarita Clásica"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="margarita-clasica"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoría *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dificultad *
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Descripción breve del cóctel..."
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
              Imagen del Cóctel
            </h2>
            
            <ImageUpload
              folder="cocktails"
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              currentImage={formData.image}
              currentKey={formData.imageKey}
              maxImages={1}
            />
          </motion.div>

          {/* Ingredients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Ingredientes
              </h2>
              <button
                onClick={addIngredient}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Agregar Ingrediente
              </button>
            </div>
            
            <div className="space-y-4">
              {ingredients.map((ingredient, index) => (
                <div key={ingredient.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => {
                        const updated = ingredients.map(ing => 
                          ing.id === ingredient.id ? { ...ing, name: e.target.value } : ing
                        )
                        setIngredients(updated)
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Nombre del ingrediente"
                    />
                    
                    <input
                      type="number"
                      value={ingredient.amount}
                      onChange={(e) => {
                        const updated = ingredients.map(ing => 
                          ing.id === ingredient.id ? { ...ing, amount: parseFloat(e.target.value) || 0 } : ing
                        )
                        setIngredients(updated)
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Cantidad"
                    />
                    
                    <select
                      value={ingredient.unit}
                      onChange={(e) => {
                        const updated = ingredients.map(ing => 
                          ing.id === ingredient.id ? { ...ing, unit: e.target.value } : ing
                        )
                        setIngredients(updated)
                      }}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="ml">ml</option>
                      <option value="oz">oz</option>
                      <option value="dash">dash</option>
                      <option value="slice">slice</option>
                      <option value="sprig">sprig</option>
                    </select>
                    
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <input
                          type="checkbox"
                          checked={ingredient.isOptional}
                          onChange={(e) => {
                            const updated = ingredients.map(ing => 
                              ing.id === ingredient.id ? { ...ing, isOptional: e.target.checked } : ing
                            )
                            setIngredients(updated)
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        Opcional
                      </label>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeIngredient(ingredient.id)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preparation Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Pasos de Preparación
              </h2>
              <button
                onClick={addStep}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Agregar Paso
              </button>
            </div>
            
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <textarea
                      value={step.description}
                      onChange={(e) => {
                        const updated = steps.map(s => 
                          s.id === step.id ? { ...s, description: e.target.value } : s
                        )
                        setSteps(updated)
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Describe el paso de preparación..."
                    />
                  </div>
                  
                  <button
                    onClick={() => removeStep(step.id)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recipe Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Detalles de la Receta
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tiempo de Preparación (min)
                </label>
                <input
                  type="number"
                  value={formData.prepTime}
                  onChange={(e) => handleInputChange('prepTime', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Vaso
                </label>
                <select
                  value={formData.glass}
                  onChange={(e) => handleInputChange('glass', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {glassTypes.map(glass => (
                    <option key={glass} value={glass}>
                      {glass}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Técnica
                </label>
                <select
                  value={formData.technique}
                  onChange={(e) => handleInputChange('technique', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {techniques.map(technique => (
                    <option key={technique} value={technique}>
                      {technique}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Decoración
                </label>
                <input
                  type="text"
                  value={formData.garnish}
                  onChange={(e) => handleInputChange('garnish', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Ej: Sal en el borde, rodaja de lima"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAlcoholic"
                  checked={formData.isAlcoholic}
                  onChange={(e) => handleInputChange('isAlcoholic', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isAlcoholic" className="text-sm text-gray-700 dark:text-gray-300">
                  Contiene alcohol
                </label>
              </div>
              
              {formData.isAlcoholic && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ABV (%)
                  </label>
                  <input
                    type="number"
                    value={formData.abv}
                    onChange={(e) => handleInputChange('abv', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    step="0.1"
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Story & Trivia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Historia y Curiosidades
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Historia del Cóctel
                </label>
                <textarea
                  value={formData.story}
                  onChange={(e) => handleInputChange('story', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Cuenta la historia de este cóctel..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dato Curioso
                </label>
                <textarea
                  value={formData.trivia}
                  onChange={(e) => handleInputChange('trivia', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Un dato interesante sobre este cóctel..."
                />
              </div>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Etiquetas
            </h3>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-primary-500 hover:text-primary-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nueva etiqueta"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTag(e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addTag(input.value)
                    input.value = ''
                  }}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
