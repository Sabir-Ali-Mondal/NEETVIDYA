// Email delivery via the Resend HTTPS API.
//
// Why not SMTP: Nodemailer needs outbound SMTP ports, which are commonly
// blocked or throttled from PaaS containers (Render free tier) — the exact
// "Connection timeout" failure. Resend is a plain HTTPS POST on port 443, so
// it works from any host that can reach the internet.

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 15000;

const isPlaceholder = (value) => !value || /^(your_|change_?me|xxx)/i.test(value.trim());

// Placeholders copied from .env.example are treated as "not configured" so a
// half-filled environment can never look healthy.
const apiKey = () => {
  const key = (process.env.RESEND_API_KEY || "").trim();
  return isPlaceholder(key) ? "" : key;
};

// Resend rejects a From address whose domain you have not verified, so fall
// back to the sandbox sender in that case (very useful for local dev).
const fromAddress = () => {
  const configured = (process.env.EMAIL_FROM || "").trim();
  if (configured && !isPlaceholder(configured) && configured.includes("@")) return configured;
  return "NEETVIDYA <onboarding@resend.dev>";
};

/**
 * Send one email through Resend.
 *
 * Resolves only when Resend has ACCEPTED the message. On any failure —
 * missing key, non-2xx response, network error, timeout — it logs the real
 * reason and returns `{ ok: false }` instead of throwing, so a dead mailer
 * never masks the registration itself. Callers must inspect the result
 * before telling the user an email was sent.
 */
const deliver = async ({ label, to, subject, html, replyTo }) => {
  const key = apiKey();

  if (!key) {
    console.error(
      `${label} NOT sent to ${to}: RESEND_API_KEY is missing (or still a placeholder). Set it in the environment.`
    );
    return { ok: false, reason: "email_not_configured" };
  }

  // Hard timeout: never let a hung request hold a serverless/container request open.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const detail = payload.message || payload.error || JSON.stringify(payload);
      console.error(`${label} FAILED for ${to}: [HTTP ${response.status}] ${detail}`);
      logResendHint(response.status, detail);
      return { ok: false, reason: `resend_http_${response.status}`, status: response.status };
    }

    console.log(`${label} accepted by Resend for ${to} (id: ${payload.id || "unknown"})`);
    return { ok: true, id: payload.id };
  } catch (err) {
    const aborted = err.name === "AbortError";
    console.error(
      `${label} FAILED for ${to}: ${aborted ? `timed out after ${SEND_TIMEOUT_MS}ms` : err.message}`
    );
    if (!aborted) {
      console.error("   Could not reach https://api.resend.com. Check the host's outbound network access.");
    }
    return { ok: false, reason: aborted ? "resend_timeout" : "resend_network_error" };
  } finally {
    clearTimeout(timer);
  }
};

const logResendHint = (status, detail) => {
  if (status === 401) {
    console.error("   RESEND_API_KEY is invalid or revoked. Create a new key at resend.com/api-keys.");
  }
  if (status === 403 || /domain|not verified|verify/i.test(detail || "")) {
    console.error(
      "   The From domain is not verified in Resend. Verify neetvidya.com (DNS records) or use EMAIL_FROM=NEETVIDYA <onboarding@resend.dev> for testing."
    );
  }
  if (status === 422) {
    console.error("   Resend rejected the message payload (usually the From or To address).");
  }
  if (status === 429) {
    console.error("   Resend rate limit or daily quota reached.");
  }
};

const baseTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>NEETVIDYA</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a1e 100%);padding:32px 40px;border-radius:16px 16px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-flex;align-items:center;gap:12px;">
                      <div style="background:linear-gradient(135deg,#22c55e,#84cc16);width:44px;height:44px;border-radius:12px;display:inline-block;text-align:center;line-height:44px;font-weight:900;color:#0f172a;font-size:18px;">NV</div>
                      <span style="color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;margin-left:12px;">NEETVIDYA</span>
                    </div>
                    <p style="color:#94a3b8;font-size:12px;margin:8px 0 0;">Premier NEET Coaching Institute</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;">
              ${content}
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0;"/>
              <p style="color:#94a3b8;font-size:12px;text-align:center;margin:0;">
                This email was sent by NEETVIDYA. If you didn't request this, please ignore it.<br/>
                &copy; ${new Date().getFullYear()} NEETVIDYA. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const sendVerificationEmail = async (user, verificationToken) => {
  const verifyUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/verify-email?token=${encodeURIComponent(verificationToken)}`;

  const content = `
    <h2 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 8px;">Verify Your Email Address</h2>
    <p style="color:#475569;font-size:15px;margin:0 0 24px;">Hi <strong>${user.name}</strong>, welcome to NEETVIDYA! Please verify your email to activate your account.</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:0 0 28px;">
      <p style="color:#64748b;font-size:13px;margin:0 0 16px;">Click the button below to verify your email address. This link expires in <strong>24 hours</strong>.</p>
      <a href="${verifyUrl}" style="display:inline-block;background:linear-gradient(135deg,#22c55e,#16a34a);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
        Verify Email Address
      </a>
    </div>
    <p style="color:#94a3b8;font-size:12px;">Or copy and paste this link:<br/><span style="color:#22c55e;word-break:break-all;">${verifyUrl}</span></p>
  `;

  const mailOptions = {
    to: user.email,
    subject: "Verify your NEETVIDYA account",
    html: baseTemplate(content),
  };

  // Never throws — the caller decides what to tell the user.
  return deliver({
    label: "Verification email",
    to: user.email,
    subject: mailOptions.subject,
    html: mailOptions.html,
  });
};

const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password?token=${encodeURIComponent(resetToken)}`;

  const content = `
    <h2 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 8px;">Reset Your Password</h2>
    <p style="color:#475569;font-size:15px;margin:0 0 24px;">Hi <strong>${user.name}</strong>, we received a request to reset your NEETVIDYA account password.</p>
    <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:24px;margin:0 0 28px;">
      <p style="color:#9a3412;font-size:13px;font-weight:600;margin:0 0 4px;">Security Notice</p>
      <p style="color:#9a3412;font-size:13px;margin:0 0 16px;">This link expires in <strong>1 hour</strong>. If you didn't request this, your account is safe — just ignore this email.</p>
      <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#f97316,#ea580c);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
        Reset Password
      </a>
    </div>
    <p style="color:#94a3b8;font-size:12px;">Or copy and paste this link:<br/><span style="color:#f97316;word-break:break-all;">${resetUrl}</span></p>
  `;

  const mailOptions = {
    to: user.email,
    subject: "Password Reset Request - NEETVIDYA",
    html: baseTemplate(content),
  };

  return deliver({
    label: "Password reset email",
    to: user.email,
    subject: mailOptions.subject,
    html: mailOptions.html,
  });
};

const sendWelcomeEmail = async (user, tempPassword = null) => {
  const loginUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/login`;

  const credSection = tempPassword
    ? `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="color:#166534;font-size:13px;font-weight:600;margin:0 0 12px;">Your Login Credentials</p>
      <table cellpadding="0" cellspacing="0">
        <tr><td style="color:#4b5563;font-size:13px;padding:4px 0;min-width:100px;">Email</td><td style="color:#0f172a;font-size:13px;font-weight:600;">${user.email}</td></tr>
        <tr><td style="color:#4b5563;font-size:13px;padding:4px 0;">Password</td><td style="color:#0f172a;font-size:13px;font-weight:600;font-family:monospace;">${tempPassword}</td></tr>
      </table>
      <p style="color:#64748b;font-size:12px;margin:12px 0 0;">Please change your password after first login.</p>
    </div>
    `
    : "";

  const content = `
    <h2 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 8px;">Welcome to NEETVIDYA!</h2>
    <p style="color:#475569;font-size:15px;margin:0 0 24px;">Hi <strong>${user.name}</strong>, your account has been successfully created. You're now part of the NEETVIDYA family!</p>
    ${credSection}
    <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#22c55e,#16a34a);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
      Login to Your Dashboard
    </a>
  `;

  const mailOptions = {
    to: user.email,
    subject: "Welcome to NEETVIDYA — Your Account is Ready",
    html: baseTemplate(content),
  };

  return deliver({
    label: "Welcome email",
    to: user.email,
    subject: mailOptions.subject,
    html: mailOptions.html,
  });
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail,
  isEmailConfigured: () => Boolean(apiKey()),
};
