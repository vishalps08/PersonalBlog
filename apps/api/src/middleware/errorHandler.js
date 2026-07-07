const multer = require("multer");

function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV === "development";

  if (err instanceof multer.MulterError || err.message === "Only image files are allowed") {
    statusCode = 400;
  }

  console.error(err);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    ...(isDev && { stack: err.stack }),
  });
}

module.exports = { notFound, errorHandler };