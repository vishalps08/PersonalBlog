const authService = require("../modules/auth/auth.service");
const env = require("../config/env");

function requireAuth(req, res, next) {
  const token = req.cookies?.[env.cookieName];

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  try {
    const payload = authService.verifyToken(token);
    req.admin = { id: payload.sub, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired session" });
  }
}

module.exports = { requireAuth };