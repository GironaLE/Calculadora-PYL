import { useState } from 'react';

export default function Tabiques() {
  const [tipo, setTipo] = useState('W111');
  const [modulacion, setModulacion] = useState('600');

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Calculadora de Tabiques
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Sistema
            </label>

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="W111">
                W111 · 1 placa por cara
              </option>

              <option value="W112">
                W112 · 2 placas por cara
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Modulación
            </label>

            <select
              value={modulacion}
              onChange={(e) => setModulacion(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="600">
                600 mm
              </option>

              <option value="400">
                400 mm
              </option>
            </select>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold mb-4">
            Resumen
          </h2>

          <p>
            Sistema: {tipo}
          </p>

          <p>
            Modulación: {modulacion} mm
          </p>

        </div>

      </div>
    </div>
  );
}
