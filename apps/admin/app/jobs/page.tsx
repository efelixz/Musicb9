import React from 'react';

export default function AdminJobsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Fila de Processamento (Jobs)</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <p className="text-gray-500 italic">Monitorando 142 jobs ativos no cluster de GPUs...</p>
      </div>
    </div>
  );
}
