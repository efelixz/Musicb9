'use client'

import { Plus, Music, Clock, Download, MoreVertical } from 'lucide-react'
import Link from 'next/link'

const MOCK_PROJECTS = [
  { id: '1', title: 'Vibe de Verão', status: 'Ready', genre: 'Pop', createdAt: '2024-03-20' },
  { id: '2', title: 'Noites de Jazz', status: 'Generating', genre: 'Jazz', createdAt: '2024-03-21' },
  { id: '3', title: 'Novo Álbum - Faixa 1', status: 'Draft', genre: 'Rock', createdAt: '2024-03-22' },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar / Topbar Mock */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
          <span className="text-xl font-bold">Voicify</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">Créditos: <span className="font-bold text-blue-600">12</span></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meus Projetos</h1>
            <p className="text-gray-600">Gerencie suas criações musicais</p>
          </div>
          <Link
            href="/projects/new"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 shadow-lg transition-all"
          >
            <Plus size={20} /> Novo Projeto
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Músicas Geradas</p>
            <p className="text-3xl font-bold mt-2">24</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Perfis Vocais</p>
            <p className="text-3xl font-bold mt-2">1</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Horas de Estúdio</p>
            <p className="text-3xl font-bold mt-2">12.5h</p>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Projeto</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Gênero</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Criado em</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_PROJECTS.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                          <Music size={20} />
                        </div>
                        <span className="font-medium text-gray-900">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        project.status === 'Ready' ? 'bg-green-100 text-green-700' :
                        project.status === 'Generating' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status === 'Generating' && <div className="w-1.5 h-1.5 bg-blue-700 rounded-full animate-pulse"></div>}
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.genre}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{project.createdAt}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
