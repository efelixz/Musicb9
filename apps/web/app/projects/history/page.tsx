import React from 'react';

export default function ProjectHistoryPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Histórico de Versões</h1>
      <div className="space-y-4">
        {[
          { version: 'v1.2', date: 'Há 2 horas', change: 'Ajuste de emoção no refrão' },
          { version: 'v1.1', date: 'Ontem', change: 'Mudança de BPM para 124' },
          { version: 'v1.0', date: '2 dias atrás', change: 'Geração inicial' },
        ].map(v => (
          <div key={v.version} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <div>
               <p className="text-white font-bold">{v.version}</p>
               <p className="text-slate-400 text-xs">{v.change}</p>
            </div>
            <p className="text-slate-500 text-xs">{v.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
