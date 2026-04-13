import React from 'react';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-white">Configurações</h1>

      <div className="space-y-8">
        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Perfil</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Nome Completo</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" defaultValue="Rafael Silva" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email</label>
              <input type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white" defaultValue="rafael@exemplo.com" />
            </div>
          </div>
        </section>

        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Segurança</h2>
          <button className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition">
            Alterar Senha
          </button>
        </section>

        <section className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h2 className="text-xl font-semibold mb-4 text-red-400">Zona de Perigo</h2>
          <button className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition">
            Excluir Conta e Dados Vocais
          </button>
        </section>
      </div>
    </div>
  );
}
