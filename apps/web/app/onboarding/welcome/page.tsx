import React from 'react';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-5xl font-black text-white mb-6 italic tracking-tighter">BEM-VINDO À VOICIFY</h1>
      <p className="text-slate-400 text-lg max-w-xl mb-12 leading-relaxed">
        Você está prestes a criar sua identidade vocal digital. Vamos guiar você pelo processo de clonagem para que você possa criar músicas originais com sua própria voz.
      </p>
      <a href="/onboarding/goal" className="px-12 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition transform hover:scale-105 shadow-xl">
        Vamos Começar
      </a>
    </div>
  );
}
