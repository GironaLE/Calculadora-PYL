/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function CeilingDiagram() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-inner relative overflow-hidden">
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
            ESQUEMA TÉCNICO INTERACTIVO
          </span>
          <h4 className="font-display font-bold text-sm text-white">
            Sistema de Perfilería Cruzada Techo F47
          </h4>
        </div>
        <span className="text-[10px] bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded border border-slate-700">
          Isometric Blueprint V1.0
        </span>
      </div>

      <div className="w-full h-48 flex items-center justify-center relative">
        <svg 
          viewBox="0 0 500 240" 
          className="w-full h-full text-slate-300 drop-shadow-md select-none"
          fill="none" 
          stroke="currentColor" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Legend / Background grid */}
          <g strokeWidth="0.5" stroke="#334155" strokeDasharray="3,3">
            <line x1="30" y1="200" x2="470" y2="200" />
            <line x1="30" y1="20" x2="30" y2="220" />
          </g>

          {/* Isometric assembly lines */}
          
          {/* Placas (Bottom Layer) */}
          <path 
            d="M 50,180 L 250,220 L 450,180 L 250,140 Z" 
            fill="#1e293b" 
            fillOpacity="0.8" 
            stroke="#475569" 
            strokeWidth="1.5"
          />
          {/* Label for gypsum board */}
          <text x="250" y="205" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle" className="font-mono">
            🧱 Placas de Yeso Laminado (PYL)
          </text>

          {/* Maestra Inferior Profiles (Longitudinal - F47 Inferior) */}
          {/* Line 1 */}
          <path d="M 100,165 L 220,189 M 220,189 L 400,153" stroke="#cbd5e1" strokeWidth="3" />
          {/* Line 2 */}
          <path d="M 150,155 L 250,175 M 250,175 L 350,155" stroke="#cbd5e1" strokeWidth="3" />

          {/* Maestra Superior Profiles (Transversal - F47 Superior) */}
          {/* Line A */}
          <path d="M 90,145 L 290,185" stroke="#64748b" strokeWidth="3.5" />
          {/* Line B */}
          <path d="M 210,121 L 410,161" stroke="#64748b" strokeWidth="3.5" />

          {/* Suspensions (Varillas roscadas & Horquillas) */}
          {/* Suspension A1 */}
          <g>
            {/* Varilla */}
            <line x1="140" y1="155" x2="140" y2="70" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="1,2" />
            {/* Hanger / Horquilla */}
            <rect x="135" y="145" width="10" height="12" rx="1" fill="#059669" stroke="#34d399" strokeWidth="1" />
            {/* Anclaje techo */}
            <circle cx="140" cy="70" r="3" fill="#34d399" />
          </g>
          {/* Suspension B1 */}
          <g>
            {/* Varilla */}
            <line x1="260" y1="131" x2="260" y2="50" stroke="#a7f3d0" strokeWidth="1.5" strokeDasharray="1,2" />
            {/* Hanger / Horquilla */}
            <rect x="255" y="121" width="10" height="12" rx="1" fill="#059669" stroke="#34d399" strokeWidth="1" />
            {/* Anclaje techo */}
            <circle cx="260" cy="50" r="3" fill="#34d399" />
          </g>

          {/* Caballetes / Clip Connectors (Where F47 superior crosses F47 inferior) */}
          {/* Connector intersection 1 */}
          <g>
            <rect x="185" y="158" width="12" height="12" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="191" cy="164" r="2" fill="#e0f2fe" />
          </g>
          {/* Connector intersection 2 */}
          <g>
            <rect x="305" y="134" width="12" height="12" rx="2" fill="#0369a1" stroke="#38bdf8" strokeWidth="1" />
            <circle cx="311" cy="140" r="2" fill="#e0f2fe" />
          </g>

          {/* Annotations & Callouts */}
          {/* Point 1: Varilla */}
          <path d="M 140,95 L 80,95" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2,2" />
          <text x="75" y="98" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="end" className="font-mono">
            📌 Varilla Susp.
          </text>

          {/* Point 2: Horquilla */}
          <path d="M 260,126 L 310,105" stroke="#10b981" strokeWidth="0.8" strokeDasharray="2,2" />
          <text x="315" y="108" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="start" className="font-mono">
            🔧 Horquilla F47
          </text>

          {/* Point 3: Caballete / Clip */}
          <path d="M 191,164 L 140,200" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2,2" />
          <text x="135" y="203" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="end" className="font-mono">
            📐 Perfil Clip / Caballete
          </text>

          {/* Point 4: Maestra Superior */}
          <path d="M 290,185 L 340,210" stroke="#94a3b8" strokeWidth="0.8" strokeDasharray="2,2" />
          <text x="345" y="213" fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="start" className="font-mono">
            📏 Perfil F47 Superior
          </text>
        </svg>
      </div>

      {/* Assembly features label cards overlay */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] text-slate-400 font-mono">Maestra Sup.</span>
          <span className="text-xs text-white font-sans font-bold">Paso 800 mm</span>
        </div>
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] text-slate-400 font-mono">Maestra Inf.</span>
          <span className="text-xs text-white font-sans font-bold">Paso 500 mm</span>
        </div>
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] text-slate-400 font-mono">Estructura</span>
          <span className="text-xs text-emerald-400 font-sans font-bold">PYL Continuo</span>
        </div>
        <div className="bg-slate-950/60 p-2 rounded border border-slate-800 flex flex-col justify-center items-center text-center">
          <span className="text-[10px] text-slate-400 font-mono">Perfiles</span>
          <span className="text-xs text-sky-400 font-sans font-bold">Cruzado F47</span>
        </div>
      </div>
    </div>
  );
}
