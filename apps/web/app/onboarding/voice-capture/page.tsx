'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Mic, Square, Play, CheckCircle } from 'lucide-react'

const PHRASES = [
  "A música é a linguagem universal da humanidade.",
  "O vento soprava suavemente sobre as montanhas azuis.",
  "Cantar com alegria traz harmonia para o coração.",
  "Estrelas brilham intensamente na escuridão da noite.",
  "A tecnologia transforma nossos sonhos em realidade."
]

export default function VoiceCapturePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedSamples, setRecordedSamples] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState<number | null>(null)

  const handleToggleRecording = () => {
    if (isRecording) {
      // Mock stop recording
      setRecordedSamples(prev => [...prev, `sample-${currentStep}`])
      setIsRecording(false)
    } else {
      // Mock start recording
      setIsRecording(true)
    }
  }

  const handleNext = () => {
    if (currentStep < PHRASES.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      router.push('/dashboard')
    }
  }

  const progress = ((currentStep + (recordedSamples[currentStep] ? 1 : 0)) / PHRASES.length) * 100

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Captura Vocal</h1>
          <p className="mt-2 text-gray-600">
            Frase {currentStep + 1} de {PHRASES.length}
          </p>
        </div>

        {/* Phrase Card */}
        <div className="mt-8 rounded-xl border-2 border-blue-50 bg-blue-50/30 p-10 text-center">
          <p className="text-2xl font-medium text-gray-800 leading-relaxed italic">
            "{PHRASES[currentStep]}"
          </p>
        </div>

        {/* Waveform Placeholder */}
        <div className="h-24 w-full flex items-center justify-center gap-1">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-blue-600 transition-all duration-150 ${
                isRecording ? 'animate-pulse h-12' : 'h-2'
              }`}
              style={{
                animationDelay: `${i * 0.05}s`,
                height: isRecording ? `${Math.random() * 40 + 10}px` : '4px'
              }}
            ></div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <button
            onClick={handleToggleRecording}
            className={`flex h-20 w-20 items-center justify-center rounded-full text-white transition-all shadow-lg ${
              isRecording ? 'bg-red-500 hover:bg-red-600 scale-110' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRecording ? <Square size={32} fill="white" /> : <Mic size={32} />}
          </button>

          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            {isRecording ? 'Gravando...' : 'Clique para gravar'}
          </p>
        </div>

        {/* Action Bar */}
        <div className="mt-12 flex items-center justify-between border-t border-gray-100 pt-8">
          <div className="flex gap-4">
            {recordedSamples[currentStep] && (
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <Play size={20} /> Ouvir amostra
              </button>
            )}
          </div>

          <button
            disabled={!recordedSamples[currentStep]}
            onClick={handleNext}
            className={`flex items-center gap-2 rounded-full px-8 py-3 font-semibold text-white transition-all ${
              recordedSamples[currentStep] ? 'bg-blue-600 hover:bg-blue-700 shadow-md' : 'bg-gray-200 cursor-not-allowed text-gray-400'
            }`}
          >
            {currentStep === PHRASES.length - 1 ? 'Concluir Perfil' : 'Próxima Frase'}
          </button>
        </div>
      </div>

      <p className="mt-8 max-w-md text-center text-xs text-gray-400">
        Dica: Procure um ambiente silencioso e mantenha uma distância constante do microfone para melhor fidelidade.
      </p>
    </div>
  )
}
