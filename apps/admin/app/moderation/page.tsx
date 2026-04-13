import React from 'react';

export default function AdminModerationPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Moderação de Conteúdo</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <p className="text-gray-500">Nenhuma denúncia ou voz suspeita aguardando revisão.</p>
      </div>
    </div>
  );
}
