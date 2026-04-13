import React from 'react';

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Painel Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Usuários', value: '1,284', delta: '+12%' },
          { label: 'Projetos', value: '4,592', delta: '+18%' },
          { label: 'Gerações (24h)', value: '843', delta: '+5%' },
          { label: 'Receita (Mês)', value: 'R$ 12.4k', delta: '+7%' },
        ].map(stat => (
          <div key={stat.label} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-green-400 text-xs font-medium">{stat.delta}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">Jobs em Tempo Real</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-400 text-xs uppercase">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Status</th>
              <th className="p-4">Usuário</th>
              <th className="p-4">Duração</th>
            </tr>
          </thead>
          <tbody className="text-slate-300 text-sm">
            <tr className="border-b border-slate-700/50">
              <td className="p-4 font-mono">#v4k2</td>
              <td className="p-4">Singing Synth</td>
              <td className="p-4"><span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">Processando</span></td>
              <td className="p-4">Jefferson Lima</td>
              <td className="p-4">45s</td>
            </tr>
            <tr>
              <td className="p-4 font-mono">#m9s1</td>
              <td className="p-4">Melody Gen</td>
              <td className="p-4"><span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">Concluído</span></td>
              <td className="p-4">Amanda Costa</td>
              <td className="p-4">12s</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
