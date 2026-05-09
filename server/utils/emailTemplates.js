const emailShell = (title, body, ctaText, ctaUrl) => `
  <div style="margin:0;background:#050806;padding:32px;font-family:Inter,Arial,sans-serif;color:#f4fff7">
    <div style="max-width:560px;margin:0 auto;border:1px solid rgba(143,255,98,.25);border-radius:16px;background:#09100b;padding:28px">
      <p style="margin:0 0 12px;color:#8fff62;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase">La Masia Elite</p>
      <h1 style="margin:0 0 16px;font-size:28px;line-height:1.1">${title}</h1>
      <p style="margin:0 0 24px;color:#b8c8be;line-height:1.7">${body}</p>
      <a href="${ctaUrl}" style="display:inline-block;border-radius:999px;background:#8fff62;color:#071008;padding:13px 18px;font-weight:800;text-decoration:none">${ctaText}</a>
      <p style="margin:24px 0 0;color:#718077;font-size:12px;line-height:1.6">If the button does not work, paste this link into your browser:<br>${ctaUrl}</p>
    </div>
  </div>
`;

const verificationEmail = (url) =>
  emailShell(
    "Verify your academy account",
    "Confirm your email to unlock secure access to your La Masia Elite training dashboard.",
    "Verify Email",
    url,
  );

const passwordResetEmail = (url) =>
  emailShell(
    "Reset your password",
    "Use this secure link to set a new password. It expires in 15 minutes for your protection.",
    "Reset Password",
    url,
  );

module.exports = {
  verificationEmail,
  passwordResetEmail,
};
