import { GoogleGenAI } from '@google/genai';

export interface LeadClassification {
  urgency: 'alta' | 'media' | 'baja';
  matchesCategory: boolean;
  summary: string;
}

const FALLBACK_CLASSIFICATION: LeadClassification = {
  urgency: 'media',
  matchesCategory: true,
  summary: 'Pendiente de revisión manual.',
};

/**
 * Clasifica el lead usando el modelo de Gemini para obtener urgencia,
 * coherencia de la categoría y resumen conciso en formato JSON estricto.
 */
export async function classifyLead(details: string, serviceCategory: string): Promise<LeadClassification> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[classifyLead] GEMINI_API_KEY no encontrada. Aplicando fallback.');
    return FALLBACK_CLASSIFICATION;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Analiza la siguiente consulta de proyecto para EG Solutions (estudio de desarrollo web, automatización con n8n e integraciones de IA).
Categoría indicada por el cliente: "${serviceCategory}"
Detalles proporcionados por el cliente: "${details}"

Evalúa:
1. "urgency": "alta" si menciona fechas límites inmediatas, lanzamientos caídos o impacto financiero directo; "media" para proyectos normales con planificación; "baja" para consultas exploratorias o sin fecha prevista.
2. "matchesCategory": true si lo que describe coincide razonablemente con la categoría "${serviceCategory}", o false si claramente describe otra cosa.
3. "summary": un resumen técnico conciso de máximo 2 líneas en español que sintetice la necesidad central.

Devuelve EXCLUSIVAMENTE un JSON válido con esta estructura, sin bloques markdown de código y sin texto adicional:
{"urgency": "alta" | "media" | "baja", "matchesCategory": true | false, "summary": "texto"}`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text ? response.text.trim() : '';
    if (!rawText) {
      return FALLBACK_CLASSIFICATION;
    }

    // Limpieza defensiva en caso de que incluya decoradores markdown
    const cleanedJson = rawText.replace(/^```(json)?\n?/i, '').replace(/\n?```$/, '').trim();
    const parsed = JSON.parse(cleanedJson);

    const validUrgency: ('alta' | 'media' | 'baja') =
      parsed.urgency === 'alta' || parsed.urgency === 'media' || parsed.urgency === 'baja'
        ? parsed.urgency
        : 'media';

    return {
      urgency: validUrgency,
      matchesCategory: typeof parsed.matchesCategory === 'boolean' ? parsed.matchesCategory : true,
      summary: typeof parsed.summary === 'string' && parsed.summary.trim() ? parsed.summary.trim() : FALLBACK_CLASSIFICATION.summary,
    };
  } catch (error) {
    console.error('[classifyLead] Error al clasificar lead con Gemini:', error);
    return FALLBACK_CLASSIFICATION;
  }
}
