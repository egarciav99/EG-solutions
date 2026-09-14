import type { IncomingMessage, ServerResponse } from 'http';
import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from './_lib/firebaseAdmin.js';
import { classifyLead } from './_lib/classifyLead.js';
import { sendLeadNotification, sendClientConfirmation, LeadData } from './_lib/mailer.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ExtendedRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string | string[]>;
}

interface ExtendedResponse extends ServerResponse {
  status: (statusCode: number) => ExtendedResponse;
  json: (body: any) => void;
  send: (body: any) => void;
}

// Función auxiliar para parsear body si el runtime no lo pre-parseó
async function parseJsonBody(req: ExtendedRequest): Promise<any> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // Asegurar métodos helper si el runtime no los tiene
  if (!res.status) {
    res.status = function (code: number) {
      this.statusCode = code;
      return this;
    };
  }
  if (!res.json) {
    res.json = function (data: any) {
      this.setHeader('Content-Type', 'application/json');
      this.end(JSON.stringify(data));
    };
  }

  // 1. Solo aceptar POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Método no permitido. Solo se acepta POST.' });
  }

  try {
    const body = await parseJsonBody(req);
    const { name, email, serviceCategory, details, website } = body || {};

    // Honeypot: si este campo llegó con contenido, es un bot. Respondemos 200 
    // falso para no delatar la defensa, pero no procesamos nada.
    if (website && typeof website === 'string' && website.trim() !== '') {
      console.warn('[api/lead] Honeypot activado, solicitud descartada silenciosamente.');
      return res.status(200).json({ success: true });
    }

    // 2. Validar que no falten campos ni sean strings vacíos
    if (
      !name ||
      typeof name !== 'string' ||
      !name.trim() ||
      !email ||
      typeof email !== 'string' ||
      !email.trim() ||
      !serviceCategory ||
      typeof serviceCategory !== 'string' ||
      !serviceCategory.trim() ||
      !details ||
      typeof details !== 'string' ||
      !details.trim()
    ) {
      return res.status(400).json({
        error: 'Datos incompletos. Todos los campos (nombre, email, categoría de servicio y detalles) son obligatorios.',
      });
    }

    const trimmedData: LeadData = {
      name: name.trim(),
      email: email.trim(),
      serviceCategory: serviceCategory.trim(),
      details: details.trim(),
    };

    if (!EMAIL_REGEX.test(trimmedData.email)) {
      return res.status(400).json({
        error: 'El formato del correo electrónico no es válido.',
      });
    }

    // 3. Clasificación con IA (con fallback defensivo automático)
    const classification = await classifyLead(trimmedData.details, trimmedData.serviceCategory);
    trimmedData.classification = classification;

    // 4. Guardar documento en la colección 'leads' de Firestore
    const db = getDb();
    const docRef = await db.collection('leads').add({
      name: trimmedData.name,
      email: trimmedData.email,
      serviceCategory: trimmedData.serviceCategory,
      details: trimmedData.details,
      classification,
      status: 'nuevo',
      createdAt: FieldValue.serverTimestamp(),
      followUpReminderSent: false,
    });

    console.log(`[api/lead] Lead registrado con id: ${docRef.id}`);

    // 5. Envío de correos en paralelo (Promise.allSettled para que un fallo de correo no tumbe la respuesta)
    const [notifyResult, confirmResult] = await Promise.allSettled([
      sendLeadNotification(trimmedData),
      sendClientConfirmation(trimmedData),
    ]);

    if (notifyResult.status === 'rejected') {
      console.error('[api/lead] Falló la notificación al administrador:', notifyResult.reason);
    }
    if (confirmResult.status === 'rejected') {
      console.error('[api/lead] Falló la confirmación al cliente:', confirmResult.reason);
    }

    // 6. Respuesta exitosa
    return res.status(200).json({
      success: true,
      leadId: docRef.id,
      classification,
    });
  } catch (error) {
    console.error('[api/lead] Error crítico en el procesamiento del lead:', error);
    return res.status(500).json({
      error: 'Hubo un problema al procesar tu solicitud. Por favor intenta de nuevo más tarde.',
    });
  }
}
