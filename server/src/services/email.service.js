const nodemailer = require("nodemailer");

// In development without real SMTP credentials we spin up a throwaway
// Ethereal inbox so verification / reset links are actually deliverable
// and a preview URL is printed to the console.
let cachedDevTransporter = null;

const createTransporter = async () => {
  const hasRealCreds = process.env.SMTP_USER && process.env.SMTP_PASS;

  if (process.env.NODE_ENV === "production" || hasRealCreds) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Development with no credentials: use an ephemeral Ethereal test account.
  if (!cachedDevTransporter) {
    const testAccount = await nodemailer.createTestAccount();
    cachedDevTransporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
  }
  return cachedDevTransporter;
};

const logSendResult = (label, info) => {
  const preview = nodemailer.getTestMessageUrl(info);
  if (preview) {
    console.log(`📧 ${label} sent. Preview: ${preview}`);
  } else {
    console.log(`📧 ${label} sent to ${[].concat(info.accepted || []).join(", ") || "recipient"}`);
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
  const transporter = await createTransporter();
  const verifyUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/verify-email?token=${encodeURIComponent(verificationToken)}`;

  const content = `
    <h2 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 8px;">Verify Your Email Address</h2>
    <p style="color:#475569;font-size:15px;margin:0 0 24px;">Hi <strong>${user.name}</strong>, welcome to NEETVIDYA! Please verify your email to activate your account.</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin:0 0 28px;">
      <p style="color:#64748b;font-size:13px;margin:0 0 16px;">Click the button below to verify your email address. This link expires in <strong>24 hours</strong>.</p>
      <a href="${verifyUrl}" style="display:inline-block;background:linear-gradient(135deg,#22c55e,#16a34a);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
        ✓ Verify Email Address
      </a>
    </div>
    <p style="color:#94a3b8;font-size:12px;">Or copy and paste this link:<br/><span style="color:#22c55e;word-break:break-all;">${verifyUrl}</span></p>
  `;

  const mailOptions = {
    from: `"NEETVIDYA" <${process.env.SMTP_USER || "noreply@neetvidya.com"}>`,
    to: user.email,
    subject: "Verify your NEETVIDYA account",
    html: baseTemplate(content),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logSendResult("Verification email", info);
    return info;
  } catch (err) {
    console.error("Email send error:", err.message);
    // Don't throw - log and continue. Admin can resend.
  }
};

const sendPasswordResetEmail = async (user, resetToken) => {
  const transporter = await createTransporter();
  const resetUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/reset-password?token=${encodeURIComponent(resetToken)}`;

  const content = `
    <h2 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 8px;">Reset Your Password</h2>
    <p style="color:#475569;font-size:15px;margin:0 0 24px;">Hi <strong>${user.name}</strong>, we received a request to reset your NEETVIDYA account password.</p>
    <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:12px;padding:24px;margin:0 0 28px;">
      <p style="color:#9a3412;font-size:13px;font-weight:600;margin:0 0 4px;">⚠️ Security Notice</p>
      <p style="color:#9a3412;font-size:13px;margin:0 0 16px;">This link expires in <strong>1 hour</strong>. If you didn't request this, your account is safe — just ignore this email.</p>
      <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#f97316,#ea580c);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
        🔑 Reset Password
      </a>
    </div>
    <p style="color:#94a3b8;font-size:12px;">Or copy and paste this link:<br/><span style="color:#f97316;word-break:break-all;">${resetUrl}</span></p>
  `;

  const mailOptions = {
    from: `"NEETVIDYA Security" <${process.env.SMTP_USER || "noreply@neetvidya.com"}>`,
    to: user.email,
    subject: "Password Reset Request - NEETVIDYA",
    html: baseTemplate(content),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logSendResult("Password reset email", info);
    return info;
  } catch (err) {
    console.error("Email send error:", err.message);
  }
};

const sendWelcomeEmail = async (user, tempPassword = null) => {
  const transporter = await createTransporter();
  const loginUrl = `${process.env.CLIENT_URL || "http://localhost:5173"}/login`;

  const credSection = tempPassword
    ? `
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="color:#166534;font-size:13px;font-weight:600;margin:0 0 12px;">🎓 Your Login Credentials</p>
      <table cellpadding="0" cellspacing="0">
        <tr><td style="color:#4b5563;font-size:13px;padding:4px 0;min-width:100px;">Email</td><td style="color:#0f172a;font-size:13px;font-weight:600;">${user.email}</td></tr>
        <tr><td style="color:#4b5563;font-size:13px;padding:4px 0;">Password</td><td style="color:#0f172a;font-size:13px;font-weight:600;font-family:monospace;">${tempPassword}</td></tr>
      </table>
      <p style="color:#64748b;font-size:12px;margin:12px 0 0;">Please change your password after first login.</p>
    </div>
    `
    : "";

  const content = `
    <h2 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 8px;">Welcome to NEETVIDYA! 🎉</h2>
    <p style="color:#475569;font-size:15px;margin:0 0 24px;">Hi <strong>${user.name}</strong>, your account has been successfully created. You're now part of the NEETVIDYA family!</p>
    ${credSection}
    <a href="${loginUrl}" style="display:inline-block;background:linear-gradient(135deg,#22c55e,#16a34a);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;">
      → Login to Your Dashboard
    </a>
  `;

  const mailOptions = {
    from: `"NEETVIDYA" <${process.env.SMTP_USER || "noreply@neetvidya.com"}>`,
    to: user.email,
    subject: "Welcome to NEETVIDYA — Your Account is Ready",
    html: baseTemplate(content),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logSendResult("Welcome email", info);
  } catch (err) {
    console.error("Email send error:", err.message);
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail };
