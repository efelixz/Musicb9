import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 shadow-sm">
        <div className="text-2xl font-bold text-blue-600">Voicify</div>
        <div className="space-x-6">
          <Link href="/login" className="text-gray-600 hover:text-blue-600">Entrar</Link>
          <Link href="/register" className="rounded-full bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">Começar Grátis</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Crie músicas profissionais com a <span className="text-blue-600">sua própria voz</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-gray-600">
          Clone sua voz para o canto, envie suas letras e deixe nossa IA gerar melodias e arranjos completos. O estúdio musical do futuro está na sua voz.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/register" className="rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-blue-700">
            Criar Minha Primeira Música
          </Link>
          <button className="rounded-full border-2 border-gray-200 px-8 py-4 text-lg font-bold text-gray-700 hover:bg-gray-50">
            Ver Como Funciona
          </button>
        </div>

        {/* Visual Placeholder for Editor/Product */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl bg-gray-100 p-4 shadow-2xl">
          <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            [Visualizador do Editor Voicify]
          </div>
        </div>
      </header>

      {/* Social Proof / Partners Placeholder */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Usado por criadores em todo o mundo</p>
          <div className="mt-8 flex justify-center gap-12 opacity-50 grayscale">
            <span className="text-xl font-bold">CREATOR CO.</span>
            <span className="text-xl font-bold">MUSIC LAB</span>
            <span className="text-xl font-bold">INFLUENCE STUDIO</span>
            <span className="text-xl font-bold">MEDIA HUB</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 text-center text-gray-500">
        <p>&copy; 2024 Voicify AI Music Platform. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
