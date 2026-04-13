import React from 'react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black text-white mb-16 text-center italic">Como a Voicify Transforma sua Criação</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { step: '01', title: 'Treine sua Voz', desc: 'Grave 5 minutos de amostras guiadas para criar sua identidade vocal digital.' },
          { step: '02', title: 'Escreva sua Letra', desc: 'Insira sua composição ou peça ajuda à nossa IA para estruturar seus versos.' },
          { step: '03', title: 'Crie a Mágica', desc: 'Escolha o estilo, a emoção e deixe que nossos motores gerem a melodia e o arranjo.' },
        ].map(item => (
          <div key={item.step} className="relative p-8 bg-slate-900 rounded-3xl border border-white/5">
            <span className="text-6xl font-black text-blue-600/20 absolute top-4 left-4">{item.step}</span>
            <h2 className="text-xl font-bold text-white mb-4 relative z-10">{item.title}</h2>
            <p className="text-slate-400 leading-relaxed relative z-10">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
