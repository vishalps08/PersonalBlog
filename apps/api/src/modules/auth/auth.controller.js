const authService = require("./auth.service");
const { validateLoginPayload } = require("./auth.validation");
const env = require("../../config/env");

const COOKIE_NAME = env.cookieName;

const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  // Cross-domain cookies (admin on Vercel, API on Render) require SameSite=None + Secure.
  // Locally, admin/API share "localhost" as the site, so Lax is fine and doesn't need HTTPS.
  sameSite: env.nodeEnv === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

async function login(req, res, next) {
  try {
    const errors = validateLoginPayload(req.body);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: errors.join(", ") });
    }

    const { email, password } = req.body;
    const admin = await authService.findAdminByEmail(email);
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isValid = await authService.verifyPassword(
      password,
      admin.passwordHash,
    );
    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = authService.generateToken(admin);
    res.cookie(COOKIE_NAME, token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "Logged in",
      admin: { email: admin.email },
    });
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  res.clearCookie(COOKIE_NAME, cookieOptions);
  res.status(200).json({ success: true, message: "Logged out" });
}

function me(req, res) {
  res.status(200).json({ success: true, admin: req.admin });
}

module.exports = { login, logout, me };
