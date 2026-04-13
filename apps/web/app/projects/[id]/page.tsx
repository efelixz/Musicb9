import React from 'react';
import Link from 'next/link';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#0f172a]">
      {/* Header do Projeto */}
      <header className="px-8 py-4 border-b border-slate-800 flex justify-between items-center bg-[#1e293b]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg">V</div>
          <div>
            <h1 className="text-white font-bold text-lg">Vibe de Verão</h1>
            <p className="text-slate-400 text-xs uppercase tracking-wider">Pop • 124 BPM • E-Major</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-slate-300 hover:text-white flex items-center gap-2 text-sm font-medium transition">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
             Compartilhar
          </button>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center gap-2 text-sm font-bold shadow-lg transition transform hover:scale-105">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
             Exportar
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Lado Esquerdo: Editor Visual e Timeline */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          {/* Visualizador / Preview Area */}
          <div className="aspect-video bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl mb-6 relative flex flex-col items-center justify-center border border-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="flex gap-1.5 items-end mb-8">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-blue-400 rounded-full animate-pulse"
                  style={{
                    height: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
            <h2 className="text-4xl font-black text-white italic tracking-tighter mb-1">VOICIFY AI</h2>
            <p className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.3em]">Personal Vocal Identity System</p>
          </div>

          {/* Timeline / Editor Visual */}
          <div className="bg-[#1e293b] rounded-2xl p-6 border border-slate-800 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"></path></svg></button>
                        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition shadow-lg"><svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg></button>
                        <button className="p-2 text-slate-400 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.934 12.8a1 1 0 000-1.6l-5.334-4A1 1 0 005 8v8a1 1 0 001.6.8l5.334-4zm7.868 0a1 1 0 000-1.6l-5.334-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.334-4z"></path></svg></button>
                    </div>
                    <div className="text-slate-500 font-mono text-xs">01:12 / 03:45</div>
                </div>
                <div className="flex items-center gap-4">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
                    <div className="w-24 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-slate-300"></div>
                    </div>
                </div>
            </div>

            {/* Mixer / Stems Section */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-900/50 rounded-2xl border border-slate-700 hover:bg-slate-700 transition group">
                   <span className="text-xl">📊</span>
                   <span className="text-[10px] font-black uppercase text-slate-400">Stems</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-900/50 rounded-2xl border border-slate-700 hover:bg-slate-700 transition group">
                   <span className="text-xl">🎸</span>
                   <span className="text-[10px] font-black uppercase text-slate-400">Instru.</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-600/10 rounded-2xl border border-blue-500/30 hover:bg-blue-600/20 transition group">
                   <span className="text-xl">✨</span>
                   <span className="text-[10px] font-black uppercase text-blue-400">Harmonias</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-purple-600/10 rounded-2xl border border-purple-500/30 hover:bg-purple-600/20 transition group">
                   <span className="text-xl">🔄</span>
                   <span className="text-[10px] font-black uppercase text-purple-400">Versões</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 p-4 bg-slate-900/50 rounded-2xl border border-slate-700 hover:bg-slate-700 transition group">
                   <span className="text-xl">🎚️</span>
                   <span className="text-[10px] font-black uppercase text-slate-400">Mix/Master</span>
                </button>
            </div>

            {/* Mixing Sliders (Seção 1.2) */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-900/30 p-6 rounded-2xl border border-white/5">
                {[
                  { label: 'Vocal', icon: '🎤', vol: 85 },
                  { label: 'Bateria', icon: '🥁', vol: 70 },
                  { label: 'Baixo', icon: '🎸', vol: 60 },
                  { label: 'Melodia', icon: '🎹', vol: 75 },
                ].map(stem => (
                   <div key={stem.label} className="flex flex-col items-center gap-3">
                      <span className="text-sm">{stem.icon}</span>
                      <div className="h-32 w-1.5 bg-slate-800 rounded-full relative group">
                         <div style={{ height: `${stem.vol}%` }} className="w-full bg-blue-500 rounded-full absolute bottom-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                         <div style={{ bottom: `${stem.vol}%` }} className="w-4 h-4 bg-white rounded-full absolute left-1/2 -translate-x-1/2 -mb-2 border-2 border-blue-500 cursor-pointer shadow-lg group-hover:scale-125 transition"></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{stem.label}</span>
                   </div>
                ))}
            </div>
          </div>
        </div>

        {/* Lado Direito: Letra e Controles de Interpretação */}
        <aside className="w-96 bg-[#111827] border-l border-slate-800 flex flex-col p-8 overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <h3 className="text-white font-bold uppercase tracking-widest text-sm">Letra da Música</h3>
            </div>

            <div className="flex-1 text-slate-300 space-y-8 mb-8">
                <section>
                    <h4 className="text-blue-500 text-[10px] font-black uppercase mb-4 tracking-[0.2em]">[Verso 1]</h4>
                    <p className="text-lg leading-relaxed font-medium">Caminhando na areia quente do mar</p>
                    <p className="text-lg leading-relaxed font-medium mt-4">Sinto o sol a me abraçar</p>
                    <p className="text-lg leading-relaxed font-medium mt-4">O som das ondas é a melodia</p>
                    <p className="text-lg leading-relaxed font-medium mt-4">Que embala minha alegria</p>
                </section>
                <section>
                    <h4 className="text-blue-500 text-[10px] font-black uppercase mb-4 tracking-[0.2em]">[Refrão]</h4>
                    <p className="text-xl font-bold text-white italic">Oh, verão, brilho sem fim</p>
                    <p className="text-xl font-bold text-white italic mt-4">Traz essa luz dentro de mim</p>
                    <p className="text-xl font-bold text-white italic mt-4">Com minha voz eu vou cantar</p>
                    <p className="text-xl font-bold text-white italic mt-4">E esse momento eternizar</p>
                </section>
            </div>

            <div className="border-t border-slate-800 pt-6">
                <h4 className="text-white text-xs font-bold mb-4 uppercase tracking-wider">Interpretação e Emoção</h4>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold mb-2">
                            <span>Calma</span>
                            <span>Intensa</span>
                        </div>
                        <input type="range" className="w-full accent-blue-600 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold mb-2">
                            <span>Triste</span>
                            <span>Alegre</span>
                        </div>
                        <input type="range" className="w-full accent-blue-600 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
                    </div>
                </div>
                <button className="w-full mt-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-lg hover:bg-slate-200 transition">
                    Aplicar Mudanças
                </button>
            </div>
        </aside>
      </main>
    </div>
  );
}
