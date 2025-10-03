#!/bin/bash

# Script para configurar la base de datos
echo "🍹 Configurando base de datos para Mixology Pro..."

# Verificar si existe .env.local
if [ ! -f ".env.local" ]; then
    echo "📝 Creando archivo .env.local..."
    cp env.example .env.local
    echo "✅ Archivo .env.local creado. Por favor, edita las variables de entorno."
    echo "🔧 Configura tu DATABASE_URL en .env.local"
    echo ""
    echo "Ejemplo de DATABASE_URL:"
    echo "DATABASE_URL=\"postgresql://username:password@localhost:5432/mixology_pro\""
    echo ""
    echo "Para PostgreSQL local:"
    echo "DATABASE_URL=\"postgresql://postgres:password@localhost:5432/mixology_pro\""
    echo ""
    echo "Para Railway:"
    echo "DATABASE_URL=\"postgresql://user:password@host:port/database\""
    echo ""
    read -p "Presiona Enter cuando hayas configurado .env.local..."
fi

# Instalar dependencias de Prisma
echo "📦 Instalando dependencias de Prisma..."
npm install prisma @prisma/client

# Generar cliente de Prisma
echo "🔧 Generando cliente de Prisma..."
npx prisma generate

# Ejecutar migraciones
echo "🗄️ Ejecutando migraciones..."
npx prisma db push

# Opcional: Seed de datos
echo "🌱 ¿Quieres ejecutar el seed de datos? (y/n)"
read -p "> " seed_choice
if [ "$seed_choice" = "y" ] || [ "$seed_choice" = "Y" ]; then
    echo "🌱 Ejecutando seed de datos..."
    npx prisma db seed
fi

echo "✅ ¡Base de datos configurada correctamente!"
echo "🚀 Puedes ejecutar 'npm run dev' para iniciar la aplicación"
