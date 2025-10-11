'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Save, 
  ArrowLeft,
  Wrench
} from 'lucide-react'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import toast from 'react-hot-toast'

const toolCategories = [
  { value: 'BARTENDER', label: 'Bartender' },
  { value: 'MIXOLOGIST', label: 'Mixólogo' },
  { value: 'SOMMELIER', label: 'Sommelier' }
]

const subcategoriesByCategory = {
  BARTENDER: [
    { value: 'ESSENTIAL', label: 'Esenciales' },
    { value: 'SHAKERS', label: 'Shakers y Cocteleras' },
    { value: 'STRAINERS', label: 'Coladores' },
    { value: 'JIGGERS', label: 'Medidores (Jiggers)' },
    { value: 'SPOONS', label: 'Cucharas de Bar' },
    { value: 'MUDDLERS', label: 'Majadores (Muddlers)' },
    { value: 'GLASSES', label: 'Cristalería' }
  ],
  MIXOLOGIST: [
    { value: 'PROFESSIONAL', label: 'Profesional' },
    { value: 'MOLECULAR', label: 'Mixología Molecular' },
    { value: 'INFUSION', label: 'Infusiones' },
    { value: 'GARNISH', label: 'Decoración' },
    { value: 'PRECISION', label: 'Precisión' },
    { value: 'SMOKING', label: 'Ahumado' },
    { value: 'CARBONATION', label: 'Carbonatación' }
  ],
  SOMMELIER: [
    { value: 'OPENING', label: 'Apertura de Botellas' },
    { value: 'DECANTING', label: 'Decantación' },
    { value: 'SERVING', label: 'Servicio' },
    { value: 'TASTING', label: 'Cata' },
    { value: 'STORAGE', label: 'Almacenamiento' },
    { value: 'TEMPERATURE', label: 'Control de Temperatura' }
  ]
}

export default function EditToolPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'BARTENDER',
    subcategory: 'ESSENTIAL',
    description: '',
    image: '',
    imageKey: '',
    brand: '',
    material: '',
    size: '',
    capacity: '',
    price: '',
    uses: '',
    howToUse: '',
    maintenance: '',
    tips: '',
    alternatives: '',
    isProfessional: false,
    isEssential: true,
    isFeatured: false,
    origin: ''
  })

  useEffect(() => {
    loadTool()
  }, [id])

  const loadTool = async () => {
    try {
      const response = await fetch(`/api/admin/tools/${id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData({
          name: data.name || '',
          category: data.category || 'BARTENDER',
          subcategory: data.subcategory || 'ESSENTIAL',
          description: data.description || '',
          image: data.image || '',
          imageKey: data.imageKey || '',
          brand: data.brand || '',
          material: data.material || '',
          size: data.size || '',
          capacity: data.capacity || '',
          price: data.price || '',
          uses: data.uses || '',
          howToUse: data.howToUse || '',
          maintenance: data.maintenance || '',
          tips: data.tips || '',
          alternatives: data.alternatives || '',
          isProfessional: data.isProfessional || false,
          isEssential: data.isEssential || false,
          isFeatured: data.isFeatured || false,
          origin: data.origin || ''
        })
      }
    } catch (error) {
      console.error('Error loading tool:', error)
      toast.error('Error cargando herramienta')
    } finally {
      setLoading(false)
    }
  }

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

  const handleSubmit = async () => {
    if (!formData.name || !formData.category) {
      toast.error('Por favor completa los campos requeridos')
      return
    }

    setIsSubmitting(true)

    try {
      const toolData = {
        ...formData
      }

      const response = await fetch(`/api/admin/tools/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toolData),
      })

      if (response.ok) {
        toast.success('Herramienta actualizada exitosamente')
        router.push('/admin/tools')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Error actualizando la herramienta')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error de conexión')
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableSubcategories = getAvailableSubcategories()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
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
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Wrench className="h-10 w-10 text-purple-600" />
              Editar Herramienta
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Modifica los detalles de la herramienta
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
              Guardar Cambios
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
                  Nombre de la Herramienta *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ej: Boston Shaker"
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
                  {toolCategories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subcategoría
                </label>
                <Select
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange('subcategory', e.target.value)}
                >
                  {availableSubcategories.map(sub => (
                    <option key={sub.value} value={sub.value}>
                      {sub.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marca
                </label>
                <Input
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Ej: Cocktail Kingdom, OXO"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Material
                </label>
                <Input
                  value={formData.material}
                  onChange={(e) => handleInputChange('material', e.target.value)}
                  placeholder="Ej: Acero inoxidable, Vidrio, Madera"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tamaño / Dimensiones
                </label>
                <Input
                  value={formData.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  placeholder="Ej: 28oz, 30cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacidad
                </label>
                <Input
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder="Ej: 750ml, 2 litros"
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
                placeholder="Describe la herramienta, para qué sirve, características..."
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
              Imagen de la Herramienta
            </h2>
            
            <ImageUpload
              folder="tools"
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              currentImage={formData.image}
              currentKey={formData.imageKey}
              maxImages={1}
            />
          </motion.div>

          {/* Usage & Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Uso e Instrucciones
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Usos Principales
                </label>
                <Textarea
                  value={formData.uses}
                  onChange={(e) => handleInputChange('uses', e.target.value)}
                  rows={3}
                  placeholder="Para qué se usa esta herramienta..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cómo Usar
                </label>
                <Textarea
                  value={formData.howToUse}
                  onChange={(e) => handleInputChange('howToUse', e.target.value)}
                  rows={4}
                  placeholder="Instrucciones de uso paso a paso..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mantenimiento y Cuidado
                </label>
                <Textarea
                  value={formData.maintenance}
                  onChange={(e) => handleInputChange('maintenance', e.target.value)}
                  rows={3}
                  placeholder="Cómo limpiar, mantener y cuidar..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Consejos de Uso
                </label>
                <Textarea
                  value={formData.tips}
                  onChange={(e) => handleInputChange('tips', e.target.value)}
                  rows={3}
                  placeholder="Tips profesionales..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Alternativas
                </label>
                <Textarea
                  value={formData.alternatives}
                  onChange={(e) => handleInputChange('alternatives', e.target.value)}
                  rows={2}
                  placeholder="Herramientas alternativas o sustitutos..."
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price & Origin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Precio y Origen
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precio Aproximado (USD)
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="25.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  País de Origen
                </label>
                <Input
                  value={formData.origin}
                  onChange={(e) => handleInputChange('origin', e.target.value)}
                  placeholder="Ej: Japón, Estados Unidos"
                />
              </div>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Configuración
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isEssential"
                  checked={formData.isEssential}
                  onChange={(e) => handleInputChange('isEssential', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isEssential" className="text-sm text-gray-700 dark:text-gray-300">
                  Herramienta esencial
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isProfessional"
                  checked={formData.isProfessional}
                  onChange={(e) => handleInputChange('isProfessional', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isProfessional" className="text-sm text-gray-700 dark:text-gray-300">
                  Nivel profesional
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="isFeatured" className="text-sm text-gray-700 dark:text-gray-300">
                  Herramienta destacada
                </label>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

