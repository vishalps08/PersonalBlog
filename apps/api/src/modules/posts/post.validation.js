const Post = require("./post.model");

function validatePostPayload(body, { partial = false } = {}) {
  const errors = [];

  if (!partial || body.title !== undefined) {
    if (!body.title || typeof body.title !== "string")
      errors.push("Title is required");
  }
  if (!partial || body.content !== undefined) {
    if (!body.content || typeof body.content !== "string")
      errors.push("Content is required");
  }
  if (!partial || body.category !== undefined) {
    if (!body.category || !Post.CATEGORIES.includes(body.category)) {
      errors.push(`Category must be one of: ${Post.CATEGORIES.join(", ")}`);
    }
  }
  if (
    body.status !== undefined &&
    !["draft", "published"].includes(body.status)
  ) {
    errors.push("Status must be 'draft' or 'published'");
  }
  if (body.coverImage !== undefined) {
    const { url, publicId } = body.coverImage || {};
    if (!url || !publicId) {
      errors.push("coverImage must include both url and publicId");
    }
  }

  return errors;
}

module.exports = { validatePostPayload };
