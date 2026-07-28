import { useMemo, useState } from 'react';

export default function TechosRegistrables() {
  const [modoCalculo, setModoCalculo] = useState('dimensiones');

  const [largo, setLargo] = useState(10);
  const [ancho, setAncho] = useState(10);

  const [superficieManual, setSuperficieManual] = useState(100);

  const [formato, setFormato] = useState('600x600');
  const [merma, setMerma] = useState(5);

  const superficieBase =
    modoCalculo === 'dimensiones'
      ? largo * ancho
      : superficieManual;

  const superficie =
    superficieBase * (1 + merma / 100);

  const resultado = useMemo(() => {
    if (formato === '600x600') {
      return {
        placas: Math.ceil(superficie / 0.36),

        penjants: Math.ceil(superficie * 0.84),
        varillas: Math.ceil(superficie * 0.84),

        barrasPrimario: Math.ceil(
          (superficie * 0.84) / 3.7
        ),

        barrasSec600: Math.ceil(
          (superficie * 0.84) / 0.6
        ),

        barrasSec1200: Math.ceil(
          (superficie * 1.68) / 1.2
        ),

        barrasAngular: Math.ceil(
          (superficie * 0.4) / 3
        ),
      };
    }

    return {
      placas: Math.ceil(superficie / 0.72),

      penjants: Math.ceil(superficie * 0.84),
      varillas: Math.ceil(superficie * 0.84),

      barrasPrimario: Math.ceil(
        (superficie * 0.84) / 3.7
      ),

      barrasSec1200: Math.ceil(
        (superficie * 1.67) / 1.2
      ),

      barrasAngular: Math.ceil(
        (superficie * 0.4) / 3
      ),
    };
  }, [superficie, formato]);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Calculadora de Techos Registrables
