'use client'

import { Play, Pause, SkipBack, SkipForward, Volume2, Download, Share2, Layers, Music, Settings } from 'lucide-react'
import { useState } from 'react'

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 px-8 py-4 flex items-center justify-between bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold">V</div>
          <div>
            <h1 className="font-bold text-lg">Vibe de Verão</h1>
            <p className="text-xs text-gray-400">Pop • 124 BPM • E-Major</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm font-medium transition-all">
            <Share2 size={16} /> Compartilhar
          </button>
          <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-sm font-bold shadow-lg transition-all">
            <Download size={16} /> Exportar
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Player & Visuals */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Visualizer Area */}
          <div className="aspect-video rounded-3xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/5 flex flex-col items-center justify-center p-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

            {/* Animated Bars Mock */}
            <div className="flex items-end gap-2 h-40">
              {[...Array(24)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 rounded-full bg-blue-500 transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-4'}`}
                  style={{
                    height: isPlaying ? `${Math.random() * 100 + 20}%` : '10%',
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>

            <div className="mt-12 text-center relative z-10">
              <h2 className="text-4xl font-black tracking-tighter mb-2 italic">VOICIFY AI</h2>
              <p className="text-blue-400 font-bold tracking-widest text-xs uppercase">Personal Vocal Identity System</p>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-white"><SkipBack size={24} /></button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
                >
                  {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
                </button>
                <button className="text-gray-400 hover:text-white"><SkipForward size={24} /></button>
              </div>
              <div className="flex-1 mx-12">
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden cursor-pointer group">
                  <div className="bg-blue-500 h-full w-1/3 group-hover:bg-blue-400 transition-all"></div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-500 tracking-wider">
                  <span>01:12</span>
                  <span>03:45</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <Volume2 size={20} />
                <div className="w-24 bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-3/4"></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm font-semibold">
                <Layers size={18} /> Stems (Canais)
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm font-semibold">
                <Music size={18} /> Instrumental
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-sm font-semibold">
                <Settings size={18} /> Remix IA
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Lyrics & Info */}
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 h-full flex flex-col">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FileText size={20} className="text-blue-500" /> Letra da Música
            </h3>
            <div className="flex-1 font-serif text-lg leading-relaxed text-gray-300 space-y-6 overflow-y-auto pr-4">
              <p className="text-white font-bold">[Verso 1]</p>
              <p className="opacity-100">Caminhando na areia quente do mar</p>
              <p className="opacity-50">Sinto o sol a me abraçar</p>
              <p className="opacity-50">O som das ondas é a melodia</p>
              <p className="opacity-50">Que embala minha alegria</p>

              <p className="text-blue-400 font-bold mt-8">[Refrão]</p>
              <p className="opacity-50">Oh, verão, brilho sem fim</p>
              <p className="opacity-50">Traz essa luz dentro de mim</p>
              <p className="opacity-50">Com minha voz eu vou cantar</p>
              <p className="opacity-50">E esse momento eternizar</p>
            </div>
            <button className="mt-8 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
              Editar letra e re-gerar →
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function FileText({ size, className }: { size: number, className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}
