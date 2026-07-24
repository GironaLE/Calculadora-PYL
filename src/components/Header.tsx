/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const LaEspecialistaLogo = () => (
  <div className="flex items-center select-none">
    <svg 
      viewBox="0 0 275 50" 
      className="h-10 md:h-12 w-auto shrink-0" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. Stacked Diamonds Icon (Left) */}
      {/* Pink/Red Diamond (Bottom) */}
      <g transform="translate(25, 31) rotate(45)">
        <rect x="-10" y="-10" width="20" height="20" rx="1.5" fill="#fca5a5" />
      </g>
      {/* Green Diamond (Middle) */}
      <g transform="translate(25, 24) rotate(45)">
        <rect x="-10" y="-10" width="20" height="20" rx="1.5" fill="#86efac" />
      </g>
      {/* Gray Diamond (Top) */}
      <g transform="translate(25, 17) rotate(45)">
        <rect x="-10" y="-10" width="20" height="20" rx="1.5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
      </g>
      {/* "LA" text inside Top Gray Diamond */}
      <text 
        x="25" 
        y="20.5" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="700" 
        fontSize="9" 
        fill="#23a3dd" 
        textAnchor="middle"
      >
        LA
      </text>

      {/* 2. Brand Text "LA ESPECIALISTA" */}
      {/* "LA" */}
      <text 
        x="55" 
        y="31" 
        fill="#23a3dd" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="600" 
        fontSize="20" 
        letterSpacing="0.05em"
      >
        LA
      </text>

      {/* First "E" (Three parallel horizontal lines) */}
      <g fill="#23a3dd">
        <rect x="87" y="15.5" width="11.5" height="1.8" rx="0.3" />
        <rect x="87" y="22.1" width="11.5" height="1.8" rx="0.3" />
        <rect x="87" y="28.7" width="11.5" height="1.8" rx="0.3" />
      </g>

      {/* "SP" */}
      <text 
        x="106" 
        y="31" 
        fill="#23a3dd" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="600" 
        fontSize="20" 
        letterSpacing="0.05em"
      >
        SP
      </text>

      {/* Second "E" (Three parallel horizontal lines) */}
      <g fill="#23a3dd">
        <rect x="136" y="15.5" width="11.5" height="1.8" rx="0.3" />
        <rect x="136" y="22.1" width="11.5" height="1.8" rx="0.3" />
        <rect x="136" y="28.7" width="11.5" height="1.8" rx="0.3" />
      </g>

      {/* "CIALISTA" */}
      <text 
        x="155" 
        y="31" 
        fill="#23a3dd" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="600" 
        fontSize="20" 
        letterSpacing="0.05em"
      >
        CIALISTA
      </text>

      {/* Registered Trademark Symbol ® */}
      <text 
        x="254" 
        y="18" 
        fill="#23a3dd" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="600" 
        fontSize="7"
      >
        ®
      </text>
    </svg>
  </div>
);

const LaEspecialistaLogo = () => (
  {logo}
);
export default function Header() {
  return (
    <header className="bg-white h-[70px] border-b border-slate-200 sticky top-0 z-50 px-6 shadow-xs flex items-center justify-between no-print font-sans">
      {/* Left: Brand Logo */}
      <LaEspecialistaLogo />

      {/* Center: Title (Responsive, hidden on extra small screens) */}
      <div className="text-right sm:text-center hidden sm:block">
        <h1 className="font-display font-extrabold text-sm md:text-base text-slate-900 tracking-tight">
          Calculadora de Techos Continuos PYL
        </h1>
        <p className="text-[9px] text-slate-400 font-mono tracking-normal">
          Módulo Técnico: Estructura Cruzada F47
        </p>
      </div>

      {/* Right: Empty spacer to balance layout */}
      <div className="hidden sm:block w-[180px]" />
    </header>
  );
}
