require("dotenv").config();

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  clientUrls: (
    process.env.CLIENT_URLS || "http://localhost:5173,http://localhost:5174"
  ).split(",").map((url) => url.trim()),
  
  cloudinary: {
    cloudName: required("CLOUDINARY_CLOUD_NAME"),
    apiKey: required("CLOUDINARY_API_KEY"),
    apiSecret: required("CLOUDINARY_API_SECRET"),
  },

  mongoUri: required("MONGO_URI"),
  jwtSecret: required("JWT_SECRET"),
  cookieName: process.env.COOKIE_NAME || "token",
};


module.exports = env;