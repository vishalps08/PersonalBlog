import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { PenSquare, Trash2, ImageOff } from "lucide-react";
import { getAdminPosts, deletePost } from "../lib/posts";
import StatusBadge from "../components/StatusBadge";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await getAdminPosts({ limit: 50 });
      setPosts(res.data.posts);
    } catch (err) {
      toast.error("Couldn't load posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    try {
      await deletePost(id);
      toast.success("Post deleted");
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  }

  if (loading) {
    return <p className="font-mono text-sm text-ash">Loading posts&hellip;</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-600 text-ink dark:text-paper">Posts</h1>
        <Link
          to="/posts/new"
          className="rounded bg-safelight px-4 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-ash/30 py-16 text-center dark:border-ash/40">
          <p className="font-mono text-sm text-ash">No posts yet &mdash; write your first one.</p>
        </div>
      ) : (
        <div className="divide-y divide-ash/15 rounded-lg border border-ash/15 dark:divide-ash/25 dark:border-ash/25">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-ash/5 dark:hover:bg-ash/10"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded bg-graphite/5 dark:bg-ash/10">
                {post.coverImage?.url ? (
                  <img
                    src={post.coverImage.url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageOff size={18} className="text-ash/50" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-600 text-ink dark:text-paper">
                  {post.title}
                </p>
                <div className="mt-1 flex items-center gap-3 font-mono text-xs text-ash">
                  <span>{post.category}</span>
                  <span>·</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <StatusBadge status={post.status} />

              <div className="flex items-center gap-1">
                <Link
                  to={`/posts/${post._id}/edit`}
                  className="rounded p-2 text-ash transition-colors hover:bg-ash/10 hover:text-ink"
                  title="Edit"
                >
                  <PenSquare size={16} strokeWidth={1.75} />
                </Link>
                <button
                  onClick={() => handleDelete(post._id, post.title)}
                  className="rounded p-2 text-ash transition-colors hover:bg-safelight/10 hover:text-safelight"
                  title="Delete"
                >
                  <Trash2 size={16} strokeWidth={1.75} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}