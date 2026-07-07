const express = require("express");
const { login, logout, me } = require("./auth.controller");
const { requireAuth } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

module.exports = router;
