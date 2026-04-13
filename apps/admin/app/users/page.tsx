import React from 'react';

export default function AdminUsersPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Gestão de Usuários</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
              <tr>
                 <th className="p-4">Nome</th>
                 <th className="p-4">Email</th>
                 <th className="p-4">Plano</th>
                 <th className="p-4">Status</th>
                 <th className="p-4">Ações</th>
              </tr>
           </thead>
           <tbody className="text-sm">
              <tr>
                 <td className="p-4">Rafael Silva</td>
                 <td className="p-4 text-gray-500">rafael@exemplo.com</td>
                 <td className="p-4"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Pro</span></td>
                 <td className="p-4"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Ativo</span></td>
                 <td className="p-4"><button className="text-blue-600 font-bold">Editar</button></td>
              </tr>
           </tbody>
        </table>
      </div>
    </div>
  );
}
