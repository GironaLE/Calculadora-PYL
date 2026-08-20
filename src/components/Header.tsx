/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const LaEspecialistaLogo = () => (
  {logo}
);
export default function Header() {
  return (
  <header className="bg-white h-[70px] border-b border-slate-200 sticky top-0 z-50 px-6 flex items-center justify-center no-print font-sans">
{/* Left: Spacer */}
<div className="hidden sm:block w-[180px]" />

      {/* Center: Title (Responsive, hidden on extra small screens) */}
      <div className="text-right sm:text-center hidden sm:block">
        <h1 className="font-display font-extrabold text-sm md:text-base text-slate-900 tracking-tight">
          Calculadora de Techos Continuos PYL
        </h1>
      </div>

      {/* Right: Empty spacer to balance layout */}
      <div className="hidden sm:block w-[180px]" />
    </header>
  );
}
