import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAdminPost, createPost, updatePost, CATEGORIES } from "../lib/posts";
import RichTextEditor from "../components/RichTextEditor";
import CoverImageUploader from "../components/CoverImageUploader";

const emptyPost = {
  title: "",
  content: "",
  category: CATEGORIES[0],
  status: "draft",
  coverImage: null,
};

export default function PostEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [post, setPost] = useState(emptyPost);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;
    getAdminPost(id)
      .then((res) => setPost(res.data.post))
      .catch(() => toast.error("Couldn't load post"))
      .finally(() => setLoading(false));
  }, [id, isEditMode]);

  async function handleSave(status) {
    if (!post.title.trim()) return toast.error("Title is required");
    if (!post.content.trim()) return toast.error("Content is required");

    setSaving(true);
    const payload = { ...post, status };
    // coverImage must be omitted entirely if null, not sent as null
    if (!payload.coverImage) delete payload.coverImage;

    try {
      if (isEditMode) {
        await updatePost(id, payload);
        toast.success(status === "published" ? "Published" : "Saved");
      } else {
        const res = await createPost(payload);
        toast.success(status === "published" ? "Published" : "Draft saved");
        navigate(`/posts/${res.data.post._id}/edit`, { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="font-mono text-sm text-ash">Loading…</p>;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-600 text-ink dark:text-paper">
          {isEditMode ? "Edit post" : "New post"}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="rounded border border-ash/30 px-4 py-2 text-sm text-ink transition-colors hover:bg-ash/5 disabled:opacity-50 dark:border-ash/40 dark:text-paper dark:hover:bg-ash/10"
          >
            Save draft
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="rounded bg-safelight px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            Publish
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Post title"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        className="mb-4 w-full border-b border-ash/20 bg-transparent pb-2 font-display text-3xl font-600 text-ink outline-none focus:border-safelight dark:border-ash/30 dark:text-paper"
      />

      <div className="mb-6 flex items-center gap-4">
        <select
          value={post.category}
          onChange={(e) => setPost({ ...post, category: e.target.value })}
          className="rounded border border-ash/30 bg-white px-3 py-1.5 font-mono text-xs text-ink outline-none focus:border-safelight dark:border-ash/40 dark:bg-night-surface dark:text-paper"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <CoverImageUploader
          value={post.coverImage}
          onChange={(img) => setPost({ ...post, coverImage: img })}
        />
      </div>

      <RichTextEditor
        content={post.content}
        onChange={(html) => setPost({ ...post, content: html })}
      />
    </div>
  );
}