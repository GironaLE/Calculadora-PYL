/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppState } from '../types';
import { FileText, Sliders, Play, AlertCircle, Sparkles } from 'lucide-react';

interface StateSwitcherProps {
  currentState: AppState;
  onStateChange: (state: AppState) => void;
}

export default function StateSwitcher({ currentState, onStateChange }: StateSwitcherProps) {
  const states: { value: AppState; label: string; desc: string; icon: any; color: string }[] = [
    { 
      value: 'results', 
      label: 'Resultados Activos', 
      desc: 'Formulario relleno con cálculo activo de la estructura.',
      icon: Play,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-200' 
    },
    { 
      value: 'no_data', 
      label: 'Sin datos', 
      desc: 'Estado inicial vacío. Esperando medidas de largo y ancho.',
      icon: FileText,
      color: 'text-slate-500 bg-slate-50 border-slate-200' 
    },
    { 
      value: 'calculating', 
      label: 'Calculando...', 
      desc: 'Simulación de carga y procesamiento de la modulación.',
      icon: Sparkles,
      color: 'text-blue-500 bg-blue-50 border-blue-200' 
    },
    { 
      value: 'error', 
      label: 'Estado de Error', 
      desc: 'Aviso de fallo al superar límites de carga admisibles.',
      icon: AlertCircle,
      color: 'text-rose-500 bg-rose-50 border-rose-200' 
    }
  ];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-xl font-sans no-print">
      <div className="flex items-center space-x-2.5 mb-3">
        <div className="bg-blue-600/20 p-1.5 rounded-lg text-blue-400">
          <Sliders className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Fase 2: Selector de Estados UI
          </h4>
          <p className="text-[10px] text-slate-500">Pruebe las transiciones de estados visuales solicitados en el prompt</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {states.map((st) => {
          const Icon = st.icon;
          const isActive = currentState === st.value;
          return (
            <button
              key={st.value}
              onClick={() => onStateChange(st.value)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 flex items-start space-x-2.5 ${
                isActive
                  ? 'bg-slate-800 border-blue-500 shadow-md shadow-blue-500/5 text-white'
                  : 'bg-slate-950/40 border-slate-850 hover:bg-slate-850 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-500'}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-extrabold block">{st.label}</span>
                <span className="text-[10px] text-slate-500 block leading-normal">{st.desc}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
