export default function TestFruitsPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ¡Página de Frutas Funcionando!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          El enlace está funcionando correctamente
        </p>
        <a 
          href="/ingredients" 
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Volver a Ingredientes
        </a>
      </div>
    </div>
  )
}
