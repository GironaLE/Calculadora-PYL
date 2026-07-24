import { LayoutDashboard, Building2, Layers3, Construction } from 'lucide-react';

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
    <aside className="bg-slate-900 text-white w-full md:w-72 md:min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">LA ESPECIALISTA</h1>
        <p className="text-sm text-slate-400">
          Sistemas de PYL
        </p>
      </div>

      <nav className="p-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              disabled={!item.enabled}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center justify-between rounded-lg px-4 py-3 mb-2 transition
                ${
                  activeModule === item.id
                    ? 'bg-blue-600'
                    : 'bg-slate-800'
                }
                ${
                  !item.enabled
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:bg-slate-700'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
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
