const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const refreshCookieOptions = require("../utils/cookieOptions");
const { passwordResetEmail, verificationEmail } = require("../utils/emailTemplates");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const { validateLoginInput, validateRegisterInput } = require("../utils/validateAuth");

const publicUserFields = "_id username email role avatar isVerified createdAt updatedAt";

const sanitizeUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
  isVerified: user.isVerified,
  createdAt: user.createdAt,
});

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const setRefreshCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, refreshCookieOptions());
};

const clearRefreshCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

const sendTokenResponse = async (res, user, statusCode = 200) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  setRefreshCookie(res, refreshToken);

  res.status(statusCode).json({
    success: true,
    accessToken,
    user: sanitizeUser(user),
  });
};

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  validateRegisterInput({ username, email, password });

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  const verificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  const verifyUrl = `${process.env.CLIENT_URL || ""}/verify-email/${verificationToken}`;

  await sendEmail({
    to: user.email,
    subject: "Verify your La Masia Elite account",
    html: verificationEmail(verifyUrl),
    text: `Verify your La Masia Elite account: ${verifyUrl}`,
  });

  await sendTokenResponse(res, user, 201);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  validateLoginInput({ email, password });

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password +refreshToken");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password.");
  }

  await sendTokenResponse(res, user);
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (refreshToken) {
    await User.findOneAndUpdate({ refreshToken: hashToken(refreshToken) }, { refreshToken: null });
  }

  clearRefreshCookie(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: sanitizeUser(req.user),
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new ApiError(401, "Refresh token missing.");
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user || user.refreshToken !== hashToken(token)) {
    clearRefreshCookie(res);
    throw new ApiError(401, "Invalid refresh token.");
  }

  await sendTokenResponse(res, user);
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required.");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+passwordResetToken +passwordResetExpires",
  );

  if (!user) {
    res.status(200).json({
      success: true,
      message: "If an account exists, a password reset email has been sent.",
    });
    return;
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL || ""}/reset-password?token=${resetToken}`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Reset your La Masia Elite password",
      html: passwordResetEmail(resetUrl),
      text: `Reset your La Masia Elite password: ${resetUrl}`,
    });
  } catch (error) {
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save({ validateBeforeSave: false });
    throw new ApiError(500, "Password reset email could not be sent.");
  }

  res.status(200).json({
    success: true,
    message: "If an account exists, a password reset email has been sent.",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password || password.length < 8) {
    throw new ApiError(400, "A valid reset token and password are required.");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+password +passwordResetToken +passwordResetExpires");

  if (!user) {
    throw new ApiError(400, "Reset token is invalid or expired.");
  }

  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  user.refreshToken = null;
  await user.save();

  clearRefreshCookie(res);

  res.status(200).json({
    success: true,
    message: "Password reset successful. Please log in again.",
  });
});

const verifyEmail = asyncHandler(async (req, res) => {
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  }).select("+emailVerificationToken +emailVerificationExpires");

  if (!user) {
    throw new ApiError(400, "Verification token is invalid or expired.");
  }

  user.isVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Email verified successfully.",
  });
});

module.exports = {
  register,
  login,
  logout,
  getMe,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
