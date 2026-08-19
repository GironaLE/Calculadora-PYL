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

        rollosCinta
