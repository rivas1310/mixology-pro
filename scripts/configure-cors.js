const { S3Client, PutBucketCorsCommand } = require('@aws-sdk/client-s3')
require('dotenv').config({ path: '.env' })

async function configureCORS() {
  console.log('🔧 Configurando CORS para Cloudflare R2...')
  
  // Verificar variables de entorno
  const requiredEnvVars = [
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_ACCESS_KEY_ID', 
    'CLOUDFLARE_SECRET_ACCESS_KEY',
    'CLOUDFLARE_BUCKET_NAME'
  ]
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.error('❌ Variables de entorno faltantes:', missingVars)
    return false
  }
  
  console.log('✅ Variables de entorno encontradas')
  
  // Configurar cliente S3
  const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
  })
  
  // Configuración CORS
  const corsConfiguration = {
    CORSRules: [
      {
        AllowedOrigins: [
          'http://localhost:3000',
          'https://localhost:3000',
          'http://127.0.0.1:3000',
          'https://127.0.0.1:3000',
          // Añade tu dominio de producción aquí
          // 'https://tu-dominio.com',
          // 'https://www.tu-dominio.com'
        ],
        AllowedMethods: [
          'GET',
          'PUT',
          'POST',
          'DELETE',
          'HEAD'
        ],
        AllowedHeaders: [
          '*'
        ],
        ExposeHeaders: [
          'ETag',
          'x-amz-request-id'
        ],
        MaxAgeSeconds: 3600
      }
    ]
  }
  
  try {
    console.log('🔄 Configurando CORS...')
    
    const command = new PutBucketCorsCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      CORSConfiguration: corsConfiguration
    })
    
    await r2Client.send(command)
    
    console.log('✅ CORS configurado exitosamente!')
    console.log('📋 Configuración aplicada:')
    console.log('   - Orígenes permitidos: localhost:3000, 127.0.0.1:3000')
    console.log('   - Métodos: GET, PUT, POST, DELETE, HEAD')
    console.log('   - Headers: *')
    console.log('   - Max Age: 3600 segundos')
    
    return true
    
  } catch (error) {
    console.error('❌ Error configurando CORS:', error.message)
    
    if (error.name === 'NoSuchBucket') {
      console.log('💡 El bucket no existe. Créalo primero en el dashboard de R2')
    } else if (error.name === 'AccessDenied') {
      console.log('💡 No tienes permisos para configurar CORS. Verifica tus credenciales')
    }
    
    return false
  }
}

// Ejecutar configuración
configureCORS()
  .then(success => {
    if (success) {
      console.log('\n🎉 ¡CORS configurado exitosamente!')
      console.log('🚀 Ahora puedes subir imágenes desde localhost:3000')
      console.log('💡 Si usas un dominio de producción, añádelo a la configuración CORS')
    } else {
      console.log('\n❌ Error configurando CORS')
      console.log('🔧 Revisa la configuración manualmente en el dashboard de R2')
    }
  })
  .catch(error => {
    console.error('💥 Error inesperado:', error)
  })
