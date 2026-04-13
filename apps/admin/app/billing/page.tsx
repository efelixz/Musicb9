import React from 'react';

export default function AdminBillingPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Controle Financeiro</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <p className="text-gray-500 text-sm">Churn Rate</p>
            <p className="text-2xl font-bold">2.4%</p>
         </div>
      </div>
    </div>
  );
}
