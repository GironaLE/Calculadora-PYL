/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Calculates surface area of the ceiling
 */
export function calcularSuperficie(largo: number, ancho: number): number {
  if (largo <= 0 || ancho <= 0) return 0;
  return largo * ancho;
}

/**
 * Calculates perimeter of the ceiling
 */
export function calcularPerimetro(largo: number, ancho: number): number {
  if (largo <= 0 || ancho <= 0) return 0;
  return (largo + ancho) * 2;
}
