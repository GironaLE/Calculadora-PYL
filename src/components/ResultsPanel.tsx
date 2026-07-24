/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CeilingInputs, AppState } from '../types';
import { CalculationResult } from '../engine/calculator';
import { generateProfessionalPDF } from '../utils/pdfGenerator';
import { 
  Layers, Ruler, Compass, Hammer, Wrench, Pin, Link, 
  Printer, Download, Share2, RotateCcw, 
  AlertTriangle, FileText, CheckCircle2, Bookmark, Droplet, 
  Sparkles, AlertCircle, ChevronDown, ChevronUp, ShoppingBag
} from 'lucide-react';

interface ResultsPanelProps {
  inputs: CeilingInputs;
  appState: AppState;
  result: CalculationResult | null;
  error: string | null;
  onReset: () => void;
}

export default function ResultsPanel({ 
  inputs, 
  appState,
  result,
  error,
  onReset 
}: ResultsPanelProps) {

  const [copied, setCopied] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<'tecnico' | 'compra'>('tecnico');

  const area = result?.superficie || 0;
  const perimetro = result?.perimetro || 0;

  // Map icon strings to Lucide icon components based on material name
  const getMaterialIcon = (name: string) => {
    switch (name) {
      case 'Placa PYL':
        return <Layers className="w-4 h-4 text-blue-600" />;
      case 'Maestra F47':
        return <Ruler className="w-4 h-4 text-slate-500" />;
      case 'Perfil Clip':
        return <Compass className="w-4 h-4 text-indigo-500" />;
      case 'Tornillo TN 25':
        return <Wrench className="w-4 h-4 text-gray-500" />;
      case 'Horquilla / Penjant':
        return <Wrench className="w-4 h-4 text-cyan-600" />;
      case 'Fijaciones':
        return <Hammer className="w-4 h-4 text-emerald-600" />;
      case 'Varilla 1 m':
        return <Pin className="w-4 h-4 text-amber-500" style={{ transform: 'rotate(45deg)' }} />;
      case 'Conector de Maestra':
        return <Link className="w-4 h-4 text-sky-500" />;
      case 'Caballete F47':
        return <Hammer className="w-4 h-4 text-emerald-600" />;
      case 'Pasta de juntas':
        return <Droplet className="w-4 h-4 text-teal-500" />;
      case 'Cinta':
        return <Bookmark className="w-4 h-4 text-violet-500" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleCopyResults = () => {
    if (!result) return;
    
    let textToCopy = `CÁLCULO DE TECHOS CONTINUOS PYL F47\n\n`;
    textToCopy += `Superficie: ${area.toLocaleString('es-ES')} m²\n`;
    textToCopy += `Perímetro: ${perimetro.toLocaleString('es-ES')} m\n`;
    textToCopy += `Desperdicio: ${inputs.desperdicio ? '5%' : '0%'}\n`;
    textToCopy += `----------------------------------------\n\n`;
    textToCopy += `MATERIALES REQUERIDOS (ORDEN EXCEL):\n\n`;

    result.materiales.forEach((m, idx) => {
      textToCopy += `${idx + 1}. ${m.nombre}\n`;
      textToCopy += `   Cantidad real: ${m.cantidadReal} ${m.unidad}\n`;
      textToCopy += `   Formato comercial: ${m.formatoComercial}\n`;
      textToCopy += `   Unidades comerciales: ${m.unidadesComerciales}\n\n`;
    });

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = () => {
    if (!result) return;
    generateProfessionalPDF(inputs, result);
  };

  // State specific overlays
  if (appState === 'no_data') {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center h-full flex flex-col items-center justify-center space-y-4 py-16">
        <div className="w-16 h-16 bg-slate-50 border border-slate-100 text-slate-400 rounded-full flex items-center justify-center shadow-inner animate-pulse">
          <FileText className="w-7 h-7" />
        </div>
        <div className="space-y-1.5 max-w-md">
          <h3 className="font-display font-extrabold text-slate-900 text-base">Introduzca las dimensiones del techo</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Por favor, ingrese el largo y ancho de su techo en el panel izquierdo para generar el listado detallado de perfiles, placas y accesorios según los coeficientes autorizados de la hoja Excel.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-[11px] text-slate-500 max-w-sm leading-normal">
          💡 <strong>Tip Técnico:</strong> Knauf aconseja añadir un 5% de desperdicio para superficies irregulares o con encuentros de pared complejos.
        </div>
      </div>
    );
  }

  if (appState === 'calculating') {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center h-full flex flex-col items-center justify-center space-y-4 py-20">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-blue-600">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="font-display font-extrabold text-slate-900 text-base">Procesando Coeficientes Excel</h3>
          <p className="text-xs text-slate-500">
            Optimizando cálculo exacto de placas, barras F47, anclajes y accesorios...
          </p>
        </div>
      </div>
    );
  }

  if (appState === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center h-full flex flex-col items-center justify-center space-y-5 py-16">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-md">
          <h3 className="font-display font-extrabold text-red-950 text-lg">Error de Dimensionamiento</h3>
          <p className="text-sm text-red-800 leading-relaxed font-medium">
            {error || 'Las dimensiones introducidas superan la modulación de carga permitida para perfiles cruzados F47 estándar de espesor 0.6 mm.'}
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onReset}
            className="text-xs font-bold bg-red-950 hover:bg-red-900 text-white px-5 py-2.5 rounded-xl transition-all shadow-md shadow-red-200"
          >
            Restaurar Valores por Defecto
          </button>
        </div>
      </div>
    );
  }

  const getMatQtyReal = (name: string) => {
    return result?.materiales.find(m => m.nombre === name)?.cantidadReal || 0;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* 2. Tabla de materiales */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-slate-50/30">
          <div>
            <h3 className="font-display font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-blue-600" />
              Ficha Técnica Oficial
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Cantidades reales exactas calculadas con el coeficiente de dosificación de obra
            </p>
          </div>
          <span className="text-[10px] self-start sm:self-auto px-2.5 py-1 rounded-full font-bold border bg-blue-50 border-blue-200 text-blue-700">
            Coeficientes Excel Activos
          </span>
        </div>

        {/* Table rendering based on tab */}
        <div className="overflow-x-auto no-print">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                <th className="py-3 px-4 sm:px-6">Material (Orden Excel)</th>
                <th className="py-3 px-4 text-center">Cant. Real</th>
                <th className="py-3 px-4 text-center">Unidad</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">Formato Comercial</th>
                <th className="py-3 px-4 text-right">Cantidad de Compra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-xs">
              {result?.materiales.map((row, idx) => {
                const isTechnical = activeTab === 'tecnico';
                const showDecimal = row.unidad === 'ml' || row.unidad === 'kg' || row.unidad === 'm²';

                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 sm:px-6 flex items-center space-x-2.5 min-w-[200px]">
                      <span className="text-slate-400 font-mono text-[10px] w-4">{idx + 1}.</span>
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs">
                        {getMaterialIcon(row.nombre)}
                      </div>
                      <span className="font-semibold text-slate-800">{row.nombre}</span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">
                      {showDecimal 
                        ? row.cantidadReal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
                        : Math.round(row.cantidadReal).toLocaleString('es-ES')
                      }
                    </td>
                    <td className="py-3 px-4 text-center text-slate-500 font-medium">
                      {row.unidad}
                    </td>
                    <td className="py-3 px-4 text-left text-slate-500 hidden sm:table-cell font-mono text-[11px]">
                      {row.formatoComercial}
                    </td>
                    <td className={`py-3 px-4 text-right font-mono font-extrabold ${isTechnical ? 'text-blue-600 bg-blue-50/5' : 'text-emerald-600 bg-emerald-50/5'}`}>
                      {row.unidadesComerciales.toLocaleString('es-ES')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Expandable Step-by-Step Details */}
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 no-print">
          <button 
            onClick={() => setShowDetail(!showDetail)}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer shadow-xs"
          >
            <span>{showDetail ? 'Ocultar Desglose Matemático' : '🔍 Ver detalle matemático paso a paso (Excel)'}</span>
            {showDetail ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <AnimatePresence>
            {showDetail && result && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-inner text-slate-600 font-mono text-xs leading-relaxed"
              >
                <h4 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wider font-display">
                  Fórmulas Matemáticas de la Ficha Excel:
                </h4>

                <div className="space-y-3 divide-y divide-slate-100">
                  <div className="pt-2">
                    <span className="text-blue-600 font-bold block mb-1">📐 Geometría de Entrada</span>
                    {inputs.calculoPorM2 ? (
                      <div>Superficie introducida directamente: <span className="text-slate-900 font-bold">{area} m²</span></div>
                    ) : (
                      <div>Superficie útil = Largo ({inputs.largo}m) × Ancho ({inputs.ancho}m) = <span className="text-slate-900 font-bold">{area} m²</span></div>
                    )}
                    <div>Perímetro = {inputs.calculoPorM2 ? `Estimación teórica 4 × √${inputs.superficieM2}` : `(Largo + Ancho) × 2`} = <span className="text-slate-900 font-bold">{perimetro} m</span></div>
                  </div>

                  <div className="pt-3">
                    <span className="text-blue-600 font-bold block mb-1">📦 Coeficiente y Margen de Desperdicio (+5% si está activo)</span>
                    <div>Margen aplicado actualmente: <span className="text-slate-900 font-bold">{inputs.desperdicio ? '1.05 (+5%)' : '1.00 (Sin desperdicio)'}</span></div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Fórmula general: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">Cantidad Real = Superficie × Coeficiente × FactorDesperdicio</code>
                    </div>
                  </div>

                  <div className="pt-3">
                    <span className="text-blue-600 font-bold block mb-1">🧮 Detalle de Multiplicaciones Directas</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      <div>• Placa PYL: <span className="text-slate-900 font-bold">{area}</span> × 1.00 = {getMatQtyReal('Placa PYL')} m²</div>
                      <div>• Maestra F47: <span className="text-slate-900 font-bold">{area}</span> × 3.20 = {getMatQtyReal('Maestra F47')} ml</div>
                      <div>• Perfil Clip: <span className="text-slate-900 font-bold">{area}</span> × 0.40 = {getMatQtyReal('Perfil Clip')} ml</div>
                      <div>• Tornillo TN 25: <span className="text-slate-900 font-bold">{area}</span> × 17 = {getMatQtyReal('Tornillo TN 25')} uds</div>
                      <div>• Horquilla / Penjant: <span className="text-slate-900 font-bold">{area}</span> × 1.30 = {getMatQtyReal('Horquilla / Penjant')} uds</div>
                      <div>• Fijaciones: <span className="text-slate-900 font-bold">{area}</span> × 1.30 = {getMatQtyReal('Fijaciones')} uds</div>
                      <div>• Varilla 1 m: <span className="text-slate-900 font-bold">{area}</span> × 1.30 = {getMatQtyReal('Varilla 1 m')} uds</div>
                      <div>• Conector de Maestra: <span className="text-slate-900 font-bold">{area}</span> × 0.60 = {getMatQtyReal('Conector de Maestra')} uds</div>
                      <div>• Caballete F47: <span className="text-slate-900 font-bold">{area}</span> × 2.30 = {getMatQtyReal('Caballete F47')} uds</div>
                      <div>• Pasta de juntas: <span className="text-slate-900 font-bold">{area}</span> × 0.40 = {getMatQtyReal('Pasta de juntas')} kg</div>
                      <div>• Cinta: <span className="text-slate-900 font-bold">{area}</span> × 1.20 = {getMatQtyReal('Cinta')} ml</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>



      {/* 5. Horizontal buttons bar under results */}
      <div className="flex flex-col md:flex-row items-center gap-3 w-full md:justify-end no-print pt-2">
        <button 
          onClick={handleCopyResults}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-100"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copied ? '¡Copiado!' : 'Copiar resultados'}</span>
        </button>
      </div>

      {/* 6. Exclusive Print Layout */}
      <div className="hidden print:block print-only space-y-8 p-4 font-sans text-black">
        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold font-display uppercase tracking-wider">Calculadora de Techos Continuos PYL</h1>
            <p className="text-xs text-slate-500">Ficha Técnica e Informe de Compra Oficial (Almacén)</p>
          </div>
          <div className="text-right text-xs">
            <p className="font-bold">FECHA DEL CÁLCULO</p>
            <p>{new Date().toLocaleDateString('es-ES')}</p>
          </div>
        </div>

        {/* Resumen */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold border-b border-slate-300 pb-1 uppercase">1. Parámetros e Ingeniería</h2>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div><strong>Superficie útil total:</strong> {area.toLocaleString('es-ES')} m²</div>
            <div><strong>Perímetro total:</strong> {perimetro.toLocaleString('es-ES')} m</div>
            <div><strong>Tipo de placa:</strong> {inputs.medidaPlaca}</div>
            <div><strong>Desperdicio aplicado:</strong> {inputs.desperdicio ? 'Sí (+5%)' : 'No (0%)'}</div>
          </div>
        </div>

        {/* Technical List table */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold border-b border-slate-300 pb-1 uppercase">2. Ficha Técnica de Cómputos Métricos</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-100 font-bold text-left">
                <th className="p-2">Material / Componente</th>
                <th className="p-2 text-center">Cantidad Real</th>
                <th className="p-2 text-center">Unidad</th>
                <th className="p-2">Formato Comercial</th>
                <th className="p-2 text-right">Unidades necesarias</th>
              </tr>
            </thead>
            <tbody>
              {result?.materiales.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-200">
                  <td className="p-2"><strong>{idx + 1}. {row.nombre}</strong></td>
                  <td className="p-2 text-center">{row.cantidadReal.toLocaleString('es-ES')}</td>
                  <td className="p-2 text-center">{row.unidad}</td>
                  <td className="p-2">{row.formatoComercial}</td>
                  <td className="p-2 text-right font-bold text-blue-600">{row.unidadesComerciales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-8 text-center text-[10px] text-slate-400 border-t border-slate-200">
          <p>Calculadora de Techos Continuos PYL F47 | Versión 1.5.0 (Producción) | Soportado por KnCompute Systems S.A.</p>
        </div>
      </div>
    </motion.div>
  );
}
