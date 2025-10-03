const { S3Client, ListBucketsCommand } = require('@aws-sdk/client-s3')
require('dotenv').config({ path: '.env' })

async function testR2Connection() {
  console.log('🔍 Probando conexión con Cloudflare R2...')
  
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
    console.log('💡 Asegúrate de que .env.local existe y contiene todas las variables requeridas')
    return false
  }
  
  console.log('✅ Variables de entorno encontradas')
  console.log(`   - Account ID: ${process.env.CLOUDFLARE_ACCOUNT_ID}`)
  console.log(`   - Access Key ID: ${process.env.CLOUDFLARE_ACCESS_KEY_ID}`)
  console.log(`   - Bucket: ${process.env.CLOUDFLARE_BUCKET_NAME}`)
  
  // Configurar cliente S3
  const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
  })
  
  try {
    // Probar conexión listando buckets
    console.log('🔄 Probando conexión...')
    const command = new ListBucketsCommand({})
    const response = await r2Client.send(command)
    
    console.log('✅ ¡Conexión exitosa con Cloudflare R2!')
    console.log(`📦 Buckets disponibles: ${response.Buckets?.length || 0}`)
    
    if (response.Buckets) {
      response.Buckets.forEach(bucket => {
        console.log(`   - ${bucket.Name} (creado: ${bucket.CreationDate})`)
      })
    }
    
    // Verificar si el bucket objetivo existe
    const targetBucket = process.env.CLOUDFLARE_BUCKET_NAME
    const bucketExists = response.Buckets?.some(bucket => bucket.Name === targetBucket)
    
    if (bucketExists) {
      console.log(`✅ Bucket '${targetBucket}' encontrado`)
    } else {
      console.log(`⚠️  Bucket '${targetBucket}' no encontrado`)
      console.log('💡 Asegúrate de crear el bucket en el dashboard de Cloudflare R2')
    }
    
    return true
    
  } catch (error) {
    console.error('❌ Error conectando con R2:', error.message)
    
    if (error.name === 'InvalidAccessKeyId') {
      console.log('💡 Verifica tu Access Key ID')
    } else if (error.name === 'SignatureDoesNotMatch') {
      console.log('💡 Verifica tu Secret Access Key')
    } else if (error.name === 'NoSuchBucket') {
      console.log('💡 El bucket no existe, créalo en el dashboard de R2')
    }
    
    return false
  }
}

// Ejecutar prueba
testR2Connection()
  .then(success => {
    if (success) {
      console.log('\n🎉 ¡Configuración de R2 completada exitosamente!')
      console.log('🚀 Puedes usar el sistema de subida de imágenes')
    } else {
      console.log('\n❌ Error en la configuración de R2')
      console.log('🔧 Revisa las credenciales y configuración')
    }
  })
  .catch(error => {
    console.error('💥 Error inesperado:', error)
  })
