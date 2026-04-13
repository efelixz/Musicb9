import React from 'react';

export default function AdminConsentPage() {
  const consents = [
    { id: '1', user: 'rafael@email.com', status: 'Accepted', date: '2024-03-20', doc: 'v1-signed.pdf' },
    { id: '2', user: 'jeff@email.com', status: 'Accepted', date: '2024-03-19', doc: 'v1-signed.pdf' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Auditoria de Consentimentos</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
            <tr>
              <th className="p-4">Usuário</th>
              <th className="p-4">Status</th>
              <th className="p-4">Data</th>
              <th className="p-4">Documento</th>
              <th className="p-4">Ação</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {consents.map((c) => (
              <tr key={c.id} className="border-b border-gray-100">
                <td className="p-4">{c.user}</td>
                <td className="p-4 text-green-600 font-medium">{c.status}</td>
                <td className="p-4 text-gray-500">{c.date}</td>
                <td className="p-4 text-blue-600 cursor-pointer">{c.doc}</td>
                <td className="p-4"><button className="text-gray-600 border px-3 py-1 rounded">Validar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
