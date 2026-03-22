# 🍹 Mixology Pro - El Santo Grial del Bartender

La plataforma más completa para bartenders y mixólogos profesionales. Una aplicación web moderna construida con Next.js 14, TypeScript, Tailwind CSS y PostgreSQL.

## ✨ Características

### 🎯 Para Bartenders Profesionales
- **500+ Recetas Profesionales** con técnicas detalladas
- **Base de Datos Completa** de licores, ingredientes y marcas
- **Buscador Inteligente** por ingredientes disponibles
- **Calculadora de Costos** y márgenes de ganancia
- **Sistema de Favoritos** y notas personales
- **Historia y Trivia** de cada cóctel

### 🛠️ Herramientas Profesionales
- **Técnicas de Mixología** paso a paso
- **Guía de Ingredientes** con enlaces informativos
- **Categorización Avanzada** por tipo de licor
- **Sistema de Ratings** y reviews
- **Preparación para Cervezas** (próximamente)

### 🎨 Interfaz Moderna
- **Diseño Responsive** optimizado para móviles
- **Modo Oscuro/Claro** automático
- **Animaciones Fluidas** con Framer Motion
- **UX Profesional** para uso en barra

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Node.js + Express (Railway)
- **Base de Datos**: PostgreSQL (Railway)
- **ORM**: Prisma
- **Deploy**: Vercel (Frontend) + Railway (Backend)
- **Autenticación**: NextAuth.js

## 📦 Instalación

### Prerrequisitos
- Node.js 18+
- PostgreSQL
- Railway CLI (opcional)

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/mixology-pro.git
cd mixology-pro
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales. **Una sola base:**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/mixology_pro"
```

**PostgreSQL local + Railway a la vez:** define `DATABASE_URL_LOCAL`, `DATABASE_URL_RAILWAY` y `DATABASE_TARGET=local` o `railway`. Detalle en `DATABASE_SETUP.md`.

```env
NEXTAUTH_SECRET="tu-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Configurar base de datos
```bash
# Generar cliente Prisma
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# (Opcional) Abrir Prisma Studio
npm run db:studio
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗄️ Estructura de Base de Datos

### Entidades Principales
- **Cocktails**: Recetas con ingredientes, técnicas y metadatos
- **Ingredients**: Licores, jugos, frutas con información detallada
- **Users**: Sistema de usuarios con roles (USER, BARTENDER, ADMIN)
- **Ratings & Reviews**: Sistema de calificaciones
- **Favorites**: Cócteles favoritos por usuario
- **Notes**: Notas personales de bartenders

### Relaciones
- Cócteles ↔ Ingredientes (Many-to-Many)
- Usuarios ↔ Cócteles (Favoritos, Ratings, Notas)
- Categorías y Tags para organización

## 🚀 Deploy en Railway

### 1. Configurar Railway
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Inicializar proyecto
railway init
```

### 2. Configurar Base de Datos
```bash
# Crear servicio PostgreSQL
railway add postgresql

# Railway inyecta DATABASE_URL en el servicio web automáticamente al vincular Postgres
railway variables
```

### 3. Deploy
```bash
# Deploy automático
railway up
```

## 📱 Características Móviles

- **PWA Ready**: Instalable como app móvil
- **Offline Support**: Funciona sin conexión
- **Touch Optimized**: Gestos táctiles optimizados
- **Responsive Design**: Adaptable a cualquier pantalla

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run type-check   # Verificación de tipos
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar esquema
npm run db:migrate   # Ejecutar migraciones
npm run db:studio    # Abrir Prisma Studio
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Comunidad de Bartenders** por las recetas y técnicas
- **Next.js Team** por el framework increíble
- **Tailwind CSS** por el sistema de diseño
- **Railway** por la infraestructura
- **Vercel** por el hosting

---

**¿Listo para dominar el arte de la mixología?** 🍸✨

[Demo en vivo](https://mixology-pro.vercel.app) | [Documentación](https://docs.mixology-pro.com) | [Soporte](https://github.com/tu-usuario/mixology-pro/issues)

