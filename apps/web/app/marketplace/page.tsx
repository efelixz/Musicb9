import React from 'react';

export default function MarketplacePage() {
  const voices = [
    { name: 'Aurora', genre: 'Dream Pop', tone: 'Celestial', price: '20 créditos' },
    { name: 'Jax', genre: 'Hip Hop', tone: 'Gritty', price: '15 créditos' },
    { name: 'Elena', genre: 'Jazz/Soul', tone: 'Smooth', price: '25 créditos' },
    { name: 'Phoenix', genre: 'Hard Rock', tone: 'Powerful', price: '20 créditos' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black text-white italic mb-2 tracking-tighter">MARKETPLACE</h1>
          <p className="text-slate-400">Explore e use vozes autorizadas de artistas parceiros.</p>
        </div>
        <div className="flex gap-4">
           <input type="text" placeholder="Buscar vozes..." className="bg-slate-900 border border-slate-800 rounded-full px-6 py-2 text-sm text-white outline-none focus:border-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {voices.map(voice => (
          <div key={voice.name} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition group">
             <div className="w-full aspect-square bg-slate-800 rounded-2xl mb-6 flex items-center justify-center text-4xl group-hover:scale-105 transition">🎤</div>
             <h2 className="text-xl font-bold text-white mb-1">{voice.name}</h2>
             <p className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">{voice.genre} • {voice.tone}</p>
             <div className="flex justify-between items-center">
                <span className="text-slate-300 font-bold text-sm">{voice.price}</span>
                <button className="px-4 py-2 bg-white text-black text-xs font-black rounded-full hover:bg-slate-200 transition">ATIVAR</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
