import React from 'react';

export default function RecoverPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-2xl">
         <h1 className="text-2xl font-bold text-white text-center mb-6">Recuperar Senha</h1>
         <p className="text-slate-400 text-sm text-center mb-8">Enviaremos um link de recuperação para o seu email.</p>
         <input type="email" placeholder="Seu email" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white mb-6 focus:border-blue-500 transition" />
         <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">Enviar Link</button>
      </div>
    </div>
  );
}
