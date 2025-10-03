'use client'

import { motion } from 'framer-motion'
import { 
  Wine, 
  Users, 
  TrendingUp, 
  Star,
  Clock,
  Eye,
  Plus,
  BarChart3,
  Activity,
  Award,
  Zap
} from 'lucide-react'

const stats = [
  {
    title: 'Total Cócteles',
    value: '1,247',
    change: '+12%',
    changeType: 'positive',
    icon: Wine,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Usuarios Activos',
    value: '8,432',
    change: '+8%',
    changeType: 'positive',
    icon: Users,
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Recetas Favoritas',
    value: '15,678',
    change: '+23%',
    changeType: 'positive',
    icon: Star,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    title: 'Tiempo Promedio',
    value: '3.2 min',
    change: '-5%',
    changeType: 'negative',
    icon: Clock,
    color: 'from-purple-500 to-purple-600'
  }
]

const recentActivities = [
  {
    id: 1,
    action: 'Nueva receta creada',
    item: 'Margarita Premium',
    user: 'Carlos Mendoza',
    time: 'Hace 2 horas',
    type: 'cocktail'
  },
  {
    id: 2,
    action: 'Licor actualizado',
    item: 'Don Julio 1942',
    user: 'Ana García',
    time: 'Hace 4 horas',
    type: 'spirit'
  },
  {
    id: 3,
    action: 'Usuario registrado',
    item: 'Bartender Pro',
    user: 'Diego Herrera',
    time: 'Hace 6 horas',
    type: 'user'
  },
  {
    id: 4,
    action: 'Receta modificada',
    item: 'Old Fashioned',
    user: 'Sofia Rodriguez',
    time: 'Hace 8 horas',
    type: 'cocktail'
  }
]

const quickActions = [
  {
    title: 'Crear Cóctel',
    description: 'Añadir nueva receta',
    icon: Plus,
    href: '/admin/cocktails/new',
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Añadir Licor',
    description: 'Nuevo destilado',
    icon: Wine,
    href: '/admin/spirits/new',
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Ver Estadísticas',
    description: 'Reportes detallados',
    icon: BarChart3,
    href: '/admin/analytics',
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Gestionar Usuarios',
    description: 'Administrar cuentas',
    icon: Users,
    href: '/admin/users',
    color: 'from-orange-500 to-orange-600'
  }
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Resumen general del sistema y actividad reciente
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.changeType === 'positive' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <TrendingUp className={`h-4 w-4 ${
                  stat.changeType === 'negative' ? 'rotate-180' : ''
                }`} />
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {stat.title}
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Actividad Reciente
            </h2>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'cocktail' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  activity.type === 'spirit' ? 'bg-green-100 dark:bg-green-900/20' :
                  'bg-purple-100 dark:bg-purple-900/20'
                }`}>
                  {activity.type === 'cocktail' ? <Wine className="h-5 w-5 text-blue-600 dark:text-blue-400" /> :
                   activity.type === 'spirit' ? <Award className="h-5 w-5 text-green-600 dark:text-green-400" /> :
                   <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {activity.item} • {activity.user}
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Acciones Rápidas
              </h2>
            </div>
            
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.a
                  key={index}
                  href={action.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {action.description}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Estado del Sistema
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Base de Datos</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-green-600 dark:text-green-400">Conectada</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">API</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-green-600 dark:text-green-400">Activa</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Almacenamiento</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">75% usado</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
