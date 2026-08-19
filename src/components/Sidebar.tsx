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
  enabled: true,
},
    {
      id: 'tabiques',
      label: 'Tabiques',
      icon: Layers3,
      enabled: true,
    },
    {
  id: 'trasdosados',
  label: 'Trasdosados',
  icon: ...,
  enabled: true,
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
          Suite Profesional PYL
        </p>

        <div className="mt-3 text-center">
          <span className="text-xs bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 rounded-full font-semibold">
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
              className={`w-full flex items-center justify-between rounded-lg px-4 py-3 mb-2 transition ${
                activeModule === item.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xl shadow-cyan-500/20'
                  : 'bg-slate-800'
              } ${
                !item.enabled
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:bg-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} strokeWidth={2.2} />
                {item.label}
              </div>

              {!item.enabled && (
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">
                  Próximamente
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
