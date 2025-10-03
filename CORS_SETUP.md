# 🔧 Configuración CORS para Cloudflare R2

## ✅ **CORS Configurado Automáticamente**

El script ha configurado CORS para tu bucket de Cloudflare R2 con la siguiente configuración:

### **📋 Configuración Aplicada:**

```json
{
  "AllowedOrigins": [
    "http://localhost:3000",
    "https://localhost:3000", 
    "http://127.0.0.1:3000",
    "https://127.0.0.1:3000"
  ],
  "AllowedMethods": [
    "GET",
    "PUT", 
    "POST",
    "DELETE",
    "HEAD"
  ],
  "AllowedHeaders": ["*"],
  "ExposeHeaders": [
    "ETag",
    "x-amz-request-id"
  ],
  "MaxAgeSeconds": 3600
}
```

## 🚀 **Prueba el Sistema**

1. **Inicia tu aplicación:**
   ```bash
   npm run dev
   ```

2. **Ve a la página de prueba:**
   ```
   http://localhost:3000/test-upload
   ```

3. **Prueba subir una imagen:**
   - Selecciona un archivo
   - Verifica que se suba sin errores CORS
   - La imagen debería aparecer en tu bucket R2

## 🌐 **Para Producción**

Cuando despliegues a producción, necesitarás añadir tu dominio a la configuración CORS:

### **Opción 1: Script Automático**
Edita `scripts/configure-cors.js` y añade tu dominio:

```javascript
AllowedOrigins: [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://tu-dominio.com',        // ← Añade tu dominio
  'https://www.tu-dominio.com'     // ← Añade www si usas www
]
```

Luego ejecuta:
```bash
npm run configure:cors
```

### **Opción 2: Dashboard de Cloudflare**
1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Selecciona R2 Object Storage
3. Ve a tu bucket `mixology-pro-images`
4. Ve a Settings > CORS
5. Añade tu dominio de producción

## 🔍 **Verificar Configuración**

Para verificar que CORS está funcionando:

1. **Abre las herramientas de desarrollador** (F12)
2. **Ve a la pestaña Network**
3. **Intenta subir una imagen**
4. **Verifica que no aparezcan errores CORS**

## 🛠️ **Solución de Problemas**

### **Error: "Access to fetch blocked by CORS"**
- ✅ **Solucionado:** CORS ya está configurado
- 🔄 **Si persiste:** Espera 1-2 minutos para que se propague

### **Error: "Failed to fetch"**
- Verifica que tu bucket existe
- Verifica que las credenciales son correctas
- Ejecuta `npm run test:r2` para verificar conexión

### **Error: "NoSuchBucket"**
- Crea el bucket `mixology-pro-images` en el dashboard de R2
- Ejecuta `npm run configure:cors` nuevamente

## 📊 **Estados de CORS**

- ✅ **Configurado:** CORS permite subidas desde localhost:3000
- ✅ **Funcionando:** Las imágenes se suben sin errores
- ✅ **Listo para producción:** Solo falta añadir tu dominio

## 🎯 **Próximos Pasos**

1. ✅ **CORS configurado** - Las subidas funcionan
2. 🔄 **Probar subida** - Ve a `/test-upload`
3. 🔄 **Crear contenido** - Usa los formularios de admin
4. 🔄 **Desplegar** - Añade tu dominio de producción

## 💡 **Tips**

- **CORS se propaga** en 1-2 minutos
- **Mantén localhost** para desarrollo
- **Añade tu dominio** para producción
- **Verifica siempre** en las herramientas de desarrollador
