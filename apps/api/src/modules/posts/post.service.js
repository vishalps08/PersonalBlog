const Post = require("./post.model");
const slugify = require("../../utils/slugify");
const cloudinary = require("../../config/cloudinary");

async function generateUniqueSlug(title, excludeId = null) {
  const base = slugify(title);
  let slug = base;
  let counter = 2;

  while (true) {
    const query = { slug };
    if (excludeId) query._id = { $ne: excludeId };
    const existing = await Post.findOne(query);
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter += 1;
  }
}

async function createPost(data) {
  const slug = await generateUniqueSlug(data.title);
  const publishedAt = data.status === "published" ? new Date() : undefined;
  return Post.create({ ...data, slug, publishedAt });
}

async function updatePost(id, data) {
  const post = await Post.findById(id);
  if (!post) return null;

  if (data.title && data.title !== post.title) {
    data.slug = await generateUniqueSlug(data.title, id);
  }

  // Stamp publishedAt only the first time a post goes live
  if (data.status === "published" && post.status !== "published") {
    data.publishedAt = new Date();
  }

  Object.assign(post, data);
  await post.save();
  return post;
}

async function deletePost(id) {
  return Post.findByIdAndDelete(id);
}

async function getPostById(id) {
  return Post.findById(id);
}

async function getPublishedPostBySlug(slug) {
  return Post.findOne({ slug, status: "published" });
}

async function listPublishedPosts({ category, search, page = 1, limit = 10 }) {
  const query = { status: "published" };
  if (category) query.category = category;
  if (search) query.$text = { $search: search };

  const skip = (page - 1) * Number(limit);

  const [posts, total] = await Promise.all([
    Post.find(query).sort({ publishedAt: -1 }).skip(skip).limit(Number(limit)),
    Post.countDocuments(query),
  ]);

  return { posts, total, page: Number(page), pages: Math.ceil(total / limit) };
}

async function listAllPosts({ category, status, page = 1, limit = 10 }) {
  const query = {};
  if (category) query.category = category;
  if (status) query.status = status;

  const skip = (page - 1) * Number(limit);

  const [posts, total] = await Promise.all([
    Post.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Post.countDocuments(query),
  ]);

  return { posts, total, page: Number(page), pages: Math.ceil(total / limit) };
}

async function deletePost(id) {
  const post = await Post.findById(id);
  if (!post) return null;

  if (post.coverImage?.publicId) {
    await cloudinary.uploader.destroy(post.coverImage.publicId);
  }

  await Post.findByIdAndDelete(id);
  return post;
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPublishedPostBySlug,
  listPublishedPosts,
  listAllPosts,
};
