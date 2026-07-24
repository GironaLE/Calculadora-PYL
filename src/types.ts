/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppState = 'no_data' | 'calculating' | 'results' | 'error';

export interface CeilingInputs {
  largo: number;
  ancho: number;
  separacionMaestraSuperior: number; // in mm, e.g. 800
  separacionMaestraInferior: number; // in mm, e.g. 500
  longitudComercialMaestra: number;  // in m, e.g. 3
  longitudComercialClip: number;     // in m, e.g. 3
  medidaPlaca: string;               // e.g. "2000 × 1200"
  desperdicio: boolean;              // true adds 5%
  calculoPorM2?: boolean;            // true if calculating by m² directly
  superficieM2?: number;             // surface in m² when calculating by m²
}

export interface MaterialRow {
  icon: string;
  material: string;
  cantidad: number;
  unidad: string;
  formatoComercial: string;
  unidades: number;
}

export interface SummaryData {
  superficie: number;
  perimetro: number;
  lineasF47Superiores: number;
  lineasF47Inferiores: number;
}
