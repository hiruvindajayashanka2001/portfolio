import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const rateMap = new Map();
const RATE_LIMIT = 2;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };

  if (now - entry.start > WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;

  rateMap.set(ip, { count: entry.count + 1, start: entry.start });
  return false;
}

export async function POST(req) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    if (isRateLimited(ip)) {
      return Response.json(
        { error: 'Too many requests. Please wait a few minutes.' },
        { status: 429 }
      );
    }

    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    if (name.trim().length > 100 || message.trim().length > 2000) {
      return Response.json({ error: 'Input too long.' }, { status: 400 });
    }

    const initials = name
      .trim()
      .split(' ')
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join('');

    const timestamp = new Date().toLocaleString('en-US', {
      weekday: 'short',
      year:    'numeric',
      month:   'short',
      day:     'numeric',
      hour:    '2-digit',
      minute:  '2-digit',
      timeZoneName: 'short',
    });

    await resend.emails.send({
      from:    'Portfolio Contact <onboarding@resend.dev>',
      to:      process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `✉ New message from ${name}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- ── Header bar ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#5227FF 0%,#7c3aed 60%,#FF9FFC 100%);border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">

              <!-- Initials avatar -->
              <div style="display:inline-block;width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,0.15);border:2px solid rgba(255,255,255,0.35);text-align:center;line-height:56px;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:1px;margin-bottom:14px;">
                ${initials}
              </div>

              <div style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.7);letter-spacing:3px;text-transform:uppercase;margin-bottom:6px;">
                Portfolio Contact
              </div>
              <div style="font-size:22px;font-weight:700;color:#ffffff;margin:0;">
                New message from ${name}
              </div>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Sender details card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7ff;border:1px solid #ede9fe;border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:14px;border-bottom:1px solid #ede9fe;">
                          <div style="font-size:11px;font-weight:600;color:#7c3aed;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">From</div>
                          <div style="font-size:16px;font-weight:600;color:#1a1a2e;">${name}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:14px;">
                          <div style="font-size:11px;font-weight:600;color:#7c3aed;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Email</div>
                          <a href="mailto:${email}" style="font-size:15px;color:#5227FF;text-decoration:none;font-weight:500;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message block -->
              <div style="font-size:11px;font-weight:600;color:#7c3aed;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;">
                Message
              </div>
              <div style="background:#fafafa;border:1px solid #e8e8f0;border-left:4px solid #5227FF;border-radius:0 8px 8px 0;padding:20px 24px;font-size:15px;color:#374151;line-height:1.75;white-space:pre-wrap;">${message}</div>

              <!-- Reply CTA -->
              <div style="text-align:center;margin-top:32px;">
                <a href="mailto:${email}?subject=Re: Your message&body=Hi ${name},%0D%0A%0D%0A"
                   style="display:inline-block;background:linear-gradient(135deg,#5227FF,#7c3aed);color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:8px;letter-spacing:0.3px;">
                  Reply to ${name} →
                </a>
              </div>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#f4f4f7;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;border-top:1px solid #e8e8f0;">
              <div style="font-size:12px;color:#9ca3af;margin-bottom:6px;">
                Sent via your portfolio contact form · ${timestamp}
              </div>
              <div style="font-size:11px;color:#c4b5fd;letter-spacing:1px;">
                ✦ hiruvinda.dev
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('[contact]', err);
    return Response.json({ error: 'Failed to send. Please try again.' }, { status: 500 });
  }
}