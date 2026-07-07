require("dotenv").config();
const mongoose = require("mongoose");
const env = require("../config/env");
const Admin = require("../modules/auth/auth.model");
const { hashPassword } = require("../modules/auth/auth.service");

async function seed() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env before seeding.");
    process.exit(1);
  }

  await mongoose.connect(env.mongoUri);

  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    console.log(`Admin already exists for ${email}, skipping.`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await hashPassword(password);
  await Admin.create({ email, passwordHash });

  console.log(`✅ Admin created for ${email}`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});