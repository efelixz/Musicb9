import React from 'react';

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-black text-white mb-10 italic">Segurança e Governança</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">
           <div className="text-3xl mb-6">🔒</div>
           <h2 className="text-xl font-bold text-white mb-4">Criptografia de Ponta</h2>
           <p className="text-slate-400 leading-relaxed">Seus dados vocais e projetos são protegidos com AES-256 e TLS em trânsito.</p>
        </div>
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5">
           <div className="text-3xl mb-6">⚖️</div>
           <h2 className="text-xl font-bold text-white mb-4">Compliance GDPR/LGPD</h2>
           <p className="text-slate-400 leading-relaxed">Consentimento explícito e controle total sobre a exclusão de seus dados.</p>
        </div>
      </div>
    </div>
  );
}
