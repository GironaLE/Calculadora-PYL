/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CeilingInputs 
} from '../types';
import React from 'react';

interface CeilingFormProps {
  inputs: CeilingInputs;
  onChange: (inputs: CeilingInputs) => void;
  showValidationMock: boolean;
  setShowValidationMock: (show: boolean) => void;
}

export default function CeilingForm({ 
  inputs, 
  onChange, 
  showValidationMock, 
  setShowValidationMock 
}: CeilingFormProps) {

  const handleInputChange = (field: keyof CeilingInputs, value: any) => {
    onChange({
      ...inputs,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6 font-sans">
      <h2 className="text-2xl font-bold mb-4">
  Datos del techo
</h2>

      <div className="space-y-5">
        {/* Selector de método de entrada */}
        <div>
          <label className="block mb-2 font-medium">
  Método de cálculo
</label>
          <select
            value={inputs.calculoPorM2 ? 'm2' : 'dims'}
            onChange={(e) => {
              const isM2 = e.target.value === 'm2';
              onChange({
                ...inputs,
                calculoPorM2: isM2,
                superficieM2: inputs.superficieM2 || (inputs.largo * inputs.ancho) || 24
              });
            }}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="dims">📐 Por Largo y Ancho (Dimensiones)</option>
            <option value="m2">🧱 Por Metros Cuadrados (m²)</option>
          </select>
        </div>

        {inputs.calculoPorM2 ? (
          /* Metros Cuadrados Field */
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                Superficie Total 
              </label>
            </div>
            
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={inputs.superficieM2 || ''}
                placeholder="24"
                onChange={(e) => handleInputChange('superficieM2', parseFloat(e.target.value) || 0)}
                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 transition-all ${
                  showValidationMock
                    ? 'border-emerald-500 bg-emerald-50/20 focus:ring-emerald-500/15 focus:border-emerald-500'
                    : 'border-slate-200 focus:ring-blue-500/15 focus:border-blue-500'
                }`}
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
                <span className="text-xs font-bold text-slate-400">m²</span>
              </div>
            </div>
          </div>
        ) : (
          /* Largo & Ancho Fields */
          <>
            {/* Largo Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Largo 
                </label>
                
              </div>
              
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={inputs.largo || ''}
                  placeholder="6"
                  onChange={(e) => handleInputChange('largo', parseFloat(e.target.value) || 0)}
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 transition-all ${
                    showValidationMock
                      ? 'border-emerald-500 bg-emerald-50/20 focus:ring-emerald-500/15 focus:border-emerald-500'
                      : 'border-slate-200 focus:ring-blue-500/15 focus:border-blue-500'
                  }`}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-400">m</span>
                </div>
              </div>
      
            </div>

            {/* Ancho Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Ancho 
                </label>
                
              </div>

              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={inputs.ancho || ''}
                  placeholder="4"
                  onChange={(e) => handleInputChange('ancho', parseFloat(e.target.value) || 0)}
                  className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 transition-all ${
                    showValidationMock
                      ? 'border-rose-500 bg-rose-50/20 focus:ring-rose-500/15 focus:border-rose-500'
                      : 'border-slate-200 focus:ring-blue-500/15 focus:border-blue-500'
                  }`}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-400">m</span>
                
                </div>
              </div>

              {showValidationMock ? (
                <p className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Valor incorrecto: Debe ser inferior a 15 metros para techos continuos sin junta de dilatación adicional
                </p>
              ) : (
                <p className="text-[10px] text-slate-400 mt-1">
                </p>
              )}
            </div>
          </>
        )}

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-slate-700">Separación Maestra Superior</span>
            <select
              value={inputs.separacionMaestraSuperior || 800}
              onChange={(e) => handleInputChange('separacionMaestraSuperior', parseInt(e.target.value))}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono font-bold text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              <option value="600">600 mm</option>
              <option value="700">700 mm</option>
              <option value="800">800 mm</option>
              <option value="900">900 mm</option>
              <option value="1000">1000 mm</option>
            </select>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
          </p>
        </div>

        {/* Medida de placa selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
            Medida de placa PYL (Ancho x Largo) 
          </label>
          <select
            value={inputs.medidaPlaca}
            onChange={(e) => handleInputChange('medidaPlaca', e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="2000 × 1200">2000 × 1200 mm (2.40 m²)</option>
            <option value="2500 × 1200">2500 × 1200 mm (3.00 m²)</option>
            <option value="2600 × 1200">2600 × 1200 mm (3.12 m²)</option>
            <option value="2700 × 1200">2700 × 1200 mm (3.24 m²)</option>
            <option value="2800 × 1200">2800 × 1200 mm (3.36 m²)</option>
            <option value="3000 × 1200">3000 × 1200 mm (3.60 m²)</option>
          </select>
          
          {showValidationMock && (
            <p className="text-[11px] text-blue-600 font-medium mt-1 flex items-center gap-1">
              <Info className="w-3 h-3" /> Campo obligatorio: Placa estándar con espesor aconsejado de 12.5mm / 15mm
            </p>
          )}
        </div>

        {/* Desperdicio Interruptor */}
        <div className="pt-2 border-t border-slate-100">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={inputs.desperdicio}
                onChange={(e) => handleInputChange('desperdicio', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                Merma 5 %
              </span>
              
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
