const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const Admin = require("./auth.model");

const SALT_ROUNDS = 10;

async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

async function verifyPassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash);
}

function generateToken(admin) {
  return jwt.sign(
    { sub: admin._id.toString(), email: admin.email },
    env.jwtSecret,
    { expiresIn: "7d" },
  );
}

function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

async function findAdminByEmail(email) {
  return Admin.findOne({ email: email.toLowerCase().trim() });
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  findAdminByEmail,
};
