import { useMemo, useState } from 'react';

export default function TechosRegistrables() {
  const [superficie, setSuperficie] = useState(100);
  const [formato, setFormato] = useState('600x600');

  const resultado = useMemo(() => {
    if (formato === '600x600') {
      return {
        placas: Math.ceil(superficie),

        primarioMl: superficie * 0.84,
        secundario600Ml: superficie * 0.84,
        secundario1200Ml: superficie * 1.68,

        angularMl: superficie * 0.4,

        penjants: Math.ceil(superficie * 0.84),
        fijaciones: Math.ceil(superficie * 0.84),
        varillas: Math.ceil(superficie * 0.84),

        barrasPrimario: Math.ceil((superficie * 0.84) / 3.7),
        barrasSec600: Math.ceil((superficie * 0.84) / 0.6),
        barrasSec1200: Math.ceil((superficie * 1.68) / 1.2),
        barrasAngular: Math.ceil((superficie * 0.4) / 3),
      };
    }

    return {
      placas: Math.ceil(superficie),

      primarioMl: superficie * 0.84,
      secundario1200Ml: superficie * 1.67,

      angularMl: superficie * 0.4,

      penjants: Math.ceil(superficie * 0.84),
      fijaciones: Math.ceil(superficie * 0.84),
      varillas: Math.ceil(superficie * 0.84),

      barrasPrimario: Math.ceil((superficie * 0.84) / 3.7),
      barrasSec1200: Math.ceil((superficie * 1.67) / 1.2),
      barrasAngular: Math.ceil((superficie * 0.4) / 3),
    };
  }, [superficie, formato]);

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Techos Registrables
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Superficie (m²)
            </label>

            <input
              type="number"
              value={superficie}
              onChange={(e) =>
                setSuperficie(Number(e.target.value))
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Formato
            </label>

            <select
              value={formato}
              onChange={(e) => setFormato(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="600x600">
                600 x 600
              </option>

              <option value="1200x600">
                1200 x 600
              </option>
            </select>
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-xl font-bold mb-4">
            Materiales
          </h2>

          <div className="space-y-2 text-sm">

            <div>Placas: {resultado.placas}</div>

            <div>
              Perfil Primario:
              {' '}
              {resultado.primarioMl.toFixed(2)} ml
            </div>

            {formato === '600x600' && (
              <>
                <div>
                  Perfil Secundario 600:
                  {' '}
                  {resultado.secundario600Ml.toFixed(2)} ml
                </div>

                <div>
                  Perfil Secundario 1200:
                  {' '}
                  {resultado.secundario1200Ml.toFixed(2)} ml
                </div>
              </>
            )}

            {formato === '1200x600' && (
              <div>
                Perfil Secundario:
                {' '}
                {resultado.secundario1200Ml.toFixed(2)} ml
              </div>
            )}

            <div>
              Angular:
              {' '}
              {resultado.angularMl.toFixed(2)} ml
            </div>

            <div>Penjants: {resultado.penjants}</div>
            <div>Fijaciones: {resultado.fijaciones}</div>
            <div>Varillas: {resultado.varillas}</div>

          </div>
        </div>

      </div>

    </div>
  );
}
