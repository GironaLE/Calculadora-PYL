/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MATERIAL_COEFFICIENTS } from '../constants/materialCoefficients';

export interface MaterialResult {
  nombre: string;
  cantidadReal: number;
  unidad: string;
  formatoComercial: string;
  unidadesComerciales: number;
}

/**
 * Parses gypsum board size string (e.g. "2500 × 1200") to length and width in meters
 */
export function parseMedidaPlaca(medidaStr: string): { anchoM: number; largoM: number } {
  const cleaned = medidaStr.replace(/\s+/g, '');
  const parts = cleaned.split(/[×xX*]/);
  if (parts.length === 2) {
    const num1 = parseFloat(parts[0]) || 2500;
    const num2 = parseFloat(parts[1]) || 1200;
    const val1 = num1 / 1000;
    const val2 = num2 / 1000;
    return {
      largoM: Math.max(val1, val2),
      anchoM: Math.min(val1, val2)
    };
  }
  return { largoM: 2.5, anchoM: 1.2 }; // standard fallback
}

/**
 * Calculates materials using fixed coefficients and commercial conversions
 */
export function calcularMateriales(
  superficie: number,
  desperdicio: boolean,
  medidaPlacaStr: string
): MaterialResult[] {
  // Apply waste increment (+5%) before rounding if active
  const factorDesperdicio = desperdicio ? 1.05 : 1.00;

  // 1. Placa PYL
  const placaDims = parseMedidaPlaca(medidaPlacaStr);
  const placaArea = placaDims.largoM * placaDims.anchoM;
  const cantRealPlaca = superficie * MATERIAL_COEFFICIENTS.placa * factorDesperdicio;
  const udsComercialesPlaca = Math.ceil(cantRealPlaca / placaArea);

  // 2. Maestra F47
  const cantRealMaestra = superficie * MATERIAL_COEFFICIENTS.maestraF47 * factorDesperdicio;
  const udsComercialesMaestra = Math.ceil(cantRealMaestra / 3);

  // 3. Perfil Clip
  const cantRealClip = superficie * MATERIAL_COEFFICIENTS.perfilClip * factorDesperdicio;
  const udsComercialesClip = Math.ceil(cantRealClip / 3);

  // 4. Tornillo TN 25
  const cantRealTornillo = superficie * MATERIAL_COEFFICIENTS.tornilloTN25 * factorDesperdicio;
  const udsComercialesTornillo = Math.ceil(cantRealTornillo / 1000);

  // 5. Horquilla / Penjant
  const cantRealHorquilla = superficie * MATERIAL_COEFFICIENTS.horquilla * factorDesperdicio;
  const udsComercialesHorquilla = Math.ceil(cantRealHorquilla);

  // 6. Varilla 1 m
  const cantRealVarilla = superficie * MATERIAL_COEFFICIENTS.varilla * factorDesperdicio;
  const udsComercialesVarilla = Math.ceil(cantRealVarilla);

  // 8. Conector de Maestra
  const cantRealConector = superficie * MATERIAL_COEFFICIENTS.conector * factorDesperdicio;
  const udsComercialesConector = Math.ceil(cantRealConector);

  // 9. Caballete F47
  const cantRealCaballete = superficie * MATERIAL_COEFFICIENTS.caballete * factorDesperdicio;
  const udsComercialesCaballete = Math.ceil(cantRealCaballete);

  // 10. Pasta de juntas
  const cantRealPasta = superficie * MATERIAL_COEFFICIENTS.pastaJuntas * factorDesperdicio;
  const udsComercialesPasta = Math.ceil(cantRealPasta / 20);

  // 11. Cinta
  const cantRealCinta = superficie * MATERIAL_COEFFICIENTS.cinta * factorDesperdicio;
  const udsComercialesCinta = Math.ceil(cantRealCinta / 150);

  return [
    {
      nombre: 'Placa PYL',
      cantidadReal: Number(cantRealPlaca.toFixed(2)),
      unidad: 'm²',
      formatoComercial: `Placa ${medidaPlacaStr} mm (${placaArea.toFixed(2)} m²)`,
      unidadesComerciales: udsComercialesPlaca
    },
    {
      nombre: 'Maestra F47',
      cantidadReal: Number(cantRealMaestra.toFixed(2)),
      unidad: 'ml',
      formatoComercial: 'Barra 3 m',
      unidadesComerciales: udsComercialesMaestra
    },
    {
      nombre: 'Perfil Clip',
      cantidadReal: Number(cantRealClip.toFixed(2)),
      unidad: 'ml',
      formatoComercial: 'Barra 3 m',
      unidadesComerciales: udsComercialesClip
    },
    {
      nombre: 'Tornillo TN 25',
      cantidadReal: Math.round(cantRealTornillo),
      unidad: 'uds',
      formatoComercial: 'Caja 1.000 uds',
      unidadesComerciales: udsComercialesTornillo
    },
    {
      nombre: 'Horquilla / Penjant',
      cantidadReal: Math.round(cantRealHorquilla),
      unidad: 'uds',
      formatoComercial: 'Unidad',
      unidadesComerciales: udsComercialesHorquilla
    },
    {
      nombre: 'Varilla 1 m',
      cantidadReal: Math.round(cantRealVarilla),
      unidad: 'uds',
      formatoComercial: 'Unidad',
      unidadesComerciales: udsComercialesVarilla
    },
    {
      nombre: 'Conector de Maestra',
      cantidadReal: Math.round(cantRealConector),
      unidad: 'uds',
      formatoComercial: 'Unidad',
      unidadesComerciales: udsComercialesConector
    },
    {
      nombre: 'Caballete F47',
      cantidadReal: Math.round(cantRealCaballete),
      unidad: 'uds',
      formatoComercial: 'Unidad',
      unidadesComerciales: udsComercialesCaballete
    },
    {
      nombre: 'Pasta de juntas',
      cantidadReal: Number(cantRealPasta.toFixed(2)),
      unidad: 'kg',
      formatoComercial: 'Saco 20 kg',
      unidadesComerciales: udsComercialesPasta
    },
    {
      nombre: 'Cinta',
      cantidadReal: Number(cantRealCinta.toFixed(2)),
      unidad: 'ml',
      formatoComercial: 'Rollo 150 m',
      unidadesComerciales: udsComercialesCinta
    }
  ];
}
