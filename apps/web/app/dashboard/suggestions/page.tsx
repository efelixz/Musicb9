import React from 'react';

export default function SuggestionsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Sugestões Criativas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-xl">
           <p className="text-blue-400 font-bold text-xs uppercase mb-1">Dica de Estilo</p>
           <p className="text-white">Que tal tentar um arranjo de Jazz para sua última letra?</p>
        </div>
      </div>
    </div>
  );
}
