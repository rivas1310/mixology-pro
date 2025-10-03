'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Star, Users, Award } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

const stats = [
  { icon: Star, value: '500+', label: 'Recetas Profesionales' },
  { icon: Users, value: '10K+', label: 'Bartenders Activos' },
  { icon: Award, value: '50+', label: 'Técnicas Avanzadas' },
]

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Background Elements with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div 
          style={{ scale }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl animate-float" 
        />
        <motion.div 
          style={{ scale }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200/30 dark:bg-accent-800/20 rounded-full blur-3xl animate-float" 
          animate={{ 
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-100/20 to-accent-100/20 dark:from-primary-900/20 dark:to-accent-900/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Cocktail Emojis */}
        {['🍸', '🍹', '🍺', '🍷', '🥃', '🍾'].map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl opacity-10 dark:opacity-20"
            style={{
              left: `${15 + index * 15}%`,
              top: `${20 + (index % 3) * 20}%`,
            }}
            animate={{ 
              y: [0, -30, 0],
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              El Santo Grial del Bartender
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 bg-clip-text text-transparent">
                Mixology
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Professional
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              La plataforma definitiva para bartenders profesionales. Recetas, técnicas, 
              ingredientes y herramientas en un solo lugar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/cocktails">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/25 transition-all duration-300"
                >
                  Explorar Cócteles
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <Link href="/techniques">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-primary-600 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                >
                  Ver Técnicas
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10"
            >
              {/* Main Cocktail Display */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-primary-400 via-primary-500 to-accent-500 rounded-full blur-3xl opacity-30"
                />
                <motion.div
                  className="relative w-full h-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[12rem] animate-float">
                    🍸
                  </div>
                </motion.div>

                {/* Floating Ingredient Icons */}
                {[
                  { emoji: '🍋', delay: 0, x: '10%', y: '20%' },
                  { emoji: '🍊', delay: 1, x: '80%', y: '30%' },
                  { emoji: '🌿', delay: 2, x: '15%', y: '70%' },
                  { emoji: '🧊', delay: 3, x: '85%', y: '75%' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-4xl"
                    style={{
                      left: item.x,
                      top: item.y,
                    }}
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: item.delay
                    }}
                  >
                    {item.emoji}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-10 -left-10 w-40 h-40 bg-primary-300/30 dark:bg-primary-700/20 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-300/30 dark:bg-accent-700/20 rounded-full blur-2xl"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500"
        >
          <span className="text-sm font-medium">Scroll para descubrir</span>
          <ArrowRight className="h-5 w-5 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  )
}
