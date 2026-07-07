const cloudinary = require("../../config/cloudinary");

function uploadFromBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "personalblog/covers" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    const result = await uploadFromBuffer(req.file.buffer);

    res.status(201).json({
      success: true,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      },
    });
  } catch (err) {
    next(err);
  }
}

async function deleteImage(req, res, next) {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ success: false, message: "publicId is required" });
    }
    await cloudinary.uploader.destroy(publicId);
    res.status(200).json({ success: true, message: "Image deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadImage, deleteImage };