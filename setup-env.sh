#!/bin/bash

echo "🔧 Configurando variables de entorno para Cloudflare R2..."

# Crear archivo .env.local
cat > .env.local << 'EOF'
# Base de datos PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/mixology_pro"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# Cloudflare R2 - Configuración con tus credenciales
CLOUDFLARE_ACCOUNT_ID="e8a8b952b622c99dd6ef04f58cd87ed8"
CLOUDFLARE_ACCESS_KEY_ID="1ff1137855e66b2496b2db97a867728b"
CLOUDFLARE_SECRET_ACCESS_KEY="aec4c3827e0305843bc827817ecc07ddff24632f26209df725149b078d7ad7c6"
CLOUDFLARE_BUCKET_NAME="mixology-pro-images"

# API Keys (opcional)
UNSPLASH_ACCESS_KEY="your-unsplash-key"
UNSPLASH_SECRET_KEY="your-unsplash-secret"

# Configuración de desarrollo
NODE_ENV="development"
EOF

echo "✅ Archivo .env.local creado exitosamente!"
echo ""
echo "📝 Credenciales configuradas:"
echo "   - Account ID: e8a8b952b622c99dd6ef04f58cd87ed8"
echo "   - Access Key ID: 1ff1137855e66b2496b2db97a867728b"
echo "   - Bucket: mixology-pro-images"
echo ""
echo "🚀 Ahora puedes ejecutar:"
echo "   npm run dev"
echo ""
echo "⚠️  IMPORTANTE: Asegúrate de configurar tu DATABASE_URL en .env.local"
