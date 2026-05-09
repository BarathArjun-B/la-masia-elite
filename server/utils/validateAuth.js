const ApiError = require("./apiError");

const isEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

const validateRegisterInput = ({ username, email, password }) => {
  const errors = [];

  if (!username || username.trim().length < 3) {
    errors.push("Username must be at least 3 characters.");
  }

  if (!email || !isEmail(email)) {
    errors.push("A valid email is required.");
  }

  if (!password || password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  if (errors.length) {
    throw new ApiError(400, "Registration validation failed", errors);
  }
};

const validateLoginInput = ({ email, password }) => {
  if (!email || !isEmail(email) || !password) {
    throw new ApiError(400, "Valid email and password are required.");
  }
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
};
