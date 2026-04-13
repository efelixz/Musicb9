import React from 'react';

export default function OnboardingResultPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-500/30">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">Perfil Vocal Criado!</h1>
      <p className="text-slate-400 max-w-md mb-8">
        Analisamos suas amostras. Seu score de fidelidade é de <span className="text-blue-400 font-bold">98.2%</span>. Sua voz está pronta para ser usada no estúdio.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl mb-12">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
           <p className="text-xs text-slate-500 uppercase mb-1">Timbre</p>
           <p className="text-white font-bold">Claro / Brilhante</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
           <p className="text-xs text-slate-500 uppercase mb-1">Faixa</p>
           <p className="text-white font-bold">Barítono</p>
        </div>
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
           <p className="text-xs text-slate-500 uppercase mb-1">Clareza</p>
           <p className="text-white font-bold">Profissional</p>
        </div>
      </div>
      <a href="/dashboard" className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition shadow-xl">
        Ir para o Dashboard
      </a>
    </div>
  );
}
