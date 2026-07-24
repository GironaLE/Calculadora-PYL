/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import CeilingForm from './components/CeilingForm';
import ResultsPanel from './components/ResultsPanel';
import { useCalculator } from './hooks/useCalculator';
import { Info, Sparkles, Hammer, ShieldAlert } from 'lucide-react';

export default function App() {
  const {
    inputs,
    setInputs,
    result,
    error,
    appState,
    setAppState,
    resetInputs
  } = useCalculator({
    largo: 6,
    ancho: 4,
    separacionMaestraSuperior: 800,
    separacionMaestraInferior: 500,
    longitudComercialMaestra: 3,
    longitudComercialClip: 3,
    medidaPlaca: '2500 × 1200',
    desperdicio: true,
    calculoPorM2: false,
    superficieM2: 24
  });

  const [showValidationMock, setShowValidationMock] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans text-slate-800 flex flex-col justify-between">
      {/* Upper header (70px) */}
      <Header />

      {/* Main app grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1 w-full grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Inputs Panel (35% approx -> 4 columns out of 12) */}
        <div className="xl:col-span-4 space-y-6 no-print">


          {/* Core inputs form card */}
          <CeilingForm 
            inputs={inputs} 
            onChange={setInputs} 
            showValidationMock={showValidationMock}
            setShowValidationMock={setShowValidationMock}
          />
        </div>

        {/* Right Side: Results & Diagrams (65% approx -> 8 columns out of 12) */}
        <div className="xl:col-span-8 space-y-6">
          <ResultsPanel 
            inputs={inputs} 
            appState={appState} 
            result={result}
            error={error}
            onReset={resetInputs}
          />
        </div>

      </main>

      {/* Elegant, clean corporate footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 font-sans gap-4">
          <p>© {new Date().getFullYear()} La Especialista. Todos los derechos reservados. Creado por <strong>Paco Butrón</strong>.</p>
          <div className="flex space-x-4">
            <a href="https://laespecialista.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 font-medium">laespecialista.es</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
