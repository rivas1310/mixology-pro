'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Save, 
  ArrowLeft,
  Plus,
  Trash2,
  Beaker
} from 'lucide-react'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import toast from 'react-hot-toast'

const techniqueCategories = [
  { value: 'SHAKING', label: 'Agitado (Shaking)' },
  { value: 'STIRRING', label: 'Mezclado (Stirring)' },
  { value: 'MUDDLING', label: 'Macerado (Muddling)' },
  { value: 'STRAINING', label: 'Colado (Straining)' },
  { value: 'LAYERING', label: 'Capas (Layering)' },
  { value: 'INFUSIONS', label: 'Infusiones' },
  { value: 'CLARIFICATION', label: 'Clarificación' },
  { value: 'CARBONATION', label: 'Carbonatación' },
  { value: 'FLAMING', label: 'Flameado' },
  { value: 'SMOKING', label: 'Ahumado' },
  { value: 'FREEZING', label: 'Congelado' },
  { value: 'GARNISHING', label: 'Decoración' },
  { value: 'BATCHING', label: 'Pre-Batching' },
  { value: 'AGING', label: 'Envejecimiento' }
]

const subcategoriesByCategory = {
  INFUSIONS: [
    { value: 'SHRUBS', label: 'Shrubs' },
    { value: 'CORDIALES', label: 'Cordiales' },
    { value: 'MACERACIONES', label: 'Maceraciones' },
    { value: 'FAT_WASH', label: 'Fat Wash' },
    { value: 'HOT_INFUSION', label: 'Infusión Caliente (Hot Fusion)' },
    { value: 'COLD_INFUSION', label: 'Infusión Fría (Cold Fusion)' },
    { value: 'TINCTURES', label: 'Tinturas' },
    { value: 'OLEO_SACCHARUM', label: 'Oleo Saccharum' }
  ],
  CLARIFICATION: [
    { value: 'MILK_CLARIFICATION', label: 'Clarificación con Leche' },
    { value: 'GELATIN_CLARIFICATION', label: 'Clarificación con Gelatina' },
    { value: 'CENTRIFUGE', label: 'Centrífuga' },
    { value: 'FILTRATION', label: 'Filtración' }
  ],
  CARBONATION: [
    { value: 'SODA_SIPHON', label: 'Sifón de Soda' },
    { value: 'FORCED_CARBONATION', label: 'Carbonatación Forzada' },
    { value: 'NATURAL_FERMENTATION', label: 'Fermentación Natural' }
  ],
  AGING: [
    { value: 'BARREL_AGING', label: 'Envejecimiento en Barril' },
    { value: 'BOTTLE_AGING', label: 'Envejecimiento en Botella' },
    { value: 'RAPID_AGING', label: 'Envejecimiento Rápido' }
  ]
}

const difficultyLevels = [
  { value: 'EASY', label: 'Fácil' },
  { value: 'MEDIUM', label: 'Medio' },
  { value: 'HARD', label: 'Difícil' },
  { value: 'EXPERT', label: 'Experto' }
]

interface Step {
  step: number
  instruction: string
  tip: string
}

export default function NewTechniquePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'SHAKING',
    subcategory: '',
    description: '',
    image: '',
    imageKey: '',
    difficulty: 'MEDIUM',
    timeRequired: '',
    ingredients: '',
    equipment: '',
    tips: '',
    videoUrl: '',
    applications: '',
    examples: '',
    precautions: '',
    benefits: '',
    origin: '',
    isFeatured: false
  })

  const [steps, setSteps] = useState<Step[]>([
    { step: 1, instruction: '', tip: '' }
  ])

  const getAvailableSubcategories = () => {
    return subcategoriesByCategory[formData.category as keyof typeof subcategoriesByCategory] || []
  }

  const handleCategoryChange = (newCategory: string) => {
    const availableSubcategories = subcategoriesByCategory[newCategory as keyof typeof subcategoriesByCategory]
    setFormData(prev => ({
      ...prev,
      category: newCategory,
      subcategory: availableSubcategories && availableSubcategories.length > 0 ? availableSubcategories[0].value : ''
    }))
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
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

  const addStep = () => {
    setSteps([...steps, { step: steps.length + 1, instruction: '', tip: '' }])
  }

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index)
    // Re-numerar los pasos
    const renumbered = newSteps.map((step, i) => ({ ...step, step: i + 1 }))
    setSteps(renumbered)
  }

  const updateStep = (index: number, field: 'instruction' | 'tip', value: string) => {
    const newSteps = [...steps]
    newSteps[index][field] = value
    setSteps(newSteps)
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.category) {
      toast.error('Por favor completa los campos requeridos')
      return
    }

    setIsSubmitting(true)

    try {
      const techniqueData = {
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory || null,
        description: formData.description,
        image: formData.image,
        imageKey: formData.imageKey,
        difficulty: formData.difficulty,
        timeRequired: formData.timeRequired,
        steps: JSON.stringify(steps),
        ingredients: formData.ingredients,
        equipment: formData.equipment,
        tips: formData.tips,
        videoUrl: formData.videoUrl,
        applications: formData.applications,
        examples: formData.examples,
        precautions: formData.precautions,
        benefits: formData.benefits,
        origin: formData.origin,
        isFeatured: formData.isFeatured
      }

      const response = await fetch('/api/admin/techniques', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(techniqueData),
      })

      if (response.ok) {
        toast.success('Técnica creada exitosamente')
        router.push('/admin/techniques')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Error creando la técnica')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableSubcategories = getAvailableSubcategories()

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
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Beaker className="h-10 w-10 text-purple-600" />
              Nueva Técnica
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Añade una nueva técnica de coctelería con instrucciones detalladas
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nombre de la Técnica *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ej: Clarificación con Leche"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categoría *
                </label>
                <Select
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  required
                >
                  {techniqueCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
              </div>
              
              {availableSubcategories.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subcategoría
                  </label>
                  <Select
                    value={formData.subcategory}
                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    {availableSubcategories.map(sub => (
                      <option key={sub.value} value={sub.value}>
                        {sub.label}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dificultad
                </label>
                <Select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                >
                  {difficultyLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tiempo Requerido
                </label>
                <Input
                  value={formData.timeRequired}
                  onChange={(e) => handleInputChange('timeRequired', e.target.value)}
                  placeholder="Ej: 5 minutos, 24 horas, 1 semana"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Origen
                </label>
                <Input
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Ej: Inglaterra, Francia, Japón"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Descripción General
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                placeholder="Describe la técnica, su historia, propósito..."
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
              Imagen de la Técnica
            </h2>
            
            <ImageUpload
              folder="techniques"
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              currentImage={formData.image}
              currentKey={formData.imageKey}
              maxImages={1}
            />
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Pasos de la Técnica
              </h2>
              <Button
                onClick={addStep}
                className="flex items-center gap-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                Agregar Paso
              </Button>
            </div>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Paso {step.step}
                    </h3>
                    {steps.length > 1 && (
                      <button
                        onClick={() => removeStep(index)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Instrucción *
                      </label>
                      <Textarea
                        value={step.instruction}
                        onChange={(e) => updateStep(index, 'instruction', e.target.value)}
                        rows={3}
                        placeholder="Describe el paso detalladamente..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Consejo / Tip (Opcional)
                      </label>
                      <Textarea
                        value={step.tip}
                        onChange={(e) => updateStep(index, 'tip', e.target.value)}
                        rows={2}
                        placeholder="Tip profesional para este paso..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Materials & Equipment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Materiales y Equipo
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ingredientes / Materiales Necesarios
                </label>
                <Textarea
                  value={formData.ingredients}
                  onChange={(e) => handleInputChange('ingredients', e.target.value)}
                  rows={4}
                  placeholder="Lista de ingredientes o materiales necesarios..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Equipo Necesario
                </label>
                <Textarea
                  value={formData.equipment}
                  onChange={(e) => handleInputChange('equipment', e.target.value)}
                  rows={4}
                  placeholder="Lista del equipo necesario: shaker, colador, vasos..."
                />
              </div>
            </div>
          </motion.div>

          {/* Applications & Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Aplicaciones y Ejemplos
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aplicaciones / Usos
                </label>
                <Textarea
                  value={formData.applications}
                  onChange={(e) => handleInputChange('applications', e.target.value)}
                  rows={3}
                  placeholder="En qué tipos de cócteles se usa esta técnica..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ejemplos de Cócteles
                </label>
                <Textarea
                  value={formData.examples}
                  onChange={(e) => handleInputChange('examples', e.target.value)}
                  rows={3}
                  placeholder="Martini, Old Fashioned, Mojito..."
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tips & Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Consejos y Beneficios
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Consejos Generales
                </label>
                <Textarea
                  value={formData.tips}
                  onChange={(e) => handleInputChange('tips', e.target.value)}
                  rows={4}
                  placeholder="Tips importantes..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Beneficios
                </label>
                <Textarea
                  value={formData.benefits}
                  onChange={(e) => handleInputChange('benefits', e.target.value)}
                  rows={3}
                  placeholder="Beneficios de usar esta técnica..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precauciones
                </label>
                <Textarea
                  value={formData.precautions}
                  onChange={(e) => handleInputChange('precautions', e.target.value)}
                  rows={3}
                  placeholder="Precauciones importantes..."
                />
              </div>
            </div>
          </motion.div>

          {/* Video & Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Video y Configuración
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  URL del Video Tutorial
                </label>
                <Input
                  value={formData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                  placeholder="https://youtube.com/..."
                  type="url"
                />
              </div>
              
              <div className="flex items-center gap-2 pt-4">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isFeatured" className="text-sm text-gray-700 dark:text-gray-300">
                  Técnica destacada
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

