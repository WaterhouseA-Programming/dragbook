// POST /api/stripe/checkout
// Body: { enquiry_id: uuid, total_pennies: number, event_date?: 'YYYY-MM-DD' }
// Caller: the performer (auth token in Authorization header). Creates a
// dragbook_bookings row with status='pending_payment' and returns a Stripe
// Checkout Session URL the booker can pay at.
//
// Required Cloudflare env vars:
//   STRIPE_SECRET_KEY            sk_test_... or sk_live_...
//   SUPABASE_URL                 https://...supabase.co
//   SUPABASE_ANON_KEY            (or SUPABASE_PUBLISHABLE_KEY)
//   SUPABASE_SERVICE_ROLE_KEY    used only on the webhook side
//   DRAGBOOK_PLATFORM_FEE_BPS    default 300 (3%)
//   DRAGBOOK_DEPOSIT_BPS         default 2000 (20%)
//   DRAGBOOK_BASE_URL            https://drag.nimblepanda.co.uk

import { asUser, bearerFromRequest } from '../../_lib/supabase.js';

export async function onRequestPost({ request, env }) {
  try {
    const jwt = bearerFromRequest(request);
    if (!jwt) return json({ error: 'Not authenticated' }, 401);

    if (!env.STRIPE_SECRET_KEY) return json({ error: 'Stripe not configured' }, 500);

    const body = await request.json();
    const enquiryId = String(body.enquiry_id || '');
    const total = Math.round(Number(body.total_pennies || 0));
    if (!enquiryId || !total || total < 100) {
      return json({ error: 'enquiry_id and total_pennies (>= 100) required' }, 400);
    }

    const platformBps = Number(env.DRAGBOOK_PLATFORM_FEE_BPS || 300);
    const depositBps  = Number(env.DRAGBOOK_DEPOSIT_BPS || 2000);
    const platformFee = Math.round((total * platformBps) / 10000);
    const deposit     = Math.round((total * depositBps) / 10000);

    const sb = asUser(env, jwt);

    // Look up the enquiry under the caller's auth, enforcing RLS:
    // only the performer on this enquiry can create a booking.
    const enquiries = await sb.select('/dragbook_enquiries', {
      id: `eq.${enquiryId}`,
      select: 'id,performer_id,booker_id,event_date,status'
    });
    const e = enquiries && enquiries[0];
    if (!e) return json({ error: 'Enquiry not found or not yours' }, 404);

    // Create the booking row
    const [booking] = await sb.insert('/dragbook_bookings', [{
      enquiry_id: e.id,
      performer_id: e.performer_id,
      booker_id: e.booker_id,
      total_pennies: total,
      platform_fee_pennies: platformFee,
      deposit_pennies: deposit,
      event_date: body.event_date || e.event_date || null,
      status: 'pending_payment'
    }]);
    if (!booking) return json({ error: 'Could not create booking' }, 500);

    const baseUrl = env.DRAGBOOK_BASE_URL || 'https://drag.nimblepanda.co.uk';

    // Create Stripe Checkout Session via REST
    const form = new URLSearchParams();
    form.append('mode', 'payment');
    form.append('success_url', `${baseUrl}/dragbook-inbox.html?id=${encodeURIComponent(e.id)}&paid=1`);
    form.append('cancel_url',  `${baseUrl}/dragbook-inbox.html?id=${encodeURIComponent(e.id)}&paid=0`);
    form.append('line_items[0][quantity]', '1');
    form.append('line_items[0][price_data][currency]', 'gbp');
    form.append('line_items[0][price_data][unit_amount]', String(deposit));
    form.append('line_items[0][price_data][product_data][name]', 'DragBook event deposit');
    form.append('line_items[0][price_data][product_data][description]', `Deposit for enquiry ${e.id}`);
    form.append('metadata[booking_id]', booking.id);
    form.append('metadata[enquiry_id]', e.id);
    form.append('payment_intent_data[metadata][booking_id]', booking.id);

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    });
    const session = await stripeRes.json();
    if (!stripeRes.ok) {
      console.error('Stripe error', session);
      return json({ error: session.error?.message || 'Stripe error' }, 500);
    }

    // Save the session id on the booking
    await sb.update('/dragbook_bookings', { id: `eq.${booking.id}` }, {
      stripe_session_id: session.id
    });

    return json({ url: session.url, booking_id: booking.id });
  } catch (err) {
    console.error(err);
    return json({ error: err.message || 'Unknown error' }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}
