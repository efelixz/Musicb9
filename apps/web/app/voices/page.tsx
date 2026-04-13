import React from 'react';

export default function VoicesPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Minha Voz</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Perfis Vocais</h2>
          <p className="text-slate-400 mb-4">Gerencie suas identidades vocais treinadas.</p>
          <div className="space-y-4">
             <div className="p-4 bg-slate-900 rounded-lg flex justify-between items-center border border-blue-500/30">
                <div>
                   <p className="font-medium text-white">Rafael Vocal Gold</p>
                   <p className="text-xs text-blue-400">Score de Fidelidade: 98%</p>
                </div>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">Ativo</span>
             </div>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Treinar Nova Voz</h2>
          <p className="text-slate-400 mb-4">Inicie o processo de clonagem para uma nova identidade artística.</p>
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Iniciar Treinamento
          </button>
        </div>
      </div>
    </div>
  );
}
