import React from 'react';

export default function SupportPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-white">Suporte ao Cliente</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
           <h2 className="text-xl font-bold text-white mb-4">Abrir Ticket</h2>
           <input type="text" placeholder="Assunto" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white mb-4" />
           <textarea placeholder="Como podemos ajudar?" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white h-32 mb-4"></textarea>
           <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold">Enviar</button>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
           <h2 className="text-xl font-bold text-white mb-4">Meus Tickets</h2>
           <p className="text-slate-400 text-sm">Nenhum ticket aberto no momento.</p>
        </div>
      </div>
    </div>
  );
}
