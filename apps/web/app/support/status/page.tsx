import React from 'react';

export default function ServiceStatusPage() {
  const services = [
    { name: 'API Core', status: 'Operacional', icon: '🟢' },
    { name: 'Singing Engine Cluster', status: 'Operacional', icon: '🟢' },
    { name: 'Melody Gen Workers', status: 'Operacional', icon: '🟢' },
    { name: 'Billing Gateway', status: 'Operacional', icon: '🟢' },
    { name: 'Object Storage (S3)', status: 'Operacional', icon: '🟢' },
  ];

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-white">Status do Sistema</h1>
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
         {services.map((s, i) => (
            <div key={s.name} className={`p-6 flex justify-between items-center ${i !== services.length - 1 ? 'border-b border-slate-800' : ''}`}>
               <span className="text-white font-medium">{s.name}</span>
               <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{s.status}</span>
                  <span>{s.icon}</span>
               </div>
            </div>
         ))}
      </div>
      <p className="text-center text-slate-500 text-xs mt-8 italic">Última verificação: Há 45 segundos</p>
    </div>
  );
}
