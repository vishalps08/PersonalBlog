import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { PenSquare, Trash2, ImageOff, Search, Eye, Plus } from "lucide-react";
import { getAdminPosts, deletePost, CATEGORIES } from "../lib/posts";
import StatusBadge from "../components/StatusBadge";
import ConfirmModal from "../components/ConfirmModal";

function stripHtml(html) {
  const el = document.createElement("div");
  el.innerHTML = html;
  return el.textContent || "";
}

function wordCount(html) {
  return stripHtml(html).trim().split(/\s+/).filter(Boolean).length;
}

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await getAdminPosts({ limit: 50 });
      setPosts(res.data.posts);
    } catch {
      toast.error("Couldn't load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deletePost(deleteTarget._id);
      toast.success("Post deleted");
      setPosts((prev) => prev.filter((p) => p._id !== deleteTarget._id));
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteTarget(null);
    }
  }

  const filtered = posts.filter((p) => {
    if (filterCategory && p.category !== filterCategory) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl p-4">
            <div className="skeleton-shimmer h-14 w-14 shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="skeleton-shimmer h-4 w-2/3 rounded" />
              <div className="skeleton-shimmer h-3 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-600 text-ink dark:text-paper">
          Posts
          <span className="ml-2 font-mono text-sm font-normal text-ash">
            {posts.length}
          </span>
        </h1>
        <Link
          to="/posts/new"
          className="inline-flex items-center gap-1.5 rounded-lg bg-safelight px-4 py-2.5 text-sm font-medium text-paper transition-all hover:bg-safelight/90"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-ash/20 bg-white px-3 py-2 transition-colors focus-within:border-safelight dark:border-ash/30 dark:bg-night-surface">
          <Search size={15} className="text-ash" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm outline-none placeholder:text-ash/50 dark:text-paper"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-lg border border-ash/20 bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition-colors focus:border-safelight dark:border-ash/30 dark:bg-night-surface dark:text-paper"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-ash/20 bg-white px-3 py-2 font-mono text-xs text-ink outline-none transition-colors focus:border-safelight dark:border-ash/30 dark:bg-night-surface dark:text-paper"
        >
          <option value="">All status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ash/25 py-16 text-center dark:border-ash/35">
          <p className="font-mono text-sm text-ash">
            {posts.length === 0
              ? "No posts yet — write your first one."
              : "No posts match your filters."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-ash/15 dark:border-ash/25">
          <div className="hidden border-b border-ash/15 bg-ash/5 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-ash sm:flex dark:border-ash/25 dark:bg-ash/10">
            <span className="w-16 shrink-0" />
            <span className="flex-1 pl-4">Title</span>
            <span className="w-28 text-center">Category</span>
            <span className="w-20 text-center">Status</span>
            <span className="w-16 text-center">Views</span>
            <span className="w-24 text-center">Updated</span>
            <span className="w-20" />
          </div>

          <div className="divide-y divide-ash/10 dark:divide-ash/20">
            {filtered.map((post) => (
              <div
                key={post._id}
                className="flex flex-col gap-3 px-4 py-3 transition-colors hover:bg-ash/[0.03] sm:flex-row sm:items-center sm:gap-0 dark:hover:bg-ash/[0.06]"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-graphite/5 dark:bg-ash/10 sm:h-12 sm:w-12">
                  {post.coverImage?.url ? (
                    <img
                      src={post.coverImage.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageOff size={16} className="text-ash/40" />
                  )}
                </div>

                <div className="min-w-0 flex-1 sm:pl-4">
                  <p className="truncate font-display text-sm font-600 text-ink dark:text-paper">
                    {post.title}
                  </p>
                  <div className="mt-0.5 flex items-center gap-2 font-mono text-[11px] text-ash sm:hidden">
                    <span>{post.category}</span>
                    <span>&middot;</span>
                    <span>{wordCount(post.content)} words</span>
                  </div>
                </div>

                <span className="hidden w-28 text-center font-mono text-xs text-ash sm:block">
                  {post.category}
                </span>

                <div className="hidden w-20 justify-center sm:flex">
                  <StatusBadge status={post.status} />
                </div>

                <span className="hidden w-16 text-center font-mono text-xs tabular-nums text-ash sm:block">
                  <span className="inline-flex items-center gap-1">
                    <Eye size={12} />
                    {post.views || 0}
                  </span>
                </span>

                <span className="hidden w-24 text-center font-mono text-[11px] text-ash sm:block">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-1 sm:w-20 sm:justify-end">
                  <StatusBadge status={post.status} />
                  <div className="ml-auto flex gap-1 sm:ml-0">
                    <Link
                      to={`/posts/${post._id}/edit`}
                      className="rounded-lg p-2 text-ash transition-colors hover:bg-ash/10 hover:text-ink dark:hover:text-paper"
                      title="Edit"
                    >
                      <PenSquare size={15} strokeWidth={1.75} />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(post)}
                      className="rounded-lg p-2 text-ash transition-colors hover:bg-safelight/10 hover:text-safelight"
                      title="Delete"
                    >
                      <Trash2 size={15} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete post"
        message={`"${deleteTarget?.title}" will be permanently deleted.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
