const { S3Client, GetObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3')
require('dotenv').config({ path: '.env' })

async function checkR2PublicAccess() {
  console.log('🔍 Verificando acceso público de R2...')
  
  // Configurar cliente S3
  const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
  })
  
  const bucketName = process.env.CLOUDFLARE_BUCKET_NAME
  
  try {
    // Listar objetos en el bucket
    const { ListObjectsV2Command } = require('@aws-sdk/client-s3')
    const listCommand = new ListObjectsV2Command({
      Bucket: bucketName,
      MaxKeys: 5
    })
    
    const listResponse = await r2Client.send(listCommand)
    
    if (!listResponse.Contents || listResponse.Contents.length === 0) {
      console.log('⚠️  No se encontraron imágenes en el bucket')
      console.log('💡 Sube una imagen primero usando el formulario de admin')
      return
    }
    
    console.log(`✅ Encontradas ${listResponse.Contents.length} imágenes en el bucket`)
    
    // Probar acceso público a la primera imagen
    const firstImage = listResponse.Contents[0]
    console.log(`🔄 Probando acceso público a: ${firstImage.Key}`)
    
    // Generar URL pública usando el dominio real
    const publicDomain = process.env.CLOUDFLARE_R2_PUBLIC_DOMAIN || `pub-${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev`
    const publicUrl = `https://${publicDomain}/${firstImage.Key}`
    console.log(`📋 URL pública: ${publicUrl}`)
    
    // Verificar si la imagen es accesible públicamente
    try {
      const headCommand = new HeadObjectCommand({
        Bucket: bucketName,
        Key: firstImage.Key
      })
      
      const headResponse = await r2Client.send(headCommand)
      console.log('✅ Imagen existe en el bucket')
      console.log(`📊 Tamaño: ${headResponse.ContentLength} bytes`)
      console.log(`📅 Última modificación: ${headResponse.LastModified}`)
      
      // Probar acceso HTTP directo
      console.log('🌐 Probando acceso HTTP...')
      const response = await fetch(publicUrl, { method: 'HEAD' })
      
      if (response.ok) {
        console.log('✅ ¡Acceso público funcionando!')
        console.log(`📋 Status: ${response.status}`)
        console.log(`🔗 URL accesible: ${publicUrl}`)
      } else {
        console.log('❌ Acceso público NO funcionando')
        console.log(`📋 Status: ${response.status}`)
        console.log(`📋 Status Text: ${response.statusText}`)
        console.log('💡 Necesitas configurar acceso público en Cloudflare R2')
        console.log('🔧 Ve a R2 > Settings > Public access > Enable public access')
      }
      
    } catch (error) {
      console.error('❌ Error verificando imagen:', error.message)
    }
    
    // Mostrar todas las imágenes encontradas
    console.log('\n📋 Imágenes en el bucket:')
    listResponse.Contents.forEach((obj, index) => {
      const url = `https://${publicDomain}/${obj.Key}`
      console.log(`${index + 1}. ${obj.Key}`)
      console.log(`   URL: ${url}`)
      console.log(`   Tamaño: ${obj.Size} bytes`)
      console.log(`   Modificado: ${obj.LastModified}`)
      console.log('')
    })
    
  } catch (error) {
    console.error('❌ Error verificando acceso público:', error.message)
    
    if (error.name === 'NoSuchBucket') {
      console.log('💡 El bucket no existe. Créalo en el dashboard de R2')
    } else if (error.name === 'AccessDenied') {
      console.log('💡 Sin permisos para acceder al bucket')
    }
  }
}

// Ejecutar verificación
checkR2PublicAccess()
  .then(() => {
    console.log('\n🎯 Verificación completada')
    console.log('💡 Si el acceso público no funciona, configura "Public access" en R2')
  })
  .catch(error => {
    console.error('💥 Error inesperado:', error)
  })
