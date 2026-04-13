import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">Voicify Admin</h1>
        <nav className="space-y-4">
           <a href="/dashboard" className="block p-2 rounded bg-blue-600">Dashboard</a>
           <a href="/users" className="block p-2 rounded hover:bg-gray-800">Usuários</a>
           <a href="/jobs" className="block p-2 rounded hover:bg-gray-800">Fila de Jobs</a>
           <a href="/billing" className="block p-2 rounded hover:bg-gray-800">Financeiro</a>
           <a href="/support" className="block p-2 rounded hover:bg-gray-800">Suporte</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
           <h2 className="text-3xl font-bold">Visão Geral do Sistema</h2>
           <div className="flex gap-4">
              <span className="p-2 bg-green-100 text-green-700 rounded-full px-4 font-bold">API Online</span>
              <span className="p-2 bg-blue-100 text-blue-700 rounded-full px-4 font-bold">5 Workers Ativos</span>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
           {[
             { label: 'Usuários Ativos', value: '42,128', delta: '+452 hoje' },
             { label: 'Gerações (24h)', value: '18,592', delta: '+12% vs ontem' },
             { label: 'Receita (MRR)', value: '$ 154,200', delta: '+$14.2k vs mês ant.' },
             { label: 'GPU Cluster Load', value: '74%', delta: 'Estável (24 nodes)' },
           ].map(stat => (
             <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <p className="text-green-600 text-xs mt-1">{stat.delta}</p>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Métricas de Performance IA</h3>
              <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-gray-500">Latência Média (Singing Engine)</span>
                       <span className="font-bold">1.2s</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full"><div className="bg-blue-500 w-[15%] h-full rounded-full"></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-gray-500">Taxa de Sucesso de Inferência</span>
                       <span className="font-bold">99.8%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full"><div className="bg-green-500 w-[99%] h-full rounded-full"></div></div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Uso de Créditos (Global)</h3>
              <div className="flex items-end gap-2 h-24">
                 {[40, 60, 45, 90, 65, 80, 75].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo-100 rounded-t-sm hover:bg-indigo-500 transition"></div>
                 ))}
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">Consumo de créditos nos últimos 7 dias</p>
           </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
           <h3 className="text-xl font-bold mb-6">Últimas Atividades Críticas</h3>
           <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
                 <tr>
                    <th className="p-4">Ação</th>
                    <th className="p-4">Entidade</th>
                    <th className="p-4">Usuário</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Data</th>
                 </tr>
              </thead>
              <tbody className="text-sm">
                 <tr className="border-b border-gray-100">
                    <td className="p-4 font-bold text-red-600">Remoção de Perfil Vocal</td>
                    <td className="p-4">Voice-ID: #4k21</td>
                    <td className="p-4">jefferson@gmail.com</td>
                    <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Concluído</span></td>
                    <td className="p-4 text-gray-500">Há 5 min</td>
                 </tr>
                 <tr className="border-b border-gray-100">
                    <td className="p-4 font-bold text-blue-600">Upgrade de Plano (Artist)</td>
                    <td className="p-4">Sub-ID: #8s91</td>
                    <td className="p-4">amanda_pro@voicify.ai</td>
                    <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Concluído</span></td>
                    <td className="p-4 text-gray-500">Há 12 min</td>
                 </tr>
                 <tr>
                    <td className="p-4 font-bold text-orange-600">Job com Falha Crítica</td>
                    <td className="p-4">Render-ID: #x2l1</td>
                    <td className="p-4">worker_gpu_3</td>
                    <td className="p-4"><span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Erro 500</span></td>
                    <td className="p-4 text-gray-500">Há 15 min</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </main>
    </div>
  );
}
