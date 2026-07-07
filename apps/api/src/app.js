const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const env = require("./config/env");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Core middleware
const corsOptions = {
  origin: (origin, callback) => {
    // No origin = same-origin requests, curl, Postman, etc. — allow
    if (!origin) return callback(null, true);

    if (env.nodeEnv === "development") {
      // Any localhost port is fine in dev — you may be running several apps at once
      const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin);
      return callback(null, isLocalhost);
    }

    // Production: only exact matches from CLIENT_URLS
    return callback(null, env.clientUrls.includes(origin));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    environment: env.nodeEnv,
  });
});

// TODO (Phase 3+): mount feature routes here
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use("/api/posts", require("./modules/posts/post.routes"));
app.use("/api/media", require("./modules/media/media.routes"));

// 404 + error handling — must stay last
app.use(notFound);
app.use(errorHandler);

module.exports = app;
