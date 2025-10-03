'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { 
  Save, 
  Upload, 
  X, 
  Plus, 
  Trash2,
  Wine,
  Clock,
  Star
} from 'lucide-react'

interface CocktailFormProps {
  initialData?: {
    name: string
    description: string
    category: string
    difficulty: string
    time: string
    abv: number
    image?: string
    imageKey?: string
  }
  onSubmit: (data: any) => void
  onCancel?: () => void
}

export function CocktailForm({ initialData, onSubmit, onCancel }: CocktailFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    difficulty: initialData?.difficulty || '',
    time: initialData?.time || '',
    abv: initialData?.abv || 0,
    image: initialData?.image || '',
    imageKey: initialData?.imageKey || ''
  })

  const [ingredients, setIngredients] = useState([
    { name: '', amount: '', unit: '' }
  ])

  const [instructions, setInstructions] = useState([''])

  const categories = [
    'Clásicos',
    'Tropicales', 
    'Martinis',
    'Hard Drinks',
    'Soft Drinks',
    'Shots',
    'Hot Drinks',
    'Non-Alcoholic'
  ]

  const difficulties = [
    'Fácil',
    'Intermedio', 
    'Avanzado',
    'Experto'
  ]

  const handleImageUpload = (url: string, key: string) => {
    setFormData(prev => ({
      ...prev,
      image: url,
      imageKey: key
    }))
  }

  const handleImageRemove = (key: string) => {
    setFormData(prev => ({
      ...prev,
      image: '',
      imageKey: ''
    }))
  }

  const addIngredient = () => {
    setIngredients(prev => [...prev, { name: '', amount: '', unit: '' }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(prev => prev.filter((_, i) => i !== index))
  }

  const updateIngredient = (index: number, field: string, value: string) => {
    setIngredients(prev => prev.map((ingredient, i) => 
      i === index ? { ...ingredient, [field]: value } : ingredient
    ))
  }

  const addInstruction = () => {
    setInstructions(prev => [...prev, ''])
  }

  const removeInstruction = (index: number) => {
    setInstructions(prev => prev.filter((_, i) => i !== index))
  }

  const updateInstruction = (index: number, value: string) => {
    setInstructions(prev => prev.map((instruction, i) => 
      i === index ? value : instruction
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const cocktailData = {
      ...formData,
      ingredients: ingredients.filter(ing => ing.name.trim() !== ''),
      instructions: instructions.filter(inst => inst.trim() !== '')
    }
    
    onSubmit(cocktailData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Información Básica */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Wine className="h-5 w-5 text-primary-600" />
          Información Básica
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nombre del Cóctel *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ej: Old Fashioned"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Categoría *
            </label>
            <Select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dificultad *
            </label>
            <Select
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
              required
            >
              <option value="">Seleccionar dificultad</option>
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tiempo de Preparación *
            </label>
            <Input
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              placeholder="Ej: 5 min"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ABV (% Alcohol)
            </label>
            <Input
              type="number"
              value={formData.abv}
              onChange={(e) => setFormData(prev => ({ ...prev, abv: Number(e.target.value) }))}
              placeholder="Ej: 25"
              min="0"
              max="100"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Descripción
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe el cóctel, su historia, sabor..."
            rows={4}
          />
        </div>
      </div>

      {/* Imagen */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary-600" />
          Imagen del Cóctel
        </h3>
        
        <ImageUpload
          folder="cocktails"
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
          currentImage={formData.image}
          currentKey={formData.imageKey}
          maxImages={1}
        />
      </div>

      {/* Ingredientes */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Star className="h-5 w-5 text-primary-600" />
            Ingredientes
          </h3>
          <Button
            type="button"
            onClick={addIngredient}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Añadir Ingrediente
          </Button>
        </div>

        <div className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div className="flex-1">
                <Input
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                  placeholder="Nombre del ingrediente"
                />
              </div>
              <div className="w-24">
                <Input
                  value={ingredient.amount}
                  onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                  placeholder="Cantidad"
                />
              </div>
              <div className="w-24">
                <Input
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                  placeholder="Unidad"
                />
              </div>
              <Button
                type="button"
                onClick={() => removeIngredient(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instrucciones */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary-600" />
            Instrucciones
          </h3>
          <Button
            type="button"
            onClick={addInstruction}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Añadir Paso
          </Button>
        </div>

        <div className="space-y-4">
          {instructions.map((instruction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-sm font-semibold text-primary-600">
                {index + 1}
              </div>
              <div className="flex-1">
                <Textarea
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  placeholder="Describe el paso de preparación..."
                  rows={2}
                />
              </div>
              <Button
                type="button"
                onClick={() => removeInstruction(index)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center justify-end gap-4">
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancelar
          </Button>
        )}
        
        <Button
          type="submit"
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Guardar Cóctel
        </Button>
      </div>
    </form>
  )
}
