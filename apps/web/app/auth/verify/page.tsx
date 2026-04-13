import React from 'react';

export default function VerificationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-center">
      <div className="max-w-md bg-slate-900 rounded-3xl border border-slate-800 p-10">
         <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-6 text-3xl">📧</div>
         <h1 className="text-2xl font-bold text-white mb-4">Verifique seu Email</h1>
         <p className="text-slate-400 mb-8">Enviamos um código de confirmação para o seu endereço de email. Por favor, insira-o abaixo para ativar sua conta.</p>
         <input type="text" placeholder="Código de 6 dígitos" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-center text-white text-2xl font-black tracking-widest mb-6" />
         <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold">Verificar Conta</button>
      </div>
    </div>
  );
}
