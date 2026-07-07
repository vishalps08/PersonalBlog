const postService = require("./post.service");
const { validatePostPayload } = require("./post.validation");

async function create(req, res, next) {
  try {
    const errors = validatePostPayload(req.body);
    if (errors.length)
      return res
        .status(400)
        .json({ success: false, message: errors.join(", ") });

    const post = await postService.createPost(req.body);
    res.status(201).json({ success: true, post });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const errors = validatePostPayload(req.body, { partial: true });
    if (errors.length)
      return res
        .status(400)
        .json({ success: false, message: errors.join(", ") });

    const post = await postService.updatePost(req.params.id, req.body);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const post = await postService.deletePost(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (err) {
    next(err);
  }
}

async function getAdminById(req, res, next) {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
}

async function listAdmin(req, res, next) {
  try {
    const result = await postService.listAllPosts(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

async function listPublic(req, res, next) {
  try {
    const result = await postService.listPublishedPosts(req.query);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

async function getPublicBySlug(req, res, next) {
  try {
    const post = await postService.getPublishedPostBySlug(req.params.slug);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  create,
  update,
  remove,
  getAdminById,
  listAdmin,
  listPublic,
  getPublicBySlug,
};
