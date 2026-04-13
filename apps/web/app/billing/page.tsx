import React from 'react';

export default function BillingPage() {
  const plans = [
    { name: 'Creator', price: 'R$ 49', credits: 10, features: ['1 voz própria', 'Exports em MP3', 'Suporte padrão'] },
    { name: 'Pro', price: 'R$ 149', credits: 50, features: ['3 vozes próprias', 'Exports em WAV + Stems', 'Harmonias automáticas', 'Prioridade na fila'], recommended: true },
    { name: 'Artist', price: 'R$ 399', credits: 'Ilimitado', features: ['Vozes ilimitadas', 'Masterização IA inclusa', 'API externa', 'Suporte 24h'] },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-white text-center">Planos e Créditos</h1>
      <p className="text-slate-400 text-center mb-12">Escolha o plano ideal para sua carreira musical</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-slate-800 p-8 rounded-2xl border ${plan.recommended ? 'border-blue-500 ring-1 ring-blue-500' : 'border-slate-700'} relative`}>
            {plan.recommended && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">RECOMENDADO</span>}
            <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-slate-400">/mês</span>
            </div>
            <p className="text-blue-400 text-sm font-semibold mb-6">{plan.credits} créditos inclusos</p>
            <ul className="space-y-4 mb-8">
              {plan.features.map(f => (
                <li key={f} className="text-slate-300 text-sm flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-xl font-bold transition ${plan.recommended ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              Assinar Agora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
