import React, { useState } from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ComingSoon from './components/ComingSoon';
import CeilingForm from './components/CeilingForm';
import ResultsPanel from './components/ResultsPanel';

import { useCalculator } from './hooks/useCalculator';

export default function App() {
  const [activeModule, setActiveModule] = useState(
    'techos-continuos'
  );

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

  const [showValidationMock, setShowValidationMock] =
    useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F5F7FA]">

      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />

      <div className="flex-1 flex flex-col">

        {activeModule === 'techos-continuos' && (
          <>
            <Header />

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1 w-full grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

              <div className="xl:col-span-4 space-y-6 no-print">
                <CeilingForm
                  inputs={inputs}
                  onChange={setInputs}
                  showValidationMock={showValidationMock}
                  setShowValidationMock={setShowValidationMock}
                />
              </div>

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

            <footer className="bg-white border-t border-slate-200 py-6 mt-12 no-print">
              <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 gap-4">
                <p>
                  © {new Date().getFullYear()} La Especialista.
                  Todos los derechos reservados.
                  Creado por <strong>Paco Butrón</strong>.
                </p>

                <a
                  href="https://laespecialista.es"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-600 font-medium"
                >
                  laespecialista.es
                </a>
              </div>
            </footer>
          </>
        )}

        {activeModule === 'techos-registrables' && (
          <ComingSoon title="Techos Registrables" />
        )}

        {activeModule === 'tabiques' && (
          <ComingSoon title="Tabiques" />
        )}

        {activeModule === 'trasdosados' && (
          <ComingSoon title="Trasdosados" />
        )}

      </div>
    </div>
  );
}
