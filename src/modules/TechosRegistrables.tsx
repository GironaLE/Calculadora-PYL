import { useMemo, useState } from 'react';

export default function TechosRegistrables() {
  const [largo, setLargo] = useState(10);
  const [ancho, setAncho] = useState(10);

  const superficie = largo * ancho;

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
        <h1 className="text-3xl font-bold mb-6">
  Calculadora de Techos Registrables T24
</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <div className="mb-4">
  <label className="block mb-2 font-medium">
    Largo (m)
  </label>

  <input
    type="number"
    value={largo}
    onChange={(e) =>
      setLargo(Number(e.target.value))
    }
    className="w-full border rounded-lg px-3 py-2"
  />
</div>

<div className="mb-4">
  <label className="block mb-2 font-medium">
    Ancho (m)
  </label>

  <input
    type="number"
    value={ancho}
    onChange={(e) =>
      setAncho(Number(e.target.value))
    }
    className="w-full border rounded-lg px-3 py-2"
  />
</div>

<div className="mb-4 p-4 bg-slate-50 rounded-xl border">
  <p className="text-sm text-slate-500">
    Superficie calculada
  </p>

  <p className="text-2xl font-bold">
    {superficie.toFixed(2)} m²
  </p>
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
            Ficha Técnica Oficial
          </h2>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">

              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-3">
                    Material
                  </th>

                  <th className="text-right p-3">
                    Cantidad
                  </th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-t">
                  <td className="p-3">
                    Placas
                  </td>

                  <td className="p-3 text-right">
                    {resultado.placas}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Perfil Primario
                  </td>

                  <td className="p-3 text-right">
                    {resultado.primarioMl.toFixed(2)} ml
                  </td>
                </tr>

                {formato === '600x600' && (
                  <>
                    <tr className="border-t">
                      <td className="p-3">
                        Perfil Secundario 600
                      </td>

                      <td className="p-3 text-right">
                        {resultado.secundario600Ml.toFixed(2)} ml
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-3">
                        Perfil Secundario 1200
                      </td>

                      <td className="p-3 text-right">
                        {resultado.secundario1200Ml.toFixed(2)} ml
                      </td>
                    </tr>
                  </>
                )}

                {formato === '1200x600' && (
                  <tr className="border-t">
                    <td className="p-3">
                      Perfil Secundario 1200
                    </td>

                    <td className="p-3 text-right">
                      {resultado.secundario1200Ml.toFixed(2)} ml
                    </td>
                  </tr>
                )}

                <tr className="border-t">
                  <td className="p-3">
                    Angular
                  </td>

                  <td className="p-3 text-right">
                    {resultado.angularMl.toFixed(2)} ml
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Penjant Twist
                  </td>

                  <td className="p-3 text-right">
                    {resultado.penjants}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Fijaciones
                  </td>

                  <td className="p-3 text-right">
                    {resultado.fijaciones}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Varillas
                  </td>

                  <td className="p-3 text-right">
                    {resultado.varillas}
                  </td>
                </tr>

              </tbody>

            </table>
          </div>
          <div className="mt-6">
  <h3 className="text-lg font-semibold mb-4">
    Unidades de Facturación
  </h3>

  <div className="overflow-hidden rounded-xl border">
    <table className="w-full text-sm">

      <tbody>

        <tr className="border-t">
          <td className="p-3">
            Perfil Primario 3,7 m
          </td>

          <td className="p-3 text-right">
            {resultado.barrasPrimario}
          </td>
        </tr>

        {formato === '600x600' && (
          <>
            <tr className="border-t">
              <td className="p-3">
                Perfil Secundario 600
              </td>

              <td className="p-3 text-right">
                {resultado.barrasSec600}
              </td>
            </tr>

            <tr className="border-t">
              <td className="p-3">
                Perfil Secundario 1200
              </td>

              <td className="p-3 text-right">
                {resultado.barrasSec1200}
              </td>
            </tr>
          </>
        )}

        {formato === '1200x600' && (
          <tr className="border-t">
            <td className="p-3">
              Perfil Secundario 1200
            </td>

            <td className="p-3 text-right">
              {resultado.barrasSec1200}
            </td>
          </tr>
        )}

        <tr className="border-t">
          <td className="p-3">
            Angular 3 m
          </td>

          <td className="p-3 text-right">
            {resultado.barrasAngular}
          </td>
        </tr>

      </tbody>

    </table>
  </div>
</div>

{formato === '600x600' && (
  <>
    <div>
      Perfil Secundario 600:
      {' '}
      {resultado.barrasSec600}
    </div>

    <div>
      Perfil Secundario 1200:
      {' '}
      {resultado.barrasSec1200}
    </div>
  </>
)}

{formato === '1200x600' && (
  <div>
    Perfil Secundario 1200:
    {' '}
    {resultado.barrasSec1200}
  </div>
)}

<div>
  Angular 3 m:
  {' '}
  {resultado.barrasAngular}
</div>

        </div>

      </div>

    </div>
  );
}
