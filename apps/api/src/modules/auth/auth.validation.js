function validateLoginPayload(body) {
  const errors = [];

  if (!body || typeof body !== "object") {
    errors.push("Request body is required");
    return errors;
  }
  if (!body.email || typeof body.email !== "string") {
    errors.push("Email is required");
  }
  if (!body.password || typeof body.password !== "string") {
    errors.push("Password is required");
  }

  return errors;
}

module.exports = { validateLoginPayload };
