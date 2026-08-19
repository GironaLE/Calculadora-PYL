import { useMemo, useState } from 'react';

export default function Trasdosados() {
  const [sistema, setSistema] = useState('W621');

  const [modoCalculo, setModoCalculo] =
    useState('dimensiones');

  const [longitud, setLongitud] = useState(20);
  const [altura, setAltura] = useState(2.5);

  const [superficieManual, setSuperficieManual] =
    useState(50);

  const [alturaPlaca, setAlturaPlaca] =
    useState(3);

  const [merma, setMerma] = useState(5);

  const superficieBase =
    modoCalculo === 'dimensiones'
      ? longitud * altura
      : superficieManual;

  const superficie =
    superficieBase * (1 + merma / 100);

  const superficiePlaca =
    alturaPlaca * 1.2;

  const resultado = useMemo(() => {

    const placas = Math.ceil(
      superficie / superficiePlaca
    );

    if (sistema === 'W621') {

      const maestraMl =
        superficie * 2;

      const maestras = Math.ceil(
        maestraMl / 3
      );

      const tn25 = Math.ceil(
        superficie * 14
      );

      const cajasTN25 = Math.ceil(
        tn25 / 1000
      );

      const pastaJuntasKg =
        superficie * 0.3;

      const sacosJuntas = Math.ceil(
        pastaJuntasKg / 20
      );

      const cintaMl =
        superficie * 0.75;

      const rollosCinta = Math.ceil(
        cintaMl / 150
      );

      return {
        placas,

        maestras,

        cajasTN25,

        sacosJuntas,

        rollosCinta,
      };
    }

    const perfilUMl =
      superficie * 0.7;

    const perfilesU = Math.ceil(
      perfilUMl / 3
    );

    const montanteMl =
      superficie * 2;

    const montantes = Math.ceil(
      montanteMl / alturaPlaca
    );

    const bandaMl =
      superficie * 0.8;

    const rollosBanda = Math.ceil(
      bandaMl / 30
    );

    const anclajes = Math.ceil(
      superficie * 0.7
    );

    const tn25 = Math.ceil(
      superficie * 1.4
    );

    const cajasTN25 = Math.ceil(
      tn25 / 1000
    );

    const tn35 = Math.ceil(
      superficie * 14
    );

    const cajasTN35 = Math.ceil(
      tn35 / 1000
    );

    const pastaJuntasKg =
      superficie * 0.3;

    const sacosJuntas = Math.ceil(
      pastaJuntasKg / 20
    );

    const cintaMl =
      superficie * 0.75;

    const rollosCinta = Math.ceil(
      cintaMl / 150
    );

    return {
      placas,

      perfilesU,

      montantes,

      rollosBanda,

      anclajes,

      cajasTN25,

      cajasTN35,

      sacosJuntas,

      rollosCinta,
    };
  }, [
    sistema,
    superficie,
    superficiePlaca,
    alturaPlaca,
  ]);

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Calculadora de Trasdosados
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
              <option value="W621">
                W621 Semidirecto
              </option>

              <option value="W623">
                W623 Autoportante
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Método de cálculo
            </label>

            <select
              value={modoCalculo}
              onChange={(e) =>
                setModoCalculo(e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="dimensiones">
                Longitud × Altura
              </option>

              <option value="superficie">
                Superficie total
              </option>
            </select>
          </div>

          {modoCalculo === 'dimensiones' ? (
            <>
              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Longitud (m)
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
                  Altura (m)
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
            </>
          ) : (
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Superficie (m²)
              </label>

              <input
                type="number"
                value={superficieManual}
                onChange={(e) =>
                  setSuperficieManual(
                    Number(e.target.value)
                  )
                }
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          )}

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
              <option value={2}>2,00 m</option>
              <option value={2.5}>2,50 m</option>
              <option value={2.6}>2,60 m</option>
              <option value={2.7}>2,70 m</option>
              <option value={2.8}>2,80 m</option>
              <option value={3}>3,00 m</option>
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
                    Placa Knauf Standard 15 mm
                  </td>

                  <td className="p-3 text-right">
                    {resultado.placas}
                  </td>
                </tr>

                {sistema === 'W621' && (
                  <>
                    <tr className="border-t">
                      <td className="p-3">
                        Maestra
                      </td>
                      <td className="p-3 text-right">
                        {resultado.maestras}
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-3">
                        Tornillos TN 25
                      </td>
                      <td className="p-3 text-right">
                        {resultado.cajasTN25}
                      </td>
                    </tr>
                  </>
                )}

                {sistema === 'W623' && (
                  <>
                    <tr className="border-t">
                      <td className="p-3">
                        Perfil U 30x30
                      </td>

                      <td className="p-3 text-right">
                        {resultado.perfilesU}
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-3">
                        Maestra 60x27
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
                        Anclaje Directe
                      </td>

                      <td className="p-3 text-right">
                        {resultado.anclajes}
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-3">
                        Tornillos TN 25
                      </td>

                      <td className="p-3 text-right">
                        {resultado.cajasTN25}
                      </td>
                    </tr>

                    <tr className="border-t">
                      <td className="p-3">
                        Tornillos TN 35
                      </td>

                      <td className="p-3 text-right">
                        {resultado.cajasTN35}
                      </td>
                    </tr>
                  </>
                )}

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
