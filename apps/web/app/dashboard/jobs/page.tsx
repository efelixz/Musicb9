import React from 'react';

export default function JobsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Seus Jobs Ativos</h1>
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <p className="text-slate-400">Você não possui processos de geração em andamento.</p>
      </div>
    </div>
  );
}
