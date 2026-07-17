import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import { excerpt, formatDate, readingTime } from "../lib/utils";

export default function PostCard({ post }) {
  return (
    <Link
      to={`/posts/${post.slug}`}
      className="group flex gap-5 py-6 transition-opacity hover:opacity-90 sm:gap-6"
    >
      <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ash/5 dark:bg-ash/10 sm:h-[100px] sm:w-[100px]">
        {post.coverImage?.url ? (
          <img
            src={post.coverImage.url}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <ImageOff size={20} className="text-ash/30" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-xs text-ash">
          <span className="rounded-full bg-safelight/10 px-2 py-px text-safelight">
            {post.category}
          </span>
          <span>&middot;</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span className="hidden sm:inline">&middot;</span>
          <span className="hidden sm:inline">{readingTime(post.content)}</span>
        </div>
        <h2 className="font-display text-lg font-600 leading-snug text-ink transition-colors group-hover:text-safelight dark:text-paper dark:group-hover:text-safelight">
          {post.title}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ash/80">
          {excerpt(post.content)}
        </p>
      </div>
    </Link>
  );
}
