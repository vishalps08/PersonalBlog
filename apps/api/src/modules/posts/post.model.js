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
      publicId: { type: String },
    },
    galleryImages: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Full-text search across title + content (Phase 8's "Search published posts")
postSchema.index({ title: "text", content: "text" });

postSchema.statics.CATEGORIES = CATEGORIES;

module.exports = mongoose.model("Post", postSchema);
