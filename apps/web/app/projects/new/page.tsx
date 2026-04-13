'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Music, FileText, Sparkles } from 'lucide-react'

export default function NewProjectWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Pop',
    mood: 'Happy',
    lyrics: '',
    melodyId: '',
    voiceId: '',
    arrangementStyle: 'Full Band'
  })

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const handleFinish = () => {
    console.log('Finalizing project:', formData)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Progress Header */}
        <div className="bg-blue-600 px-8 py-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Criar Nova Música</h2>
            <span className="text-sm font-medium opacity-80">Passo {step} de 6</span>
          </div>
          <div className="w-full bg-blue-400/30 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center gap-3 text-blue-600 mb-6">
                <Music size={28} />
                <h3 className="text-2xl font-bold">Informações Básicas</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título do Projeto</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ex: Minha Nova Canção"
                    className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gênero</label>
                    <select
                      value={formData.genre}
                      onChange={(e) => setFormData({...formData, genre: e.target.value})}
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3"
                    >
                      <option>Pop</option>
                      <option>Rock</option>
                      <option>Jazz</option>
                      <option>Lo-fi</option>
                      <option>Electronic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mood / Emoção</label>
                    <select
                      value={formData.mood}
                      onChange={(e) => setFormData({...formData, mood: e.target.value})}
                      className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-3"
                    >
                      <option>Happy</option>
                      <option>Sad</option>
                      <option>Energetic</option>
                      <option>Romantic</option>
                      <option>Dark</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="flex items-center gap-3 text-blue-600 mb-6">
                <FileText size={28} />
                <h3 className="text-2xl font-bold">Letra da Música</h3>
              </div>
              <div>
                <textarea
                  rows={10}
                  value={formData.lyrics}
                  onChange={(e) => setFormData({...formData, lyrics: e.target.value})}
                  placeholder="Cole sua letra aqui..."
                  className="mt-1 block w-full rounded-2xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500 font-serif text-lg"
                ></textarea>
                <p className="mt-2 text-sm text-gray-500">Dica: Separe os versos e o refrão com uma linha em branco.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
               <div className="flex items-center gap-3 text-blue-600 mb-6">
                <Sparkles size={28} />
                <h3 className="text-2xl font-bold">Escolha a Melodia</h3>
              </div>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      onClick={() => setFormData({...formData, melodyId: `m${i}`})}
                      className={`p-4 border-2 rounded-2xl cursor-pointer transition ${formData.melodyId === `m${i}` ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                    >
                       <p className="font-bold">Opção Melódica {i}</p>
                       <p className="text-xs text-gray-500 italic">Estilo: {formData.genre} • Vibe: {formData.mood}</p>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
               <div className="flex items-center gap-3 text-blue-600 mb-6">
                <Music size={28} />
                <h3 className="text-2xl font-bold">Sua Identidade Vocal</h3>
              </div>
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-2xl flex justify-between items-center">
                 <div>
                    <p className="font-bold">Rafael Vocal Gold</p>
                    <p className="text-xs text-blue-600 uppercase font-bold">Score: 98.2%</p>
                 </div>
                 <span className="bg-green-500 text-white px-3 py-1 rounded-full text-[10px] font-bold">SELECIONADO</span>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
               <div className="flex items-center gap-3 text-blue-600 mb-6">
                <Music size={28} />
                <h3 className="text-2xl font-bold">Arranjo e Instrumentação</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 {['Full Band', 'Acoustic', 'Electronic', 'Minimalist'].map(style => (
                    <div
                      key={style}
                      onClick={() => setFormData({...formData, arrangementStyle: style})}
                      className={`p-6 border-2 rounded-2xl text-center cursor-pointer transition ${formData.arrangementStyle === style ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}
                    >
                       <p className="font-bold">{style}</p>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-8 text-center py-10 animate-in fade-in zoom-in-95">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                <Sparkles size={40} />
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-gray-900">Tudo Pronto!</h3>
                <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
                  Agora nossa IA vai processar sua voz e criar a melodia perfeita para sua letra.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl text-left max-w-sm mx-auto border border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase mb-2">Resumo</p>
                <p className="text-gray-900"><span className="font-semibold">Título:</span> {formData.title}</p>
                <p className="text-gray-900"><span className="font-semibold">Estilo:</span> {formData.genre} ({formData.mood})</p>
                <p className="text-gray-900"><span className="font-semibold">Arranjo:</span> {formData.arrangementStyle}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex justify-between">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft size={20} /> Voltar
              </button>
            ) : (
              <div></div>
            )}

            {step < 6 ? (
              <button
                onClick={nextStep}
                disabled={step === 1 && !formData.title}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white transition-all ${
                  step === 1 && !formData.title ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                }`}
              >
                Próximo <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white bg-green-600 hover:bg-green-700 shadow-xl transition-all scale-105"
              >
                Gerar Minha Música <Sparkles size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
