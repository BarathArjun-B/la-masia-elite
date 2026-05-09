const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

const corsOptions = require("./config/corsOptions");
const authRoutes = require("./routes/auth.routes");
const { errorHandler, notFound } = require("./middleware/error.middleware");

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests. Please slow down and try again.",
  }),
);

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 40,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many auth attempts. Please try again later.",
  }),
  authRoutes,
);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "La Masia Elite API is healthy",
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
