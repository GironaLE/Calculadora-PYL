import { Construction } from 'lucide-react';

interface Props {
  title: string;
}

export default function ComingSoon({ title }: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 max-w-xl w-full text-center">

        <div className="flex justify-center mb-6">
          <Construction
            size={60}
            className="text-blue-600"
          />
        </div>

        <h2 className="text-3xl font-bold mb-4">
          {title}
        </h2>

        <p className="text-slate-500 mb-6">
          Este módulo se encuentra actualmente en desarrollo.
        </p>

        <div className="text-left bg-slate-50 rounded-xl p-4">
          <p className="font-semibold mb-2">
            Próximas funcionalidades:
          </p>

          <ul className="list-disc pl-5 text-slate-600 space-y-1">
            <li>Cálculo automático de materiales</li>
            <li>Despiece técnico detallado</li>
            <li>Exportación de informes</li>
            <li>Fichas técnicas oficiales</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
