# 🗄️ Configuración de Base de Datos

## Opciones de Base de Datos

### 1. PostgreSQL Local

```bash
# Instalar PostgreSQL (Ubuntu/Debian)
sudo apt update
sudo apt install postgresql postgresql-contrib

# Crear base de datos
sudo -u postgres createdb mixology_pro

# Configurar usuario (opcional)
sudo -u postgres psql
CREATE USER mixology_user WITH PASSWORD 'tu_password';
GRANT ALL PRIVILEGES ON DATABASE mixology_pro TO mixology_user;
```

**DATABASE_URL para local:**
```
DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/mixology_pro"
```

### 2. Railway (Recomendado para producción)

1. Ve a [Railway.app](https://railway.app)
2. Crea una cuenta y conecta tu GitHub
3. Crea un nuevo proyecto
4. Añade una base de datos PostgreSQL
5. Copia la DATABASE_URL que te proporciona

### 3. Supabase (Alternativa)

1. Ve a [Supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a Settings > Database
4. Copia la Connection String

**DATABASE_URL para Supabase:**
```
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
```

## Configuración del Proyecto

### 1. Crear archivo de entorno

```bash
# Copia el archivo de ejemplo
cp env.example .env.local

# Edita .env.local con tus datos
nano .env.local
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar base de datos

```bash
# Generar cliente de Prisma
npm run db:generate

# Crear tablas en la base de datos
npm run db:push

# Poblar con datos iniciales
npm run db:seed
```

### 4. Verificar configuración

```bash
# Abrir Prisma Studio (opcional)
npm run db:studio

# Iniciar aplicación
npm run dev
```

## Scripts Disponibles

- `npm run db:generate` - Generar cliente de Prisma
- `npm run db:push` - Sincronizar esquema con la base de datos
- `npm run db:migrate` - Crear migración
- `npm run db:seed` - Poblar base de datos con datos iniciales
- `npm run db:setup` - Configuración completa (generate + push + seed)
- `npm run db:studio` - Abrir Prisma Studio

## Estructura de la Base de Datos

### Tablas Principales

- **users** - Usuarios del sistema
- **cocktails** - Recetas de cócteles
- **ingredients** - Ingredientes disponibles
- **cocktail_ingredients** - Relación cóctel-ingrediente
- **cocktail_instructions** - Pasos de preparación
- **cocktail_favorites** - Favoritos de usuarios
- **cocktail_reviews** - Reseñas y calificaciones

### Datos Iniciales

El seed incluye:
- 4 ingredientes esenciales (Limón, Lima, Menta, Jarabe Simple)
- 3 cócteles clásicos (Old Fashioned, Mojito, Dry Martini)
- Relaciones entre cócteles e ingredientes
- Instrucciones paso a paso

## Solución de Problemas

### Error de conexión
```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Verificar conexión
psql -h localhost -U postgres -d mixology_pro
```

### Error de permisos
```bash
# Dar permisos al usuario
sudo -u postgres psql
GRANT ALL PRIVILEGES ON DATABASE mixology_pro TO tu_usuario;
```

### Resetear base de datos
```bash
# Eliminar y recrear
npx prisma db push --force-reset
npm run db:seed
```

## Variables de Entorno Requeridas

```env
# Base de datos
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth (opcional)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-key"

# API Keys (opcional)
UNSPLASH_ACCESS_KEY="tu-unsplash-key"
UNSPLASH_SECRET_KEY="tu-unsplash-secret"
```

## Próximos Pasos

1. ✅ Configurar base de datos
2. ✅ Ejecutar seed inicial
3. 🔄 Conectar con la aplicación
4. 🔄 Implementar autenticación
5. 🔄 Crear panel de administración
