import React from 'react';

export default function EnterprisePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Configurações Enterprise</h1>
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
         <h2 className="text-2xl font-bold text-white mb-6">Chaves de API</h2>
         <div className="bg-slate-900 p-4 rounded-xl flex justify-between items-center mb-8">
            <code className="text-blue-400">sk_live_v4k2_...</code>
            <button className="text-slate-400 hover:text-white">Copiar</button>
         </div>
         <h2 className="text-2xl font-bold text-white mb-6">Webhooks</h2>
         <p className="text-slate-400 mb-4">Configure URLs para receber notificações de jobs concluídos.</p>
         <button className="px-6 py-2 bg-slate-700 text-white rounded-lg">Adicionar Endpoint</button>
      </div>
    </div>
  );
}
