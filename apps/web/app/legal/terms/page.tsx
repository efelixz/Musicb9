import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-8">Termos de Uso</h1>
      <p className="mb-6">Última atualização: 01 de Outubro de 2024</p>
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">1. Uso da Voz</h2>
        <p>Você garante ser o proprietário da voz enviada para treinamento.</p>
        <h2 className="text-xl font-bold text-white">2. Conteúdo Gerado</h2>
        <p>A Voicify concede a você a licença comercial das músicas geradas nos planos Pro e Artist.</p>
      </section>
    </div>
  );
}
