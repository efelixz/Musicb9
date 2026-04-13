import React from 'react';

export default function FAQPage() {
  const faqs = [
    { q: 'Como funciona a clonagem de voz?', a: 'Nossa IA analisa suas amostras vocais para criar um modelo matemático único do seu timbre e expressividade.' },
    { q: 'Posso usar as músicas comercialmente?', a: 'Sim, usuários nos planos Pro e Artist possuem licença comercial total sobre suas criações.' },
    { q: 'Quais formatos de exportação são suportados?', a: 'Suportamos MP3, WAV e exportação de stems individuais.' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black text-white mb-12 italic">Perguntas Frequentes</h1>
      <div className="space-y-8">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-slate-900 p-8 rounded-3xl border border-white/5">
            <h2 className="text-xl font-bold text-blue-400 mb-4">{faq.q}</h2>
            <p className="text-slate-400 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
