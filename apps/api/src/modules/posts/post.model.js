const mongoose = require("mongoose");

const CATEGORIES = [
  "Journal",
  "Technology",
  "Recommendations",
  "Places",
  "Life",
];

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: { type: String, trim: true, maxlength: 300 },
    content: { type: String, required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    coverImage: {
      url: { type: String },
      publicId: { type: String }, // needed later to delete/replace on Cloudinary
    },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

// Full-text search across title + content (Phase 8's "Search published posts")
postSchema.index({ title: "text", content: "text" });

postSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model("Post", postSchema);
