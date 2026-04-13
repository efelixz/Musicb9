import React from 'react';

export default function AuditLogsPage() {
  const logs = [
    { id: '1', actor: 'Admin', action: 'USER_BLOCK', entity: 'User #882', date: '2024-03-22 14:05' },
    { id: '2', actor: 'Rafael', action: 'CONSENT_REVOKED', entity: 'Voice #k21', date: '2024-03-22 13:50' },
    { id: '3', actor: 'System', action: 'EXPORT_GENERATED', entity: 'Project #v4k', date: '2024-03-22 12:30' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Logs de Auditoria do Sistema</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-gray-50 text-gray-400 text-xs uppercase">
              <tr>
                 <th className="p-4">Data/Hora</th>
                 <th className="p-4">Ator</th>
                 <th className="p-4">Ação</th>
                 <th className="p-4">Entidade Afetada</th>
              </tr>
           </thead>
           <tbody className="text-sm">
              {logs.map(log => (
                <tr key={log.id} className="border-b border-gray-100">
                   <td className="p-4 text-gray-500">{log.date}</td>
                   <td className="p-4 font-bold">{log.actor}</td>
                   <td className="p-4"><span className="px-2 py-0.5 bg-gray-100 rounded font-mono text-[10px]">{log.action}</span></td>
                   <td className="p-4">{log.entity}</td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
}
