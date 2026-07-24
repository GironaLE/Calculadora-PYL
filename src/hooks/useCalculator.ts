/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { CeilingInputs, AppState } from '../types';
import { calcularTecho, CalculationResult } from '../engine/calculator';

export function useCalculator(initialInputs: CeilingInputs) {
  const [inputs, setInputs] = useState<CeilingInputs>(initialInputs);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>('no_data');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any pending timeout when inputs change
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 1. Check for "no_data" state
    if (inputs.calculoPorM2) {
      if (!inputs.superficieM2 || inputs.superficieM2 <= 0) {
        setAppState('no_data');
        setResult(null);
        setError(null);
        return;
      }
    } else {
      if (!inputs.largo || inputs.largo <= 0 || !inputs.ancho || inputs.ancho <= 0) {
        setAppState('no_data');
        setResult(null);
        setError(null);
        return;
      }
    }

    // 2. Perform validations before calling the engine
    if (inputs.calculoPorM2) {
      if (inputs.superficieM2 && inputs.superficieM2 < 0) {
        setError('Superficie no válida.');
        setAppState('error');
        setResult(null);
        return;
      }
    } else {
      if (inputs.largo < 0) {
        setError('Largo no válido.');
        setAppState('error');
        setResult(null);
        return;
      }
      if (inputs.ancho < 0) {
        setError('Ancho no válido.');
        setAppState('error');
        setResult(null);
        return;
      }
    }

    if (!inputs.separacionMaestraSuperior || inputs.separacionMaestraSuperior <= 0) {
      setError('Separación superior incorrecta.');
      setAppState('error');
      setResult(null);
      return;
    }

    if (!inputs.separacionMaestraInferior || inputs.separacionMaestraInferior <= 0) {
      setError('Separación inferior incorrecta.');
      setAppState('error');
      setResult(null);
      return;
    }

    // 3. Valid state: Transition to 'calculating' briefly for a polished feedback feel
    setAppState('calculating');
    setError(null);

    timeoutRef.current = setTimeout(() => {
      const calcResult = calcularTecho(inputs);
      if (!calcResult.valid) {
        setError(calcResult.error || 'Error desconocido en el cálculo.');
        setAppState('error');
        setResult(null);
      } else {
        setResult(calcResult);
        setAppState('results');
      }
    }, 200); // 200ms delay as requested for visual transition duration

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    inputs.largo,
    inputs.ancho,
    inputs.separacionMaestraSuperior,
    inputs.separacionMaestraInferior,
    inputs.longitudComercialClip,
    inputs.medidaPlaca,
    inputs.desperdicio,
    inputs.calculoPorM2,
    inputs.superficieM2
  ]);

  const resetInputs = () => {
    setInputs(initialInputs);
    setAppState('no_data');
    setResult(null);
    setError(null);
  };

  return {
    inputs,
    setInputs,
    result,
    error,
    appState,
    setAppState, // allow manual switcher overrides if needed
    resetInputs
  };
}
