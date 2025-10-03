# 🚀 Configuración Manual de Cloudflare R2

## 📋 **Pasos para Configurar R2**

### **1. Crear archivo .env.local**

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Base de datos PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/mixology_pro"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-this-in-production"

# Cloudflare R2 - TUS CREDENCIALES
CLOUDFLARE_ACCOUNT_ID="e8a8b952b622c99dd6ef04f58cd87ed8"
CLOUDFLARE_ACCESS_KEY_ID="1ff1137855e66b2496b2db97a867728b"
CLOUDFLARE_SECRET_ACCESS_KEY="aec4c3827e0305843bc827817ecc07ddff24632f26209df725149b078d7ad7c6"
CLOUDFLARE_BUCKET_NAME="mixology-pro-images"

# API Keys (opcional)
UNSPLASH_ACCESS_KEY="your-unsplash-key"
UNSPLASH_SECRET_KEY="your-unsplash-secret"

# Configuración de desarrollo
NODE_ENV="development"
```

### **2. Crear Bucket en Cloudflare R2**

1. **Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)**
2. **Selecciona R2 Object Storage**
3. **Crea un nuevo bucket:**
   - Nombre: `mixology-pro-images`
   - Ubicación: Elige la más cercana a tus usuarios

### **3. Configurar CORS en R2**

1. **Ve a tu bucket > Settings > CORS**
2. **Añade esta configuración:**

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }
]
```

### **4. Probar la Conexión**

```bash
# Instalar dependencias
npm install

# Probar conexión con R2
npm run test:r2
```

### **5. Iniciar la Aplicación**

```bash
# Iniciar servidor de desarrollo
npm run dev
```

### **6. Probar Subida de Imágenes**

1. **Ve a:** `http://localhost:3000/test-upload`
2. **Prueba la conexión** con el botón "Probar Conexión"
3. **Sube imágenes** arrastrando y soltando o haciendo clic
4. **Verifica** que las imágenes se suban correctamente

## 🔧 **Solución de Problemas**

### **Error: "Access Denied"**
- Verifica que las credenciales estén correctas en `.env.local`
- Asegúrate de que el bucket existe en R2

### **Error: "CORS"**
- Verifica la configuración CORS en tu bucket R2
- Asegúrate de que `AllowedOrigins` incluya tu dominio

### **Error: "Bucket not found"**
- Crea el bucket `mixology-pro-images` en R2
- Verifica que el nombre coincida exactamente

### **Error: "Invalid credentials"**
- Verifica que las credenciales estén copiadas correctamente
- Asegúrate de que no haya espacios extra

## 📊 **Verificar Configuración**

### **Variables de Entorno Requeridas:**
```bash
# Verificar que existen
echo $CLOUDFLARE_ACCOUNT_ID
echo $CLOUDFLARE_ACCESS_KEY_ID
echo $CLOUDFLARE_SECRET_ACCESS_KEY
echo $CLOUDFLARE_BUCKET_NAME
```

### **Estructura de Archivos Esperada:**
```
mixology-pro-images/
├── cocktails/
│   ├── user123-1640995200000-abc123.jpg
│   └── user456-1640995300000-def456.png
├── ingredients/
│   ├── lemon-1640995400000-ghi789.jpg
│   └── mint-1640995500000-jkl012.png
└── spirits/
    ├── whisky-1640995600000-mno345.jpg
    └── tequila-1640995700000-pqr678.png
```

## 🎯 **Próximos Pasos**

1. ✅ **Configurar .env.local** con tus credenciales
2. ✅ **Crear bucket** en Cloudflare R2
3. ✅ **Configurar CORS** en el bucket
4. ✅ **Probar conexión** con `npm run test:r2`
5. ✅ **Iniciar aplicación** con `npm run dev`
6. ✅ **Probar subida** en `/test-upload`

## 💡 **Tips de Uso**

- **URLs públicas:** Las imágenes estarán disponibles en `https://pub-[account-id].r2.dev/[key]`
- **Optimización:** R2 incluye CDN global automático
- **Costos:** Muy económicos para uso moderado (~$1/mes)
- **Seguridad:** URLs firmadas para subidas seguras

## 🆘 **Soporte**

Si tienes problemas:
1. Verifica que `.env.local` existe y tiene las credenciales correctas
2. Asegúrate de que el bucket existe en R2
3. Revisa la configuración CORS
4. Ejecuta `npm run test:r2` para diagnosticar
