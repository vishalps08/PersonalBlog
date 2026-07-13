import { Link } from "react-router-dom";
import { ImageOff } from "lucide-react";
import { excerpt, formatDate, readingTime } from "../lib/utils";

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.slug}`} className="group flex gap-5 py-6">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded bg-ash/5 dark:bg-ash/10">
        {post.coverImage?.url ? (
          <img
            src={post.coverImage.url}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <ImageOff size={18} className="text-ash/40" />
        )}
      </div>

      <div className="min-w-0">
        <div className="mb-1.5 flex items-center gap-2 font-mono text-xs text-ash">
          <span>{post.category}</span>
          <span>&middot;</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span>&middot;</span>
          <span>{readingTime(post.content)}</span>
        </div>
        <h2 className="font-display text-lg font-600 leading-snug text-ink transition-colors group-hover:text-safelight dark:text-paper">
          {post.title}
        </h2>
        <p className="mt-1 line-clamp-2 text-sm text-ash">{excerpt(post.content)}</p>
      </div>
    </Link>
  );
}