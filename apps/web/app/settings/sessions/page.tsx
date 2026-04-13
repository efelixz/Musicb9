import React from 'react';

export default function SessionsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Sessões Ativas</h1>
      <div className="space-y-4">
         <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex justify-between items-center">
            <div>
               <p className="text-white font-medium">Chrome em MacOS (Atual)</p>
               <p className="text-slate-400 text-xs">São Paulo, Brasil • 192.168.1.1</p>
            </div>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] rounded uppercase font-bold">Online</span>
         </div>
      </div>
    </div>
  );
}
