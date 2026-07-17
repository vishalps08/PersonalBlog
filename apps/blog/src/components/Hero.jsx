import { Link } from "react-router-dom";
import { excerpt, formatDate, readingTime } from "../lib/utils";

export default function Hero({ post }) {
  return (
    <Link
      to={`/posts/${post.slug}`}
      className="group relative mb-8 block overflow-hidden rounded-2xl animate-fade-in-up"
    >
      {post.coverImage?.url ? (
        <>
          <div className="aspect-[16/9] overflow-hidden sm:aspect-[2/1]">
            <img
              src={post.coverImage.url}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs text-white/70">
              <span className="rounded-full bg-safelight px-2.5 py-0.5 text-white">
                {post.category}
              </span>
              <span>&middot;</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span>&middot;</span>
              <span>{readingTime(post.content)}</span>
            </div>
            <h1 className="font-display text-2xl font-700 leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              {post.title}
            </h1>
            <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-white/70">
              {excerpt(post.content, 180)}
            </p>
          </div>
        </>
      ) : (
        <div className="rounded-2xl bg-gradient-to-br from-safelight/5 to-safelight/15 p-6 dark:from-safelight/10 dark:to-safelight/20 sm:p-8">
          <div className="mb-3 flex items-center gap-2 font-mono text-xs text-ash">
            <span className="rounded-full bg-safelight/10 px-2.5 py-0.5 text-safelight">
              {post.category}
            </span>
            <span>&middot;</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>&middot;</span>
            <span>{readingTime(post.content)}</span>
          </div>
          <h1 className="font-display text-2xl font-700 leading-tight tracking-tight text-ink transition-colors group-hover:text-safelight dark:text-paper sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-ash">
            {excerpt(post.content, 180)}
          </p>
        </div>
      )}
    </Link>
  );
}
