import React from 'react';

export default function AdminAnalyticsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Avançado</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold mb-4">Retenção de Usuários (D7/D30)</h3>
          <div className="h-48 bg-gray-50 flex items-end gap-2 p-4">
             {[30, 45, 60, 25, 80, 55, 90].map((h, i) => (
               <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-400 rounded-t"></div>
             ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold mb-4">Conversão Free -> Pago</h3>
          <div className="flex items-center justify-center h-48">
             <div className="w-32 h-32 rounded-full border-8 border-blue-500 border-t-transparent animate-spin"></div>
             <span className="absolute font-bold text-xl">4.2%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold mb-4">Uso por Gênero Musical</h3>
        <div className="space-y-4">
          {[
            { genre: 'Pop', percentage: 45 },
            { genre: 'Hip Hop', percentage: 25 },
            { genre: 'Electronic', percentage: 15 },
            { genre: 'Outros', percentage: 15 },
          ].map(g => (
            <div key={g.genre}>
              <div className="flex justify-between text-sm mb-1">
                <span>{g.genre}</span>
                <span>{g.percentage}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full">
                <div style={{ width: `${g.percentage}%` }} className="bg-blue-600 h-full rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
