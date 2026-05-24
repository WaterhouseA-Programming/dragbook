// POST /api/stripe/webhook
// Stripe sends payment lifecycle events here. We verify the signature, then
// flip the matching dragbook_bookings row to 'deposit_paid'.
//
// Required env vars:
//   STRIPE_WEBHOOK_SECRET        whsec_...
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY    (bypasses RLS; needed because the webhook
//                                  is unauthenticated)

import { asService } from '../../_lib/supabase.js';

export async function onRequestPost({ request, env }) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Stripe webhook not configured', { status: 500 });
  }
  const signature = request.headers.get('stripe-signature');
  const payload = await request.text();

  const ok = await verifyStripeSignature(payload, signature, env.STRIPE_WEBHOOK_SECRET);
  if (!ok) return new Response('Invalid signature', { status: 400 });

  let event;
  try { event = JSON.parse(payload); } catch { return new Response('Bad JSON', { status: 400 }); }

  const sb = asService(env);

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const bookingId = session.metadata?.booking_id;
      if (bookingId) {
        await sb.update('/dragbook_bookings', { id: `eq.${bookingId}` }, {
          status: 'deposit_paid',
          stripe_payment_intent_id: session.payment_intent || null,
        });
      }
    }
    // Other useful event types: payment_intent.payment_failed -> revert to pending,
    // charge.refunded -> status='refunded'. Add when needed.

    return new Response('ok', { status: 200 });
  } catch (err) {
    console.error('webhook handler', err);
    return new Response('handler error', { status: 500 });
  }
}

// Stripe signature verification: t=...,v1=... HMAC-SHA256 of `${t}.${payload}`
async function verifyStripeSignature(payload, header, secret) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(',').map(p => p.split('=')));
  if (!parts.t || !parts.v1) return false;

  const signed = `${parts.t}.${payload}`;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signed));
  const hex = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');

  // Constant-time compare
  if (hex.length !== parts.v1.length) return false;
  let mismatch = 0;
  for (let i = 0; i < hex.length; i++) mismatch |= hex.charCodeAt(i) ^ parts.v1.charCodeAt(i);
  return mismatch === 0;
}
