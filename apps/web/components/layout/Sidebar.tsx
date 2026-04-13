'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Mic2,
  Music,
  Library,
  CreditCard,
  Settings,
  ShieldAlert,
  HelpCircle,
  Building2,
  LogOut,
  Store
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Minha Voz', icon: Mic2, path: '/voices' },
    { name: 'Marketplace', icon: Store, path: '/marketplace' },
    { name: 'Meus Projetos', icon: Music, path: '/projects' },
    { name: 'Biblioteca', icon: Library, path: '/library' },
    { name: 'Planos', icon: CreditCard, path: '/billing' },
  ];

  const bottomItems = [
    { name: 'Enterprise', icon: Building2, path: '/enterprise' },
    { name: 'Admin', icon: ShieldAlert, path: '/admin' },
    { name: 'Configurações', icon: Settings, path: '/settings' },
    { name: 'Suporte', icon: HelpCircle, path: '/support' },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <Link href="/dashboard" className="text-2xl font-black text-white italic tracking-tighter">VOICIFY</Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
              pathname === item.path ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm ${
              pathname === item.path ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-white hover:bg-slate-800'
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        ))}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm text-red-500 hover:bg-red-500/10">
           <LogOut size={18} /> Sair
        </button>
      </div>
    </aside>
  );
}
