import React from 'react';

export default function ProjectVersionsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Versões e Stems</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
           <h2 className="text-lg font-bold text-white mb-4">Arquivos de Áudio</h2>
           <div className="space-y-3">
              {['Vocal Isolado (v1)', 'Instrumental HQ', 'Mixagem Final (MP3)'].map(file => (
                 <div key={file} className="bg-slate-900 p-3 rounded-lg flex justify-between items-center border border-slate-800">
                    <span className="text-sm text-slate-300">{file}</span>
                    <button className="text-blue-400 text-xs font-bold">Download</button>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
