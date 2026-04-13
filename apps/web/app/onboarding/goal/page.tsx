import React from 'react';

export default function GoalPage() {
  const goals = [
    { title: 'Lançar Músicas Autorais', icon: '🚀' },
    { title: 'Criar Demos Rápidas', icon: '🎹' },
    { title: 'Produzir para Clientes', icon: '💼' },
    { title: 'Explorar Novas Identidades', icon: '🎭' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-4 text-center">Qual o seu objetivo principal?</h1>
      <p className="text-slate-400 mb-12 text-center">Isso nos ajuda a personalizar sua experiência.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
        {goals.map(goal => (
          <div key={goal.title} className="bg-slate-900 p-8 rounded-3xl border border-white/5 hover:border-blue-500 transition cursor-pointer flex items-center gap-6">
            <span className="text-4xl">{goal.icon}</span>
            <span className="text-white font-bold text-lg">{goal.title}</span>
          </div>
        ))}
      </div>

      <a href="/onboarding/consent" className="px-12 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition shadow-xl">
        Próximo Passo
      </a>
    </div>
  );
}
