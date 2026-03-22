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
5. Copia la `DATABASE_URL` que te proporciona (Variables del servicio Postgres)

**URL interna vs pública:** si la URL contiene `*.railway.internal`, **solo funciona dentro de la red de Railway** (el deploy). Desde tu PC para `npm run dev` o `npm run db:check` necesitas la **URL pública**: en el plugin Postgres → **Connect** → *Public network* / *TCP proxy* (o variable tipo `DATABASE_PUBLIC_URL` si la añades). Pon esa URL en `DATABASE_URL_RAILWAY` del `.env.local`.

**En Railway (deploy):** no hace falta `DATABASE_URL_LOCAL` / `DATABASE_TARGET`. Basta con que el proyecto tenga la variable `DATABASE_URL` que Railway inyecta al vincular Postgres.

### Usar local y Railway a la vez (desarrollo)

1. Copia la plantilla: `cp .env.example .env.local` (o fusiona con tu `.env` actual).
2. Rellena:
   - `DATABASE_URL_LOCAL` → tu Postgres en `localhost`
   - `DATABASE_URL_RAILWAY` → URL que copias del panel de Railway
   - `DATABASE_TARGET=local` o `DATABASE_TARGET=railway` según a qué base quieras que apunte **`npm run dev`**
3. La app usa `src/lib/databaseUrl.ts` y `src/lib/prisma.ts` para conectar según esas variables.
4. **Prisma CLI** contra una u otra base:
   - `npm run db:push:local` → empuja esquema al Postgres local
   - `npm run db:push:railway` → empuja esquema a Railway
   - `npm run db:studio:local` / `npm run db:studio:railway` → Prisma Studio en cada una

Si solo defines **`DATABASE_URL`** (sin `_LOCAL` / `_RAILWAY`), todo sigue funcionando como antes: una sola base.

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
cp .env.example .env.local

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
- `npm run db:push` - Sincronizar esquema (usa `DATABASE_URL` del entorno)
- `npm run db:push:local` - `db push` contra `DATABASE_URL_LOCAL` (o `DATABASE_URL` si no hay local)
- `npm run db:push:railway` - `db push` contra `DATABASE_URL_RAILWAY` (fallback `DATABASE_URL`)
- `npm run db:studio:local` / `db:studio:railway` - Prisma Studio en cada base
- `npm run db:check` - Prueba conexión a `DATABASE_URL_LOCAL`, `DATABASE_URL_RAILWAY` y `DATABASE_URL` (sin mostrar contraseñas)
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
