import { useMemo, useState } from 'react';

export default function Tabiques() {
  const [sistema, setSistema] = useState('W111');
  const [modulacion, setModulacion] = useState('600');

  const [longitud, setLongitud] = useState(20);
  const [altura, setAltura] = useState(3);

  const [alturaPlaca, setAlturaPlaca] = useState(3);
  const [merma, setMerma] = useState(5);

  const superficieBase = longitud * altura;

  const superficie =
    superficieBase * (1 + merma / 100);

  const superficiePlaca =
    alturaPlaca * 1.2;

  const resultado = useMemo(() => {
    const esW112 = sistema === 'W112';
    const es400 = modulacion === '400';

    const factorPlaca = esW112 ? 4 : 2;

    const placas = Math.ceil(
      (superficie * factorPlaca) /
        superficiePlaca
    );

    const canalesMl = superficie * 0.7;

    const canales = Math.ceil(
      canalesMl / 3
    );

    const montantes = Math.ceil(
      longitud /
        (es400 ? 0.4 : 0.6)
    ) + 1;

    const bandaMl = superficie * 1.2;

    const rollosBanda = Math.ceil(
      bandaMl / 30
    );

    const tornillos = Math.ceil(
      superficie *
        (esW112
          ? es400
            ? 53
            : 42
          : es400
          ? 37
          : 29)
    );

    const cajasTornillos = Math.ceil(
      tornillos / 1000
    );

    const pastaAgarreKg =
      superficie * (esW112 ? 0.2 : 0.1);

    const sacosAgarre = Math.ceil(
      pastaAgarreKg / 25
    );

    const pastaJuntasKg =
      superficie * (esW112 ? 1 : 0.6);

    const sacosJuntas = Math.ceil(
      pastaJuntasKg / 20
    );

    const cintaMl =
      superficie * 1.5;

    const rollosCinta = Math.ceil(
      cintaMl / 150
    );

    return {
      placas,
      canales,
      montantes,
      rollosBanda,
      tornillos,
      cajasTornillos,
      sacosAgarre,
      sacosJuntas,
      rollosCinta,
    };
  }, [
    sistema,
    modulacion,
    longitud,
    superficie,
    superficiePlaca,
  ]);

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
              value={sistema}
              onChange={(e) =>
                setSistema(e.target.value)
              }
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

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Modulación
            </label>

            <select
              value={modulacion}
              onChange={(e) =>
                setModulacion(e.target.value)
              }
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

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Longitud del tabique (m)
            </label>

            <input
              type="number"
              value={longitud}
              onChange={(e) =>
                setLongitud(
                  Number(e.target.value)
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Altura del tabique (m)
            </label>

            <input
              type="number"
              value={altura}
              onChange={(e) =>
                setAltura(
                  Number(e.target.value)
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Altura de placa
            </label>

            <select
              value={alturaPlaca}
              onChange={(e) =>
                setAlturaPlaca(
                  Number(e.target.value)
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value={2}>
                2,00 m
              </option>

              <option value={2.5}>
                2,50 m
              </option>

              <option value={2.6}>
                2,60 m
              </option>

              <option value={2.7}>
                2,70 m
              </option>

              <option value={2.8}>
                2,80 m
              </option>

              <option value={3}>
                3,00 m
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Merma
            </label>

            <select
              value={merma}
              onChange={(e) =>
                setMerma(
                  Number(e.target.value)
                )
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value={0}>0%</option>
              <option value={5}>5%</option>
              <option value={10}>10%</option>
              <option value={15}>15%</option>
            </select>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border">
            <p className="text-sm text-slate-500">
              Superficie de cálculo
            </p>

            <p className="text-2xl font-bold">
              {superficie.toFixed(2)} m²
            </p>

            <p className="text-sm text-slate-500 mt-2">
              Base: {superficieBase.toFixed(2)} m²
            </p>
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
                    Placas 12,5 mm
                  </td>

                  <td className="p-3 text-right">
                    {resultado.placas}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Canal 48x30
                  </td>

                  <td className="p-3 text-right">
                    {resultado.canales}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Montante 46x36
                  </td>

                  <td className="p-3 text-right">
                    {resultado.montantes}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Banda acústica
                  </td>

                  <td className="p-3 text-right">
                    {resultado.rollosBanda}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Tornillos TN 25
                  </td>

                  <td className="p-3 text-right">
                    {resultado.cajasTornillos}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Pasta de agarre
                  </td>

                  <td className="p-3 text-right">
                    {resultado.sacosAgarre}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Pasta de juntas
                  </td>

                  <td className="p-3 text-right">
                    {resultado.sacosJuntas}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">
                    Cinta de juntas
                  </td>

                  <td className="p-3 text-right">
                    {resultado.rollosCinta}
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}
