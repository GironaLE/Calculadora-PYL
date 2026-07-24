/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CeilingInputs } from '../types';
import { calcularSuperficie, calcularPerimetro } from './geometry';
import { calcularMateriales, MaterialResult } from './materials';

export interface CalculationResult {
  valid: boolean;
  error?: string;
  superficie: number;
  perimetro: number;
  materiales: MaterialResult[];
}

/**
 * Coordinator function that executes geometry and fixed-coefficient calculations
 */
export function calcularTecho(inputs: CeilingInputs): CalculationResult {
  // 1. Basic Validations
  if (inputs.calculoPorM2) {
    if (!inputs.superficieM2 || inputs.superficieM2 <= 0) {
      return {
        valid: false,
        error: 'Por favor, introduzca una superficie mayor que 0 m².',
        superficie: 0,
        perimetro: 0,
        materiales: []
      };
    }
    if (inputs.superficieM2 > 2500) {
      return {
        valid: false,
        error: 'La superficie supera el límite de cálculo seguro de 2.500 m² para este sistema continuo.',
        superficie: 0,
        perimetro: 0,
        materiales: []
      };
    }
  } else {
    if (!inputs.largo || inputs.largo <= 0) {
      return {
        valid: false,
        error: 'Por favor, introduzca un largo del techo mayor que 0 metros.',
        superficie: 0,
        perimetro: 0,
        materiales: []
      };
    }
    if (!inputs.ancho || inputs.ancho <= 0) {
      return {
        valid: false,
        error: 'Por favor, introduzca un ancho del techo mayor que 0 metros.',
        superficie: 0,
        perimetro: 0,
        materiales: []
      };
    }
    if (inputs.largo > 100 || inputs.ancho > 100) {
      return {
        valid: false,
        error: 'Las dimensiones superan el límite máximo de 100 metros por lado para esta calculadora.',
        superficie: 0,
        perimetro: 0,
        materiales: []
      };
    }
  }

  // 2. Geometrical calculations
  let superficie = 0;
  let perimetro = 0;

  if (inputs.calculoPorM2 && inputs.superficieM2) {
    superficie = inputs.superficieM2;
    // For perimeter estimation of a square layout: 4 * sqrt(area)
    perimetro = Number((4 * Math.sqrt(superficie)).toFixed(2));
  } else {
    superficie = calcularSuperficie(inputs.largo, inputs.ancho);
    perimetro = calcularPerimetro(inputs.largo, inputs.ancho);
  }

  // Round surface and perimeter to 2 decimals
  superficie = Number(superficie.toFixed(2));
  perimetro = Number(perimetro.toFixed(2));

  // 3. Compute material rows based on surface and coefficients
  const materiales = calcularMateriales(superficie, !!inputs.desperdicio, inputs.medidaPlaca);

  return {
    valid: true,
    superficie,
    perimetro,
    materiales
  };
}
