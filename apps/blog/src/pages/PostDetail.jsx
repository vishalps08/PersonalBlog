import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../lib/posts";
import { formatDate, readingTime } from "../lib/utils";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useTrackView from "../hooks/useTrackView";
import ViewCount from "../components/ViewCount";


export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useDocumentTitle(post?.title);
  useTrackView(post?.slug);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getPostBySlug(slug)
      .then((res) => setPost(res.data.post))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse px-6 py-10">
        <div className="mb-6 h-[260px] w-full rounded-lg bg-ash/10 dark:bg-ash/20 sm:h-[400px]" />
        <div className="mb-3 h-3 w-40 rounded bg-ash/10 dark:bg-ash/20" />
        <div className="h-10 w-2/3 rounded bg-ash/10 dark:bg-ash/20" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 font-display text-2xl text-ink dark:text-paper">Post not found</p>
        <Link to="/" className="font-mono text-sm text-safelight hover:underline">
          &larr; Back home
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
          className="mb-6 h-[260px] w-full rounded-lg object-cover sm:h-[400px]"
        />
      )}
      <div className="mb-3 flex items-center gap-2 font-mono text-xs text-ash">
        <span className="text-safelight">{post.category}</span>
        <span>&middot;</span>
        <span>{formatDate(post.publishedAt)}</span>
        <span>&middot;</span>
        <span>{readingTime(post.content)}</span>
        <span>&middot;</span>
        <ViewCount views={post.views} />
      </div>
      <h1 className="mb-6 font-display text-3xl font-700 leading-tight tracking-tight text-ink dark:text-paper sm:text-4xl">
        {post.title}
      </h1>
      <div
        className="prose prose-neutral max-w-none prose-headings:font-display prose-a:text-safelight dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="mt-12 border-t border-ash/15 pt-6 dark:border-ash/25">
        <Link to="/" className="font-mono text-sm text-safelight hover:underline">
          &larr; Back to all posts
        </Link>
      </div>
    </article>
  );
}