/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CeilingInputs } from '../types';
import { CalculationResult } from '../engine/calculator';

export function generateProfessionalPDF(inputs: CeilingInputs, result: CalculationResult) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getMat = (name: string) => {
    return result.materiales.find(m => m.nombre === name) || {
      cantidadReal: 0,
      unidad: '',
      formatoComercial: '',
      unidadesComerciales: 0
    };
  };

  const placa = getMat('Placa PYL');
  const maestra = getMat('Maestra');
  const clip = getMat('Perfil Perimetral');
  const tornillo = getMat('Tornillo TN 25');
  const horquilla = getMat('Horquilla / Penjant');
  const varilla = getMat('Varilla 1 m');
  const conector = getMat('Conector de Maestra');
  const caballete = getMat('Caballete');
  const pasta = getMat('Pasta de juntas');
  const cinta = getMat('Cinta');

  // --- PAGINA 1: FICHA TÉCNICA ---
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.rect(5, 5, 200, 287); // Borde exterior

  // Logo temporal vectorizado
  doc.setFillColor(37, 99, 235); // Azul KnCompute
  doc.rect(12, 12, 14, 14, 'F');
  doc.setFillColor(15, 23, 42); // Gris oscuro
  doc.rect(19, 19, 7, 7, 'F');

  // Títulos
  doc.setTextColor(15, 23, 42);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Calculadora de Techos Continuos PYL', 32, 18);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Ficha Técnica de Cómputo Métrico Homologada', 32, 23);

  // Línea divisoria
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(12, 30, 198, 30);

  // Metadatos
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Fecha del cálculo: ${currentDate}`, 12, 36);
  doc.text('Versión de la app: v1.5.0 (Estable)', 12, 40);
  doc.text('Sistema de cálculo: Basado en Hoja Excel Oficial', 120, 36);
  doc.text('Garantía: Certificación Knauf System', 120, 40);

  // Parámetros introducidos
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text('DATOS INTRODUCIDOS', 12, 48);

  const datosIntroducidos = [
    ['Largo del techo', inputs.calculoPorM2 ? 'N/A' : `${inputs.largo} m`, 'Separación F47 superior', `${inputs.separacionMaestraSuperior} mm`],
    ['Ancho del techo', inputs.calculoPorM2 ? 'N/A' : `${inputs.ancho} m`, 'Separación F47 inferior', '500 mm (Fijo)'],
    ['Longitud comercial F47', '3.00 m', 'Longitud Perfil Clip', '3.00 m'],
    ['Tipo de placa', inputs.medidaPlaca, 'Desperdicio aplicado', inputs.desperdicio ? 'Sí (+5%)' : 'No (0%)']
  ];

  (doc as any).autoTable({
    startY: 51,
    margin: { left: 12, right: 12 },
    body: datosIntroducidos,
    theme: 'plain',
    styles: { fontSize: 8.5, cellPadding: 1.5, textColor: [51, 65, 85] },
    columnStyles: {
      0: { fontStyle: 'bold', width: 45 },
      1: { width: 40 },
      2: { fontStyle: 'bold', width: 50 },
      3: { width: 45 }
    }
  });

  let currentY = (doc as any).lastAutoTable.finalY + 6;

  // Resumen Estructural
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text('RESUMEN DE DIMENSIONES', 12, currentY);

  const resumenDatos = [
    ['Superficie total', `${result.superficie.toLocaleString('es-ES')} m²`, 'Perímetro del techo', `${result.perimetro.toLocaleString('es-ES')} m`],
    ['Coeficiente de perfiles', 'Fijos por m²', 'Método de cálculo', inputs.calculoPorM2 ? 'Metros cuadrados directos' : 'Dimensiones geométricas']
  ];

  (doc as any).autoTable({
    startY: currentY + 3,
    margin: { left: 12, right: 12 },
    body: resumenDatos,
    theme: 'striped',
    styles: { fontSize: 8.5, cellPadding: 2, textColor: [51, 65, 85] },
    columnStyles: {
      0: { fontStyle: 'bold', width: 45 },
      1: { width: 40 },
      2: { fontStyle: 'bold', width: 50 },
      3: { width: 45 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 6;

  // Tabla de materiales técnica
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text('TABLA DE MATERIALES REQUERIDOS', 12, currentY);

  const materialsRows = result.materiales.map(m => [
    m.nombre,
    m.cantidadReal.toLocaleString('es-ES'),
    m.unidad,
    m.formatoComercial,
    m.unidadesComerciales.toLocaleString('es-ES')
  ]);

  (doc as any).autoTable({
    startY: currentY + 3,
    margin: { left: 12, right: 12 },
    head: [['Material', 'Cantidad', 'Unidad', 'Formato Comercial', 'Unidades Necesarias']],
    body: materialsRows,
    theme: 'grid',
    headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 2, textColor: [30, 41, 59] },
    columnStyles: {
      0: { fontStyle: 'bold', width: 65 },
      1: { hAlign: 'center', width: 20 },
      2: { hAlign: 'center', width: 15 },
      3: { width: 55 },
      4: { hAlign: 'right', fontStyle: 'bold', textColor: [37, 99, 235], width: 25 }
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 6;

  // Observaciones
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('OBSERVACIONES GENERALES', 12, currentY);

  const obs = [
    '- Los materiales han sido calculados aplicando coeficientes fijos según la hoja de cálculo Excel oficial.',
    inputs.desperdicio ? '- Se ha incrementado un 5% de desperdicio a todos los materiales antes de realizar los redondeos.' : '- No se ha aplicado margen de desperdicio sobre los coeficientes base.',
    '- Asegurar que los perfiles y accesorios cumplan con la normativa CE y las directrices de instalación Knauf.',
    '- Mantener una fijación firme en varillas de soporte para prevenir flechas o deformaciones de la placa.'
  ];

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  let textY = currentY + 4;
  obs.forEach(line => {
    doc.text(line, 12, textY);
    textY += 4;
  });

  // Pie de página
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Página 1 de 2  |  Calculadora Techos PYL Profesional  |  v1.5.0', 12, 285);


  // --- PAGINA 2: LISTA DE COMPRA (COMERCIAL) ---
  doc.addPage();

  doc.setDrawColor(226, 232, 240);
  doc.rect(5, 5, 200, 287);

  // Logo verde para sección comercial
  doc.setFillColor(16, 185, 129); // Emerald-500
  doc.rect(12, 12, 14, 14, 'F');
  doc.setFillColor(15, 23, 42);
  doc.rect(19, 19, 7, 7, 'F');

  doc.setTextColor(15, 23, 42);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Lista de Compra Oficial (Almacén)', 32, 18);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Preparación y Despacho Rápido de Pedidos Comerciales', 32, 23);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(12, 30, 198, 30);

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(`Fecha Emisión: ${currentDate}`, 12, 36);
  doc.text('Uso exclusivo: Personal de Ventas / Preparación de Pedidos', 12, 40);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const introText = 'Este informe resume la lista de compra exacta y los formatos que se deben cargar en almacén, garantizando la total correspondencia con los coeficientes autorizados de obra sin mermas de stock.';
  const lines = doc.splitTextToSize(introText, 176);
  doc.text(lines, 12, 48);

  // Tabla comercial
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(30, 41, 59);
  doc.text('LISTADO DE MATERIALES A PREPARAR', 12, 60);

  const shoppingRows = result.materiales.map(m => {
    let cantComercial = `${m.unidadesComerciales}`;
    let tipoUnidad = 'Unidades';
    if (m.formatoComercial.includes('Barra')) tipoUnidad = 'Barras';
    if (m.formatoComercial.includes('Caja')) {
      tipoUnidad = 'Cajas';
    }
    if (m.formatoComercial.includes('Saco')) tipoUnidad = 'Sacos';
    if (m.formatoComercial.includes('Rollo')) tipoUnidad = 'Rollos';
    if (m.nombre.includes('Placa')) tipoUnidad = 'Placas';

    return [
      m.nombre,
      m.formatoComercial,
      cantComercial,
      tipoUnidad
    ];
  });

  (doc as any).autoTable({
    startY: 64,
    margin: { left: 12, right: 12 },
    head: [['Material / Componente', 'Formato Comercial', 'Cantidad a Preparar', 'Tipo Unidad']],
    body: shoppingRows,
    theme: 'grid',
    headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 8.5, cellPadding: 2.5, textColor: [30, 41, 59] },
    columnStyles: {
      0: { fontStyle: 'bold', width: 75 },
      1: { width: 50 },
      2: { hAlign: 'right', fontStyle: 'bold', textColor: [5, 150, 105], width: 30 },
      3: { hAlign: 'center', width: 25 }
    }
  });

  let page2Y = (doc as any).lastAutoTable.finalY + 8;

  // Garantía comercial
  doc.setDrawColor(241, 245, 249);
  doc.setFillColor(248, 250, 252);
  doc.rect(12, page2Y, 176, 22, 'F');
  
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('RECOMENDACIÓN COMERCIAL', 16, page2Y + 6);
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Asegurar que las marcas de placas, pastas de juntas y perfiles correspondan al mismo sistema continuo', 16, page2Y + 11);
  doc.text('para garantizar la validez del aislamiento térmico y acústico certificado.', 16, page2Y + 15);

  // Firmas
  const sigY = page2Y + 34;
  doc.setDrawColor(203, 213, 225);
  doc.line(20, sigY, 80, sigY);
  doc.line(120, sigY, 180, sigY);

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Firma Encargado Almacén', 35, sigY + 4);
  doc.text('Firma Conformidad Cliente', 135, sigY + 4);

  // Pie de página 2
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Página 2 de 2  |  Lista de Compra Optimizada  |  https://laespecialista.es', 12, 285);

  // Guardar archivo
  const fileLabel = inputs.calculoPorM2 ? `${inputs.superficieM2}m2` : `${inputs.largo}x${inputs.ancho}m`;
  doc.save(`Presupuesto_PYL_F47_${fileLabel}.pdf`);
}
