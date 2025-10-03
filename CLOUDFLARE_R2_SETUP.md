# 🖼️ Configuración de Cloudflare R2 para Imágenes

## 📋 **Pasos para Configurar R2**

### **1. Crear Cuenta en Cloudflare**

1. Ve a [Cloudflare.com](https://cloudflare.com)
2. Crea una cuenta gratuita
3. Verifica tu email

### **2. Configurar R2 Object Storage**

1. **Accede al Dashboard:**
   - Ve a [dash.cloudflare.com](https://dash.cloudflare.com)
   - Selecciona "R2 Object Storage"

2. **Crear Bucket:**
   ```
   Nombre: mixology-pro-images
   Ubicación: Elige la más cercana a tus usuarios
   ```

3. **Configurar CORS:**
   - Ve a tu bucket > Settings > CORS
   - Añade esta configuración:
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

### **3. Obtener Credenciales API**

1. **Ve a R2 > Manage R2 API tokens**
2. **Crea un nuevo token:**
   ```
   Nombre: mixology-pro-upload
   Permissions: Object Read & Write
   Bucket: mixology-pro-images
   ```
3. **Copia las credenciales:**
   - Account ID
   - Access Key ID  
   - Secret Access Key

### **4. Configurar Variables de Entorno**

Crea/edita tu archivo `.env.local`:

```env
# Cloudflare R2
CLOUDFLARE_ACCOUNT_ID="tu-account-id"
CLOUDFLARE_ACCESS_KEY_ID="tu-access-key-id"
CLOUDFLARE_SECRET_ACCESS_KEY="tu-secret-access-key"
CLOUDFLARE_BUCKET_NAME="mixology-pro-images"
```

### **5. Configurar Dominio Público (Opcional)**

Para URLs más limpias:

1. **Ve a R2 > Settings > Public access**
2. **Habilita Custom Domains**
3. **Añade tu dominio:**
   ```
   images.tudominio.com
   ```

## 🚀 **Uso en la Aplicación**

### **Subir Imagen de Cóctel**

```tsx
import { ImageUpload } from '@/components/ui/ImageUpload'

function CocktailForm() {
  const handleImageUpload = (url: string, key: string) => {
    // Guardar en base de datos
    console.log('Imagen subida:', url, key)
  }

  return (
    <ImageUpload
      folder="cocktails"
      onImageUpload={handleImageUpload}
      maxImages={1}
    />
  )
}
```

### **Subir Múltiples Imágenes**

```tsx
<ImageUpload
  folder="ingredients"
  onImageUpload={handleImageUpload}
  maxImages={5}
/>
```

## 📁 **Estructura de Archivos en R2**

```
mixology-pro-images/
├── cocktails/
│   ├── user123-1640995200000-abc123.jpg
│   ├── user456-1640995300000-def456.png
│   └── ...
├── ingredients/
│   ├── lemon-1640995400000-ghi789.jpg
│   ├── mint-1640995500000-jkl012.png
│   └── ...
├── spirits/
│   ├── whisky-1640995600000-mno345.jpg
│   ├── tequila-1640995700000-pqr678.png
│   └── ...
└── users/
    ├── user123-1640995800000-stu901.jpg
    └── ...
```

## 🔧 **Configuraciones Avanzadas**

### **Optimización de Imágenes**

```tsx
// En tu componente
const optimizedImageUrl = `${imageUrl}?w=800&h=600&f=webp&q=80`
```

### **CDN y Caché**

```tsx
// Headers para mejor rendimiento
const imageHeaders = {
  'Cache-Control': 'public, max-age=31536000',
  'Content-Type': 'image/webp'
}
```

### **Limpieza Automática**

```tsx
// Eliminar imágenes huérfanas
const cleanupOrphanedImages = async () => {
  // Implementar lógica de limpieza
}
```

## 💰 **Costos de R2**

### **Precios (USD)**

- **Almacenamiento:** $0.015/GB/mes
- **Operaciones Clase A:** $4.50/millón
- **Operaciones Clase B:** $0.36/millón
- **Egress:** $0.09/GB

### **Ejemplo de Costos Mensuales**

```
1,000 imágenes (5MB c/u) = 5GB
- Almacenamiento: $0.075/mes
- 10,000 vistas/mes: $0.45/mes
- Total: ~$0.53/mes
```

## 🛡️ **Seguridad**

### **Mejores Prácticas**

1. **Rotar credenciales regularmente**
2. **Usar URLs firmadas para subidas**
3. **Validar tipos de archivo**
4. **Limitar tamaños de archivo**
5. **Implementar rate limiting**

### **Configuración de Seguridad**

```tsx
// Validaciones en el servidor
const validateImage = (file: File) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  const maxSize = 5 * 1024 * 1024 // 5MB
  
  return allowedTypes.includes(file.type) && file.size <= maxSize
}
```

## 🔍 **Monitoreo y Analytics**

### **Métricas Importantes**

- **Uso de almacenamiento**
- **Número de requests**
- **Egress de datos**
- **Errores de subida**

### **Dashboard de Cloudflare**

- Ve a R2 > Analytics
- Monitorea uso y costos
- Configura alertas

## 🚨 **Solución de Problemas**

### **Error: Access Denied**
```bash
# Verificar credenciales
echo $CLOUDFLARE_ACCESS_KEY_ID
echo $CLOUDFLARE_SECRET_ACCESS_KEY
```

### **Error: CORS**
```json
// Verificar configuración CORS en R2
{
  "AllowedOrigins": ["https://tudominio.com"],
  "AllowedMethods": ["GET", "PUT", "POST"],
  "AllowedHeaders": ["*"]
}
```

### **Error: File Too Large**
```tsx
// Ajustar límites en useImageUpload
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
```

## 📚 **Recursos Adicionales**

- [Documentación R2](https://developers.cloudflare.com/r2/)
- [AWS SDK para R2](https://docs.aws.amazon.com/sdk-for-javascript/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
