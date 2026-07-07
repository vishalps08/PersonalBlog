import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../lib/posts";
import { formatDate } from "../lib/utils";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getPostBySlug(slug)
      .then((res) => setPost(res.data.post))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="mx-auto max-w-3xl px-6 py-10 font-mono text-sm text-ash">Loading…</p>;

  if (notFound) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 font-display text-2xl text-ink">Post not found</p>
        <Link to="/" className="font-mono text-sm text-safelight hover:underline">
          ← Back home
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      {post.coverImage?.url && (
        <img
          src={post.coverImage.url}
          alt=""
          className="mb-6 h-[400px] w-full rounded-lg object-cover"
        />
      )}
      <div className="mb-3 flex items-center gap-2 font-mono text-xs text-ash">
        <span className="text-safelight">{post.category}</span>
        <span>·</span>
        <span>{formatDate(post.publishedAt)}</span>
      </div>
      <h1 className="mb-6 font-display text-4xl font-700 leading-tight text-ink">
        {post.title}
      </h1>
      <div
        className="prose prose-neutral max-w-none prose-headings:font-display prose-a:text-safelight"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="mt-12 border-t border-ash/15 pt-6">
        <Link to="/" className="font-mono text-sm text-safelight hover:underline">
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}