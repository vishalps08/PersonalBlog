import { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../lib/posts";
import { formatDate, readingTime } from "../lib/utils";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useTrackView from "../hooks/useTrackView";
import ViewCount from "../components/ViewCount";
import ReadingProgress from "../components/ReadingProgress";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useDocumentTitle(post?.title);

  const handleViewed = useCallback(
    (views) => setPost((p) => (p ? { ...p, views } : p)),
    [],
  );
  useTrackView(slug, handleViewed);

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
      <div className="mx-auto max-w-3xl animate-pulse px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 h-[260px] w-full rounded-xl bg-ash/10 dark:bg-ash/20 sm:h-[400px]" />
        <div className="mb-3 h-3 w-40 rounded bg-ash/10 dark:bg-ash/20" />
        <div className="h-10 w-2/3 rounded bg-ash/10 dark:bg-ash/20" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 sm:py-16">
        <p className="mb-4 font-display text-2xl text-ink dark:text-paper">
          Post not found
        </p>
        <Link
          to="/"
          className="font-mono text-sm text-safelight hover:underline"
        >
          &larr; Back home
        </Link>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        {post.coverImage?.url && (
          <div className="mb-8 overflow-hidden rounded-xl bg-ash/5 shadow-lg dark:bg-ash/10">
            <img
              src={post.coverImage.url}
              alt=""
              className="mx-auto block max-h-[500px] w-full object-contain"
            />
          </div>
        )}
        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs text-ash">
          <span className="rounded-full bg-safelight/10 px-2.5 py-0.5 font-medium text-safelight">
            {post.category}
          </span>
          <span>&middot;</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>&middot;</span>
          <span>{readingTime(post.content)}</span>
          <span>&middot;</span>
          <ViewCount views={post.views} />
        </div>
        <h1 className="mb-8 font-display text-3xl font-700 leading-tight tracking-tight text-ink dark:text-paper sm:text-4xl">
          {post.title}
        </h1>
        <div
          className="prose prose-neutral max-w-none overflow-x-auto prose-headings:font-display prose-p:leading-relaxed prose-a:text-safelight prose-img:mx-auto prose-img:max-h-[500px] prose-img:rounded-xl prose-img:object-contain dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-14 border-t border-ash/15 pt-6 dark:border-ash/25">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 font-mono text-sm text-safelight transition-colors hover:text-safelight/80"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">
              &larr;
            </span>
            Back to all posts
          </Link>
        </div>
      </article>
    </>
  );
}
