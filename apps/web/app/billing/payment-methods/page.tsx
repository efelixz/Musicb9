import React from 'react';

export default function PaymentMethodsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Métodos de Pagamento</h1>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-center">
         <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-slate-700 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
            <p className="text-white">•••• •••• •••• 4242</p>
         </div>
         <button className="text-red-400 text-sm">Remover</button>
      </div>
    </div>
  );
}
