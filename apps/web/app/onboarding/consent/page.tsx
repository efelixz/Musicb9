'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function VoiceConsentPage() {
  const router = useRouter()
  const [agreements, setAgreements] = useState({
    useVoice: false,
    aiProcessing: false,
    terms: false
  })

  const canContinue = agreements.useVoice && agreements.aiProcessing && agreements.terms

  const handleContinue = () => {
    if (canContinue) {
      router.push('/onboarding/voice-capture')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '33%' }}></div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Consentimento de Uso de Voz</h1>
          <p className="mt-4 text-gray-600">
            Para criar sua identidade vocal digital, precisamos da sua autorização explícita.
            Sua voz é única e sua privacidade é nossa prioridade.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-6 text-sm text-gray-700 max-h-60 overflow-y-auto">
            <h3 className="font-bold mb-2">Termos de Uso da Identidade Vocal</h3>
            <p className="mb-4">
              Ao utilizar a plataforma Voicify, você autoriza o processamento dos seus dados biométricos vocais
              exclusivamente para a criação de um modelo de síntese de voz cantada (identidade vocal).
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Seu modelo vocal será utilizado apenas em projetos criados por você nesta conta.</li>
              <li>Você pode revogar este consentimento e solicitar a exclusão do seu perfil vocal a qualquer momento.</li>
              <li>Não utilizaremos sua voz para treinar modelos públicos sem autorização adicional.</li>
              <li>Seus dados são protegidos por criptografia de ponta a ponta e seguem as diretrizes da LGPD/GDPR.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreements.useVoice}
                onChange={() => setAgreements(prev => ({...prev, useVoice: !prev.useVoice}))}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Autorizo a Voicify a gravar e utilizar amostras da minha voz para criar meu perfil vocal digital.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreements.aiProcessing}
                onChange={() => setAgreements(prev => ({...prev, aiProcessing: !prev.aiProcessing}))}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Compreendo que minha voz será processada por algoritmos de inteligência artificial para síntese de áudio.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreements.terms}
                onChange={() => setAgreements(prev => ({...prev, terms: !prev.terms}))}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Li e concordo com os <Link href="/terms" className="text-blue-600 underline">Termos de Serviço</Link> e a <Link href="/privacy" className="text-blue-600 underline">Política de Privacidade</Link>.
              </span>
            </label>
          </div>
        </div>

        <div className="mt-10 flex gap-4">
          <button
            onClick={() => router.back()}
            className="flex-1 rounded-full border border-gray-200 py-3 font-semibold text-gray-600 hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            disabled={!canContinue}
            onClick={handleContinue}
            className={`flex-1 rounded-full py-3 font-semibold text-white transition-all ${
              canContinue ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Aceitar e Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
