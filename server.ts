/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI on the server
let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI Chat will not work.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Route for AI Chat Assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, budgetItems } = req.body;
    
    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({ 
        error: 'El servicio de IA no está disponible porque falta la clave de API GEMINI_API_KEY.' 
      });
    }

    // Format budget context for the AI
    let budgetContext = "El usuario no tiene productos en su lista de compra actual.";
    if (budgetItems && budgetItems.length > 0) {
      budgetContext = "Lista de materiales actual en el presupuesto del usuario:\n" + 
        budgetItems.map((item: any) => `- ${item.name}: ${item.quantity} ${item.unit} (Categoría: ${item.sourceCategory})`).join('\n');
    }

    const systemInstruction = `Eres "Joan", el Asistente Técnico y experto de Ferretería Girona (también conocida como La Especialista). 
Tu misión es asesorar a clientes de la tienda (constructores, albañiles y aficionados del bricolaje/DIY) sobre cómo utilizar los materiales que han calculado para sus proyectos.

Contexto actual del presupuesto del cliente:
${budgetContext}

Instrucciones de comportamiento:
1. Sé extremadamente experto, servicial, profesional y cercano. Utiliza expresiones amables de Girona si es oportuno, pero responde en el idioma que te hable el usuario (por defecto español).
2. Explica proporciones de mezcla exactas y de forma muy práctica si el usuario tiene áridos, cemento, cal, etc. (Ejemplo: "Para revoque grueso, mezcla 1 parte de cemento, 1/4 de cal y 3 de arena...").
3. Sugiere herramientas o accesorios necesarios que podrían haber olvidado de comprar (como llanas, espátulas, mezcladoras, baldes de obra, cinta métrica, plomadas, gafas de protección o guantes).
4. Ofrece consejos de seguridad e instrucciones paso a paso para la aplicación (por ejemplo, humedecer los ladrillos antes de asentar, el curado del hormigón con agua, respetar los tiempos de secado de la pintura, o la preparación de superficies).
5. Responde de forma estructurada con viñetas claras y legibles en formato Markdown. Evita párrafos densos.
6. Mantén tus respuestas concisas y directamente enfocadas a resolver la duda práctica del constructor.`;

    // Map history to the required format if needed, or build contents array
    const contents: any[] = [];
    
    // Add history
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        });
      });
    }
    
    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Gemini 3.5 Flash
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Lo siento, no he podido procesar tu consulta en este momento. ¿Podrías volver a intentarlo?";
    
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ 
      error: 'Hubo un error al procesar tu consulta con el asistente de IA.',
      details: error.message 
    });
  }
});

// Setup Vite or static files serving based on environment
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development mode
    console.log('Starting in DEVELOPMENT mode with Vite Middleware...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    console.log('Starting in PRODUCTION mode...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
