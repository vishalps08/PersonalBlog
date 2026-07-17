import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronRight, Eye, EyeOff, Save } from "lucide-react";
import {
  getAdminPost,
  createPost,
  updatePost,
  CATEGORIES,
} from "../lib/posts";
import RichTextEditor from "../components/RichTextEditor";
import CoverImageUploader from "../components/CoverImageUploader";

const emptyPost = {
  title: "",
  content: "",
  category: CATEGORIES[0],
  status: "draft",
  coverImage: null,
};

function stripHtml(html) {
  const el = document.createElement("div");
  el.innerHTML = html;
  return el.textContent || "";
}

function wordCount(html) {
  return stripHtml(html).trim().split(/\s+/).filter(Boolean).length;
}

function readingTime(html) {
  const words = wordCount(html);
  return Math.max(1, Math.round(words / 200));
}

export default function PostEditor() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [post, setPost] = useState(emptyPost);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const autoSaveTimer = useRef(null);

  useEffect(() => {
    if (!isEditMode) return;
    getAdminPost(id)
      .then((res) => setPost(res.data.post))
      .catch(() => toast.error("Couldn't load post"))
      .finally(() => setLoading(false));
  }, [id, isEditMode]);

  const updateField = useCallback((field, value) => {
    setPost((p) => ({ ...p, [field]: value }));
  }, []);

  // Auto-save draft every 30s in edit mode
  useEffect(() => {
    if (!isEditMode || post.status === "published") return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

    autoSaveTimer.current = setTimeout(async () => {
      if (!post.title.trim() || !post.content.trim()) return;
      const payload = { ...post, status: "draft" };
      if (!payload.coverImage) delete payload.coverImage;
      try {
        await updatePost(id, payload);
        setLastSaved(new Date());
      } catch {
        // silent — auto-save shouldn't interrupt
      }
    }, 30000);

    return () => clearTimeout(autoSaveTimer.current);
  }, [post, id, isEditMode]);

  async function handleSave(status) {
    if (!post.title.trim()) return toast.error("Title is required");
    if (!post.content.trim()) return toast.error("Content is required");

    setSaving(true);
    const payload = { ...post, status };
    if (!payload.coverImage) delete payload.coverImage;

    try {
      if (isEditMode) {
        await updatePost(id, payload);
        toast.success(status === "published" ? "Published" : "Saved");
        setLastSaved(new Date());
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

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="skeleton-shimmer h-10 w-2/3 rounded-lg" />
        <div className="skeleton-shimmer h-6 w-40 rounded" />
        <div className="skeleton-shimmer h-64 w-full rounded-xl" />
        <div className="skeleton-shimmer h-96 w-full rounded-xl" />
      </div>
    );
  }

  const words = wordCount(post.content);
  const mins = readingTime(post.content);

  return (
    <div className="mx-auto max-w-3xl animate-fade-in-up">
      {/* Breadcrumbs */}
      <nav className="mb-4 flex items-center gap-1 font-mono text-xs text-ash">
        <Link to="/" className="transition-colors hover:text-ink dark:hover:text-paper">
          Posts
        </Link>
        <ChevronRight size={12} />
        <span className="text-ink dark:text-paper">
          {isEditMode ? "Edit" : "New post"}
        </span>
      </nav>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl font-600 text-ink dark:text-paper">
            {isEditMode ? "Edit post" : "New post"}
          </h1>
          {lastSaved && (
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-ash">
              <Save size={11} />
              {lastSaved.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-ash/25 px-3 py-2 text-sm text-ash transition-colors hover:border-ink hover:text-ink dark:border-ash/35 dark:hover:border-paper dark:hover:text-paper"
          >
            {preview ? <EyeOff size={15} /> : <Eye size={15} />}
            {preview ? "Edit" : "Preview"}
          </button>
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="rounded-lg border border-ash/25 px-4 py-2 text-sm text-ink transition-colors hover:bg-ash/5 disabled:opacity-50 dark:border-ash/35 dark:text-paper dark:hover:bg-ash/10"
          >
            Save draft
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="rounded-lg bg-safelight px-4 py-2 text-sm font-medium text-paper transition-all hover:bg-safelight/90 disabled:opacity-50"
          >
            {saving ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                Saving...
              </span>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>

      {preview ? (
        /* Preview mode */
        <div className="rounded-2xl border border-ash/15 bg-white p-6 sm:p-8 dark:border-ash/25 dark:bg-night-surface">
          {post.coverImage?.url && (
            <div className="mb-6 overflow-hidden rounded-xl">
              <img
                src={post.coverImage.url}
                alt=""
                className="mx-auto max-h-[400px] w-full object-contain"
              />
            </div>
          )}
          <div className="mb-3 flex items-center gap-2 font-mono text-xs text-ash">
            <span className="rounded-full bg-safelight/10 px-2.5 py-0.5 text-safelight">
              {post.category}
            </span>
            <span>&middot;</span>
            <span>{words} words</span>
            <span>&middot;</span>
            <span>{mins} min read</span>
          </div>
          <h1 className="mb-6 font-display text-3xl font-700 leading-tight text-ink dark:text-paper">
            {post.title || "Untitled"}
          </h1>
          <div
            className="prose prose-neutral max-w-none prose-headings:font-display prose-a:text-safelight dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      ) : (
        /* Edit mode */
        <>
          <input
            type="text"
            placeholder="Post title"
            value={post.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="mb-4 w-full border-b border-ash/20 bg-transparent pb-3 font-display text-3xl font-600 text-ink outline-none transition-colors focus:border-safelight dark:border-ash/30 dark:text-paper"
          />

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <select
              value={post.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="rounded-lg border border-ash/25 bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition-colors focus:border-safelight dark:border-ash/35 dark:bg-night-surface dark:text-paper"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-3 font-mono text-xs text-ash">
              <span>{words.toLocaleString()} words</span>
              <span>&middot;</span>
              <span>{mins} min read</span>
            </div>
          </div>

          <div className="mb-6">
            <CoverImageUploader
              value={post.coverImage}
              onChange={(img) => updateField("coverImage", img)}
            />
          </div>

          <RichTextEditor
            content={post.content}
            onChange={(html) => updateField("content", html)}
          />
        </>
      )}
    </div>
  );
}
