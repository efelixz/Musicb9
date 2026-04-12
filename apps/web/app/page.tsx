export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Voicify</h1>
      <p className="mt-4 text-xl text-gray-600">
        Transformando sua voz em arte musical.
      </p>
      <div className="mt-8">
        <button className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">
          Começar agora
        </button>
      </div>
    </main>
  )
}
