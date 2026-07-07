const express = require("express");
const { requireAuth } = require("../../middleware/auth.middleware");
const upload = require("../../middleware/upload.middleware");
const { uploadImage, deleteImage } = require("./media.controller");

const router = express.Router();

router.post("/upload", requireAuth, upload.single("image"), uploadImage);
router.delete("/", requireAuth, deleteImage);

module.exports = router;