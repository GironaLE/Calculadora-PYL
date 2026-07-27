import {
  LayoutDashboard,
  Building2,
  Layers3,
  Construction,
} from 'lucide-react';

import logo from '../Logo LE2.png';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export default function Sidebar({
  activeModule,
  setActiveModule,
}: SidebarProps) {
  const items = [
    {
      id: 'techos-continuos',
      label: 'Techos Continuos',
      icon: LayoutDashboard,
      enabled: true,
    },
    {
      id: 'techos-registrables',
      label: 'Techos Registrables',
      icon: Building2,
      enabled: false,
    },
    {
      id: 'tabiques',
      label: 'Tabiques',
      icon: Layers3,
      enabled: false,
    },
    {
      id: 'trasdosados',
      label: 'Trasdosados',
      icon: Construction,
      enabled: false,
    },
  ];

  return (
    <aside className="bg-slate-900 text-white w-full md:w-[420px] md:min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <img
          src={logo}
          alt="La Especialista"
          className="w-full max-w-[260px] mx-auto mb-4"
        />

        <p className="text-sm text-slate-400 text-center">
          Suite t-to-r from-blue-600 to-cyan-500 px-3 py-1 rounded-full font-semibold">
            PRO v1.0
          </span>
        </div>
      </div>

      <nav className="p-4">
        <p className="px-4 mb-3 text-xs uppercase tracking-wider text-slate-500">
          Sistemas
        </p>

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              disabled={!item.enabled}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between rounded-lg 
