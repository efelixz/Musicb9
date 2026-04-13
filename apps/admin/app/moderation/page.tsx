import React from 'react';

export default function AdminModerationPage() {
  const reports = [
    { id: '1', user: 'user123@email.com', type: 'Impersonation', status: 'Pending', date: '2024-03-22' },
    { id: '2', user: 'artist99@email.com', type: 'Copyright', status: 'Reviewed', date: '2024-03-21' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Moderação de Conteúdo</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="p-4">Usuário</th>
              <th className="p-4">Tipo de Denúncia</th>
              <th className="p-4">Status</th>
              <th className="p-4">Data</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-gray-100">
                <td className="p-4">{report.user}</td>
                <td className="p-4">{report.type}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${report.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {report.status}
                  </span>
                </td>
                <td className="p-4">{report.date}</td>
                <td className="p-4">
                  <button className="text-blue-600 font-bold mr-2">Ver Detalhes</button>
                  <button className="text-red-600 font-bold">Bloquear</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
