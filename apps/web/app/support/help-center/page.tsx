import React from 'react';

export default function HelpCenterPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Central de Ajuda</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-2">Guias de Treinamento</h2>
            <p className="text-slate-400 text-sm">Aprenda a obter a melhor fidelidade vocal.</p>
         </div>
         <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-lg font-bold text-white mb-2">Suporte à Masterização</h2>
            <p className="text-slate-400 text-sm">Como exportar e usar seus stems.</p>
         </div>
      </div>
    </div>
  );
}
