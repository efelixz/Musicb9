import React from 'react';

export default function InvoicesPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Minhas Faturas</h1>
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
           <thead className="bg-slate-900 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                 <th className="p-4">Data</th>
                 <th className="p-4">Valor</th>
                 <th className="p-4">Status</th>
                 <th className="p-4">Recibo</th>
              </tr>
           </thead>
           <tbody>
              <tr className="border-t border-slate-700">
                 <td className="p-4">01/10/2024</td>
                 <td className="p-4">R$ 149,00</td>
                 <td className="p-4 text-green-400">Pago</td>
                 <td className="p-4 text-blue-400 cursor-pointer">Download</td>
              </tr>
           </tbody>
        </table>
      </div>
    </div>
  );
}
