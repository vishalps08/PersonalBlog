const express = require("express");
const { requireAuth } = require("../../middleware/auth.middleware");
const controller = require("./post.controller");

const router = express.Router();

// Order matters: specific paths before the "/:slug" catch-all
router.get("/", controller.listPublic);
router.get("/admin/all", requireAuth, controller.listAdmin);
router.get("/admin/:id", requireAuth, controller.getAdminById);
router.get("/:slug", controller.getPublicBySlug);
router.post("/:slug/view", controller.incrementView);

router.post("/", requireAuth, controller.create);
router.put("/:id", requireAuth, controller.update);
router.delete("/:id", requireAuth, controller.remove);

module.exports = router;
