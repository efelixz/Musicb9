import React from 'react';

export default function ProjectListPage() {
  const projects = [
    { id: '1', title: 'Vibe de Verão', genre: 'Pop', status: 'Ready', date: 'Há 2 dias' },
    { id: '2', title: 'Noite de Luar', genre: 'Lo-fi', status: 'Processing', date: 'Hoje' },
    { id: '3', title: 'Amanhecer', genre: 'Jazz', status: 'Draft', date: 'Há 1 semana' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-3xl font-bold text-white">Meus Projetos</h1>
        <a href="/projects/new" className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition">Novo Projeto</a>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map(project => (
          <a href={`/projects/${project.id}`} key={project.id} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex justify-between items-center hover:border-blue-500 transition">
             <div>
                <h2 className="text-xl font-bold text-white mb-1">{project.title}</h2>
                <p className="text-slate-400 text-sm">{project.genre} • {project.date}</p>
             </div>
             <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${project.status === 'Ready' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                   {project.status}
                </span>
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
             </div>
          </a>
        ))}
      </div>
    </div>
  );
}
