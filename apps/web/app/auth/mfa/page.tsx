import React from 'react';

export default function MFAPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl text-center">
         <h1 className="text-2xl font-bold text-white mb-6">Autenticação em Duas Etapas</h1>
         <p className="text-slate-400 text-sm mb-8">Insira o código enviado para o seu dispositivo.</p>
         <div className="flex gap-2 justify-center mb-8">
            {[1,2,3,4,5,6].map(i => (
               <input key={i} type="text" maxLength={1} className="w-12 h-14 bg-slate-950 border border-slate-800 rounded-xl text-center text-white text-xl font-bold focus:border-blue-500 outline-none" />
            ))}
         </div>
         <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold">Verificar</button>
      </div>
    </div>
  );
}
