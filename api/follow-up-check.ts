import type { IncomingMessage, ServerResponse } from 'http';
import { getDb } from './_lib/firebaseAdmin.js';
import { sendFollowUpReminderEmail, PendingLeadReminder } from './_lib/mailer.js';

interface ExtendedRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string | string[]>;
}

interface ExtendedResponse extends ServerResponse {
  status: (statusCode: number) => ExtendedResponse;
  json: (body: any) => void;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
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

  // Opcional: permitir GET o POST para invocación por cron de Vercel
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Método no permitido. Utilizar GET o POST.' });
  }

  // Vercel Cron envía "Authorization: Bearer <CRON_SECRET>" cuando la variable está definida.
  // Sin ella, cualquiera podría invocar este endpoint y disparar correos.
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error('[api/follow-up-check] CRON_SECRET no está configurado.');
    return res.status(500).json({ error: 'CRON_SECRET no configurado.' });
  }
  if (req.headers.authorization !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'No autorizado.' });
  }

  try {
    const db = getDb();
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

    // Consultar leads con status 'nuevo' y followUpReminderSent == false.
    // La antigüedad (> 2 días) se filtra en código: los leads que llegan por correo (n8n)
    // pueden guardar createdAt como texto ISO en vez de Timestamp.
    const snapshot = await db
      .collection('leads')
      .where('status', '==', 'nuevo')
      .where('followUpReminderSent', '==', false)
      .get();

    const pendingLeads: PendingLeadReminder[] = [];
    const docIdsToUpdate: string[] = [];

    const now = Date.now();
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const createdAtDate = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || now);
      if (Number.isNaN(createdAtDate.getTime()) || createdAtDate > twoDaysAgo) continue;
      const daysPending = Math.max(2, Math.floor((now - createdAtDate.getTime()) / (24 * 60 * 60 * 1000)));

      pendingLeads.push({
        id: doc.id,
        name: data.name || 'Sin nombre',
        email: data.email || 'Sin email',
        serviceCategory: data.serviceCategory || 'General',
        daysPending,
      });

      docIdsToUpdate.push(doc.id);
    }

    let remindersSent = 0;

    if (pendingLeads.length > 0) {
      // 2. Enviar UN correo a NOTIFY_EMAIL con el listado
      await sendFollowUpReminderEmail(pendingLeads);
      remindersSent = pendingLeads.length;

      // 3. Marcar followUpReminderSent = true en batch para no reenviar
      const batch = db.batch();
      for (const id of docIdsToUpdate) {
        const ref = db.collection('leads').doc(id);
        batch.update(ref, {
          followUpReminderSent: true,
          followUpReminderSentAt: new Date(),
        });
      }
      await batch.commit();
      console.log(`[api/follow-up-check] Recordatorio enviado para ${pendingLeads.length} leads.`);
    } else {
      console.log('[api/follow-up-check] No hay leads pendientes de seguimiento de más de 48h.');
    }

    return res.status(200).json({
      checked: snapshot.size,
      remindersSent,
    });
  } catch (error) {
    console.error('[api/follow-up-check] Error al procesar chequeo de seguimiento:', error);
    return res.status(500).json({
      error: 'Error al ejecutar el cron de seguimiento.',
    });
  }
}
