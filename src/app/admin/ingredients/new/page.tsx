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
  { value: 'SPICES', label: 'Especias' },
  { value: 'DAIRY', label: 'Lácteos' },
  { value: 'NUTS', label: 'Frutos Secos' },
  { value: 'VEGETABLES', label: 'Vegetales' },
  { value: 'FLOWERS', label: 'Flores' },
  { value: 'CHOCOLATE', label: 'Chocolate' },
  { value: 'ALCOHOL', label: 'Alcohol' },
  { value: 'SWEETENERS', label: 'Endulzantes' },
  { value: 'SALTS', label: 'Sales' },
  { value: 'OILS', label: 'Aceites' },
  { value: 'TEAS', label: 'Tés' },
  { value: 'SPIRITS', label: 'Licores' }
]

const ingredientTypesByCategory = {
  FRUITS: [
    { value: 'CITRICOS', label: 'Cítricos' },
    { value: 'TROPICALES', label: 'Tropicales' },
    { value: 'BAYAS', label: 'Bayas' },
    { value: 'POMACEAS', label: 'Pomáceas' },
    { value: 'MELONES', label: 'Melones' },
    { value: 'HUESO', label: 'Hueso' }
  ],
  HERBS: [
    { value: 'AROMATICAS', label: 'Aromáticas (Menta, Romero, Albahaca, Tomillo, Laurel)' },
    { value: 'AMARGAS_TONICAS', label: 'Amargas / Tónicas (Genciana, Quina, Ruibarbo, Ajenjo)' },
    { value: 'MEDICINALES', label: 'Medicinales / Terapéuticas (Manzanilla, Valeriana, Melisa, Damiana)' },
    { value: 'ESPECIADAS', label: 'Especiadas / Calientes (Canela, Jengibre, Clavo, Cardamomo)' },
    { value: 'MENTOLADAS', label: 'Mentoladas / Balsámicas (Menta, Eucalipto, Hierbabuena, Poleo)' },
    { value: 'RITUALES', label: 'Rituales / Tradicionales (Damiana, Epazote, Hoja Santa)' },
    { value: 'VERDES_FRESCAS', label: 'Verdes / Frescas (Cedrón, Perejil, Verbena, Estragón)' }
  ],
  JUICES: [
    { value: 'CITRICOS', label: 'Cítricos' },
    { value: 'TROPICALES', label: 'Tropicales' },
    { value: 'VEGETALES', label: 'Vegetales' },
    { value: 'CONCENTRADOS', label: 'Concentrados' }
  ],
  SYRUPS: [
    { value: 'SIMPLES', label: 'Simples' },
    { value: 'AROMATICOS', label: 'Aromáticos' },
    { value: 'ESPECIALES', label: 'Especiales' },
    { value: 'SIN_AZUCAR', label: 'Sin Azúcar' }
  ],
  BITTERS: [
    { value: 'AROMATIC', label: 'Aromatic' },
    { value: 'CITRUS', label: 'Citrus' },
    { value: 'CHOCOLATE', label: 'Chocolate' },
    { value: 'HERBAL', label: 'Herbal' }
  ],
  GARNISHES: [
    { value: 'FRUTAS', label: 'Frutas' },
    { value: 'HIERBAS', label: 'Hierbas' },
    { value: 'FLORES', label: 'Flores' },
    { value: 'ESPECIAS', label: 'Especias' }
  ],
  MIXERS: [
    { value: 'TONICAS', label: 'Tónicas' },
    { value: 'SODAS', label: 'Sodas' },
    { value: 'GINGER_ALE', label: 'Ginger Ale' },
    { value: 'REFRESCOS', label: 'Refrescos' }
  ],
  SPICES: [
    { value: 'DULCES', label: 'Dulces' },
    { value: 'SALADAS', label: 'Saladas' },
    { value: 'PICANTES', label: 'Picantes' },
    { value: 'AROMATICAS', label: 'Aromáticas' }
  ],
  DAIRY: [
    { value: 'LECHE', label: 'Leche' },
    { value: 'CREMA', label: 'Crema' },
    { value: 'YOGURT', label: 'Yogurt' },
    { value: 'QUESOS', label: 'Quesos' }
  ],
  NUTS: [
    { value: 'NUECES', label: 'Nueces' },
    { value: 'ALMENDRAS', label: 'Almendras' },
    { value: 'PISTACHOS', label: 'Pistachos' },
    { value: 'SEMILLAS', label: 'Semillas' }
  ],
  VEGETABLES: [
    { value: 'HOJAS', label: 'Hojas' },
    { value: 'RAICES', label: 'Raíces' },
    { value: 'BULBOS', label: 'Bulbos' },
    { value: 'TALLOS', label: 'Tallos' }
  ],
  FLOWERS: [
    { value: 'ROSAS', label: 'Rosas' },
    { value: 'LAVANDA', label: 'Lavanda' },
    { value: 'VIOLETAS', label: 'Violetas' },
    { value: 'HIBISCO', label: 'Hibisco' }
  ],
  CHOCOLATE: [
    { value: 'NEGRO', label: 'Chocolate Negro' },
    { value: 'BLANCO', label: 'Chocolate Blanco' },
    { value: 'CACAO', label: 'Cacao' },
    { value: 'POLVOS', label: 'Polvos' }
  ],
  ALCOHOL: [
    { value: 'LICORES', label: 'Licores' },
    { value: 'VINOS', label: 'Vinos' },
    { value: 'CERVEZAS', label: 'Cervezas' },
    { value: 'DESTILADOS', label: 'Destilados' }
  ],
  SWEETENERS: [
    { value: 'AZUCARES', label: 'Azúcares' },
    { value: 'MIELES', label: 'Mieles' },
    { value: 'EDULCORANTES', label: 'Edulcorantes' },
    { value: 'NATURALES', label: 'Naturales' }
  ],
  SALTS: [
    { value: 'MARINA', label: 'Marina' },
    { value: 'HIMALAYA', label: 'Himalaya' },
    { value: 'ESPECIADAS', label: 'Especiadas' },
    { value: 'AHUMADAS', label: 'Ahumadas' }
  ],
  OILS: [
    { value: 'OLIVA', label: 'Oliva' },
    { value: 'COCO', label: 'Coco' },
    { value: 'SESAMO', label: 'Sésamo' },
    { value: 'ESENCIALES', label: 'Esenciales' }
  ],
  TEAS: [
    { value: 'NEGRO', label: 'Negro' },
    { value: 'VERDE', label: 'Verde' },
    { value: 'HERBALES', label: 'Herbales' },
    { value: 'FRUTALES', label: 'Frutales' }
  ],
  SPIRITS: [
    { value: 'DULCES', label: 'Dulces' },
    { value: 'SECOS', label: 'Secos' },
    { value: 'AROMATICOS', label: 'Aromáticos' },
    { value: 'CREMOSOS', label: 'Cremosos' }
  ]
}

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
    type: 'CITRICOS',
    category: 'FRUITS',
    description: '',
    image: '',
    imageKey: '',
    season: 'YEAR_ROUND',
    origin: '',
    storage: '',
    shelfLife: '',
    isEssential: false,
    // Campos adicionales
    abv: '', // Para alcoholes y licores
    flavor: '', // Sabor / perfil de sabor
    intensity: '', // Intensidad (Suave, Medio, Fuerte)
    color: '', // Color
    aroma: '', // Aroma
    texture: '', // Textura
    uses: '', // Usos en coctelería
    substitutes: '', // Sustitutos
    preparation: '', // Preparación / cómo usar
    pairings: '', // Maridajes / qué combina bien
    benefits: '', // Beneficios / propiedades
    precautions: '', // Precauciones / alergias
    brand: '', // Marca (para productos comerciales)
    price: '', // Precio
    volume: '', // Volumen / presentación
    concentration: '' // Concentración (para jarabes, bitters, etc)
  })

  // Obtener los tipos disponibles según la categoría seleccionada
  const getAvailableTypes = () => {
    return ingredientTypesByCategory[formData.category as keyof typeof ingredientTypesByCategory] || []
  }

  // Cuando cambia la categoría, actualizar el tipo al primero disponible
  const handleCategoryChange = (newCategory: string) => {
    const availableTypes = ingredientTypesByCategory[newCategory as keyof typeof ingredientTypesByCategory]
    setFormData(prev => ({
      ...prev,
      category: newCategory,
      type: availableTypes && availableTypes.length > 0 ? availableTypes[0].value : ''
    }))
  }

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
        isEssential: formData.isEssential,
        abv: formData.abv,
        flavor: formData.flavor,
        intensity: formData.intensity,
        color: formData.color,
        aroma: formData.aroma,
        texture: formData.texture,
        uses: formData.uses,
        substitutes: formData.substitutes,
        preparation: formData.preparation,
        pairings: formData.pairings,
        benefits: formData.benefits,
        precautions: formData.precautions,
        brand: formData.brand,
        price: formData.price,
        volume: formData.volume,
        concentration: formData.concentration
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
                  Categoría *
                </label>
                <Select
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
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
                  Subcategoría *
                </label>
                <Select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                >
                  {getAvailableTypes().map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
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

          {/* Características del Producto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.17 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Características del Producto
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ABV - Para alcoholes */}
                {(formData.category === 'ALCOHOL' || formData.category === 'SPIRITS' || formData.category === 'BITTERS') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ABV (% Alcohol)
                    </label>
                    <Input
                      value={formData.abv}
                      onChange={(e) => handleInputChange('abv', e.target.value)}
                      placeholder="40"
                      type="number"
                      step="0.1"
                    />
                  </div>
                )}

                {/* Marca - Para productos comerciales */}
                {(formData.category === 'BITTERS' || formData.category === 'MIXERS' || formData.category === 'SYRUPS' || formData.category === 'ALCOHOL' || formData.category === 'SPIRITS') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Marca
                    </label>
                    <Input
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      placeholder="Ej: Angostura"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Color
                  </label>
                  <Input
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Ej: Verde brillante, Ámbar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Intensidad
                  </label>
                  <Select
                    value={formData.intensity}
                    onChange={(e) => handleInputChange('intensity', e.target.value)}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="Suave">Suave</option>
                    <option value="Medio">Medio</option>
                    <option value="Fuerte">Fuerte</option>
                    <option value="Muy Fuerte">Muy Fuerte</option>
                  </Select>
                </div>

                {/* Concentración - Para jarabes, bitters */}
                {(formData.category === 'BITTERS' || formData.category === 'SYRUPS') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Concentración
                    </label>
                    <Input
                      value={formData.concentration}
                      onChange={(e) => handleInputChange('concentration', e.target.value)}
                      placeholder="Ej: 1:1, Simple, Concentrado"
                    />
                  </div>
                )}

                {/* Volumen/Presentación */}
                {(formData.category === 'BITTERS' || formData.category === 'MIXERS' || formData.category === 'SYRUPS' || formData.category === 'ALCOHOL' || formData.category === 'SPIRITS') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Volumen / Presentación
                    </label>
                    <Input
                      value={formData.volume}
                      onChange={(e) => handleInputChange('volume', e.target.value)}
                      placeholder="Ej: 500ml, 1L"
                    />
                  </div>
                )}

                {/* Precio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Precio (USD)
                  </label>
                  <Input
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="15.00"
                    type="number"
                    step="0.01"
                  />
                </div>

                {/* Textura - Para lácteos, frutas */}
                {(formData.category === 'DAIRY' || formData.category === 'FRUITS' || formData.category === 'CHOCOLATE') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Textura
                    </label>
                    <Input
                      value={formData.texture}
                      onChange={(e) => handleInputChange('texture', e.target.value)}
                      placeholder="Ej: Cremosa, Jugosa, Firme"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Perfil de Sabor
                </label>
                <Textarea
                  value={formData.flavor}
                  onChange={(e) => handleInputChange('flavor', e.target.value)}
                  rows={2}
                  placeholder="Describe el sabor: dulce, amargo, ácido, especiado..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aroma
                </label>
                <Textarea
                  value={formData.aroma}
                  onChange={(e) => handleInputChange('aroma', e.target.value)}
                  rows={2}
                  placeholder="Describe el aroma: floral, cítrico, herbáceo..."
                />
              </div>
            </div>
          </motion.div>

          {/* Uso en Coctelería */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.19 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Uso en Coctelería
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
                  placeholder="Ej: Ideal para martinis, mojitos, margaritas..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preparación / Cómo Usar
                </label>
                <Textarea
                  value={formData.preparation}
                  onChange={(e) => handleInputChange('preparation', e.target.value)}
                  rows={3}
                  placeholder="Ej: Machacar suavemente, exprimir jugo, rallar cáscara..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maridajes / Qué Combina Bien
                </label>
                <Textarea
                  value={formData.pairings}
                  onChange={(e) => handleInputChange('pairings', e.target.value)}
                  rows={3}
                  placeholder="Ej: Combina bien con gin, vodka, tequila..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sustitutos
                </label>
                <Textarea
                  value={formData.substitutes}
                  onChange={(e) => handleInputChange('substitutes', e.target.value)}
                  rows={2}
                  placeholder="Ej: Se puede sustituir con lima, naranja..."
                />
              </div>
            </div>
          </motion.div>

          {/* Beneficios y Precauciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.21 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Beneficios y Precauciones
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Beneficios / Propiedades
                </label>
                <Textarea
                  value={formData.benefits}
                  onChange={(e) => handleInputChange('benefits', e.target.value)}
                  rows={3}
                  placeholder="Ej: Rico en vitamina C, propiedades antioxidantes..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Precauciones / Alergias
                </label>
                <Textarea
                  value={formData.precautions}
                  onChange={(e) => handleInputChange('precautions', e.target.value)}
                  rows={3}
                  placeholder="Ej: Puede causar alergias en personas sensibles a..."
                />
              </div>
            </div>
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
