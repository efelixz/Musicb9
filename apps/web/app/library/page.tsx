import React from 'react';

export default function LibraryPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Biblioteca</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Vocais Isolados', count: 12, icon: '🎤' },
          { title: 'Instrumentais', count: 5, icon: '🎸' },
          { title: 'Stems de Bateria', count: 8, icon: '🥁' },
          { title: 'Preservações de Master', count: 3, icon: '🎚️' },
        ].map(item => (
          <div key={item.title} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-blue-500 transition cursor-pointer">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h2 className="text-xl font-bold text-white mb-1">{item.title}</h2>
            <p className="text-slate-400 text-sm">{item.count} arquivos salvos</p>
          </div>
        ))}
      </div>
    </div>
  );
}
