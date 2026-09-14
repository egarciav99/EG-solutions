import nodemailer from 'nodemailer';

export interface LeadData {
  name: string;
  email: string;
  serviceCategory: string;
  details: string;
  classification?: {
    urgency: 'alta' | 'media' | 'baja';
    matchesCategory: boolean;
    summary: string;
  };
}

export interface PendingLeadReminder {
  id: string;
  name: string;
  email: string;
  serviceCategory: string;
  daysPending: number;
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('Faltan variables de entorno para Nodemailer (GMAIL_USER, GMAIL_APP_PASSWORD).');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Envía a NOTIFY_EMAIL una notificación con los detalles y la clasificación de IA del nuevo lead.
 */
export async function sendLeadNotification(lead: LeadData): Promise<void> {
  const notifyEmail = process.env.NOTIFY_EMAIL || process.env.GMAIL_USER;
  if (!notifyEmail) {
    throw new Error('No se definió NOTIFY_EMAIL ni GMAIL_USER para recibir notificaciones.');
  }

  const transporter = getTransporter();
  const urgency = lead.classification?.urgency ?? 'media';
  const summary = lead.classification?.summary ?? 'Sin resumen automático disponible.';
  const matchesCategory = lead.classification?.matchesCategory !== false ? 'Sí' : 'Discrepancia detectada';

  const subject = `Nuevo lead: [${lead.serviceCategory}] - [${urgency.toUpperCase()}]`;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.5;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Nuevo lead recibido</h2>
      <p><strong>Nombre:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${lead.email}">${lead.email}</a></p>
      <p><strong>Línea de servicio:</strong> ${lead.serviceCategory}</p>
      
      <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px 16px; margin: 16px 0;">
        <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 13px; text-transform: uppercase;">Clasificación de IA</h4>
        <p style="margin: 4px 0;"><strong>Urgencia:</strong> <span style="font-weight: bold; color: ${urgency === 'alta' ? '#b91c1c' : urgency === 'media' ? '#d97706' : '#15803d'};">${urgency.toUpperCase()}</span></p>
        <p style="margin: 4px 0;"><strong>Alineación con categoría:</strong> ${matchesCategory}</p>
        <p style="margin: 4px 0;"><strong>Resumen:</strong> ${summary}</p>
      </div>

      <h3 style="color: #0f172a; font-size: 14px; text-transform: uppercase; margin-top: 20px;">Detalles del proyecto</h3>
      <div style="background-color: #ffffff; border-left: 4px solid #3b82f6; padding: 12px; margin: 8px 0; font-size: 14px; white-space: pre-wrap;">${lead.details}</div>

      <p style="font-size: 12px; color: #64748b; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 8px;">
        EG Solutions — Notificación automática del sistema
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"EG Solutions Web" <${process.env.GMAIL_USER}>`,
    to: notifyEmail,
    replyTo: lead.email,
    subject,
    html: htmlContent,
  });
}

/**
 * Envía al email del cliente un correo confirmando la recepción técnica de su consulta.
 */
export async function sendClientConfirmation(lead: LeadData): Promise<void> {
  const transporter = getTransporter();

  const subject = `Confirmación de consulta: ${lead.serviceCategory} — EG Solutions`;

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2b3242; max-width: 600px; margin: 0 auto; line-height: 1.6;">
      <h2 style="color: #1a2332; font-size: 20px; font-weight: 700; margin-bottom: 16px;">
        Hemos recibido tu consulta
      </h2>
      <p>Hola ${lead.name},</p>
      <p>
        Confirmamos la recepción de tu mensaje sobre <strong>${lead.serviceCategory}</strong> en EG Solutions.
      </p>
      <p>
        Elier Garcia revisará los detalles técnicos de tu propuesta y te responderá directamente en menos de <strong>24 horas laborables</strong> con una evaluación preliminar de viabilidad y los siguientes pasos.
      </p>
      
      <div style="margin: 24px 0; padding: 14px; background-color: #f6f7f8; border-left: 3px solid #b87333; border-radius: 4px; font-size: 13px; color: #475569;">
        <strong>Resumen de tu solicitud:</strong><br/>
        <span style="font-style: italic;">"${lead.details.length > 200 ? lead.details.substring(0, 200) + '...' : lead.details}"</span>
      </div>

      <p style="font-size: 14px; color: #475569;">
        Si requieres anexar documentación técnica complementaria o diagramas de flujo, puedes responder directamente a este correo.
      </p>

      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #cbd5e1; font-size: 12px; color: #64748b;">
        <strong style="color: #1a2332;">Elier Garcia</strong><br/>
        EG Solutions · Práctica independiente de ingeniería de software<br/>
        Plataformas Web · Automatizaciones · Agentes IA
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Elier Garcia — EG Solutions" <${process.env.GMAIL_USER}>`,
    to: lead.email,
    subject,
    html: htmlContent,
  });
}

/**
 * Envía un correo con el listado de leads pendientes de seguimiento.
 */
export async function sendFollowUpReminderEmail(leads: PendingLeadReminder[]): Promise<void> {
  const notifyEmail = process.env.NOTIFY_EMAIL || process.env.GMAIL_USER;
  if (!notifyEmail) {
    throw new Error('No se definió NOTIFY_EMAIL ni GMAIL_USER para recordatorio.');
  }

  const transporter = getTransporter();
  const subject = `Recordatorio diario: ${leads.length} lead(s) sin seguimiento pendiente(s)`;

  const listItems = leads
    .map(
      (l) => `
      <li style="margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0;">
        <strong>${l.name}</strong> (&lt;<a href="mailto:${l.email}">${l.email}</a>&gt;)<br/>
        <span style="font-size: 12px; color: #475569;">Servicio: ${l.serviceCategory} | <strong>${l.daysPending} día(s) sin respuesta</strong></span>
      </li>
    `
    )
    .join('');

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.5;">
      <h2 style="color: #b91c1c; border-bottom: 2px solid #cbd5e1; padding-bottom: 8px;">
        Leads pendientes de seguimiento (>48h)
      </h2>
      <p>Se han detectado los siguientes leads en estado <strong>nuevo</strong> con más de 2 días sin seguimiento registrado:</p>
      
      <ul style="list-style: none; padding: 0;">
        ${listItems}
      </ul>

      <p style="font-size: 12px; color: #64748b; margin-top: 24px;">
        Este recordatorio se genera automáticamente a través del cron diario en EG Solutions.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"EG Solutions Crons" <${process.env.GMAIL_USER}>`,
    to: notifyEmail,
    subject,
    html: htmlContent,
  });
}
