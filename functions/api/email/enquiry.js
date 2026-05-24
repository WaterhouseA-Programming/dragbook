// POST /api/email/enquiry
// Body: { enquiry_id: uuid }
// Sends "you have a new enquiry" to the performer.
//
// Required env vars:
//   RESEND_API_KEY            re_...
//   RESEND_FROM_EMAIL         e.g. "DragBook <hello@drag.nimblepanda.co.uk>"
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY (to look up the performer's email; auth.users
//                              is not exposed to the user JWT for safety)
//   DRAGBOOK_BASE_URL         used to build inbox links

import { asService } from '../../_lib/supabase.js';

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) return json({ error: 'Resend not configured' }, 500);

  const body = await request.json().catch(() => ({}));
  const enquiryId = String(body.enquiry_id || '');
  if (!enquiryId) return json({ error: 'enquiry_id required' }, 400);

  const sb = asService(env);

  const [enquiry] = await sb.select('/dragbook_enquiries', {
    id: `eq.${enquiryId}`,
    select: 'id,performer_id,booker_id,event_date,event_type,event_location,initial_message'
  });
  if (!enquiry) return json({ error: 'Enquiry not found' }, 404);

  // Resolve performer's auth email via the admin users endpoint
  const performer = await fetchAuthUser(env, enquiry.performer_id);
  if (!performer?.email) return json({ error: 'Performer has no email' }, 500);

  const baseUrl = env.DRAGBOOK_BASE_URL || 'https://drag.nimblepanda.co.uk';
  const inboxUrl = `${baseUrl}/dragbook-inbox.html?id=${encodeURIComponent(enquiry.id)}`;

  const [booker] = await sb.select('/dragbook_profiles', {
    id: `eq.${enquiry.booker_id}`,
    select: 'display_name'
  });
  const bookerName = booker?.display_name || 'A booker';
  const eventLine = [enquiry.event_type, enquiry.event_date, enquiry.event_location].filter(Boolean).join(' · ');

  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#0A0008;color:#FFE8FF;padding:24px;">
      <h1 style="font-family:Georgia,serif;color:#FF2D78;margin:0 0 8px;">New enquiry on DragBook</h1>
      <p style="color:#C084C8;margin:0 0 18px;">${escape(bookerName)} sent you an enquiry.</p>
      ${eventLine ? `<p><strong>${escape(eventLine)}</strong></p>` : ''}
      <blockquote style="margin:16px 0;padding:14px 18px;background:#1A0020;border-left:3px solid #FF2D78;border-radius:6px;">
        ${escape(enquiry.initial_message).replace(/\n/g, '<br>')}
      </blockquote>
      <p style="margin:24px 0;">
        <a href="${inboxUrl}" style="background:linear-gradient(135deg,#FF2D78,#9B00FF);color:white;text-decoration:none;padding:12px 24px;border-radius:100px;font-weight:600;">Reply on DragBook</a>
      </p>
      <p style="font-size:0.8em;color:#7a5a7a;">You're getting this because you have a DragBook performer listing.</p>
    </div>
  `;

  return await sendEmail(env, {
    to: performer.email,
    subject: `New DragBook enquiry from ${bookerName}`,
    html,
  });
}

async function sendEmail(env, { to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL || 'DragBook <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('Resend error', data);
    return json({ error: data.message || 'Resend error' }, 500);
  }
  return json({ ok: true, id: data.id });
}

async function fetchAuthUser(env, userId) {
  const url = `${env.SUPABASE_URL || 'https://lwhrnakucahaeieeeako.supabase.co'}/auth/v1/admin/users/${userId}`;
  const res = await fetch(url, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (!res.ok) return null;
  return await res.json();
}

function escape(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}
