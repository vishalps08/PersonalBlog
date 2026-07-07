import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";

export default function Hero({ post }) {
  return (
    <Link to={`/posts/${post.slug}`} className="group mb-4 block">
      {post.coverImage?.url && (
        <div className="mb-5 overflow-hidden rounded-lg">
          <img
            src={post.coverImage.url}
            alt=""
            className="h-[360px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="mb-2 flex items-center gap-2 font-mono text-xs text-ash">
        <span className="text-safelight">{post.category}</span>
        <span>·</span>
        <span>{formatDate(post.publishedAt)}</span>
      </div>
      <h1 className="font-display text-3xl font-700 leading-tight text-ink group-hover:text-safelight">
        {post.title}
      </h1>
    </Link>
  );
}