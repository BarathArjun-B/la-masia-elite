const refreshCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: Number(process.env.JWT_REFRESH_COOKIE_EXPIRES_DAYS || 7) * 24 * 60 * 60 * 1000,
});

module.exports = refreshCookieOptions;
