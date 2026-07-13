import { Link } from "react-router-dom";
import { formatDate, readingTime } from "../lib/utils";

export default function Hero({ post }) {
  return (
    <Link to={`/posts/${post.slug}`} className="group mb-4 block">
      {post.coverImage?.url && (
        <div className="mb-5 overflow-hidden rounded-lg">
          <img
            src={post.coverImage.url}
            alt=""
            className="h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] sm:h-[360px]"
          />
        </div>
      )}
      <div className="mb-2 flex items-center gap-2 font-mono text-xs text-ash">
        <span className="text-safelight">{post.category}</span>
        <span>&middot;</span>
        <span>{formatDate(post.publishedAt)}</span>
        <span>&middot;</span>
        <span>{readingTime(post.content)}</span>
      </div>
      <h1 className="font-display text-2xl font-700 leading-tight tracking-tight text-ink transition-colors group-hover:text-safelight dark:text-paper dark:group-hover:text-safelight sm:text-3xl">
        {post.title}
      </h1>
    </Link>
  );
}