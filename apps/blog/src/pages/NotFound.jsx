import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center animate-fade-in-up sm:px-6 sm:py-24">
      <p className="mb-4 font-mono text-7xl font-700 text-ash/20 dark:text-ash/15">
        404
      </p>
      <h1 className="mb-3 font-display text-2xl font-700 text-ink dark:text-paper">
        Page not found
      </h1>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-ash">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 font-mono text-xs text-paper transition-colors hover:bg-safelight dark:bg-paper dark:text-ink dark:hover:bg-safelight dark:hover:text-paper"
      >
        <span className="transition-transform group-hover:-translate-x-0.5">
          &larr;
        </span>
        Back home
      </Link>
    </div>
  );
}
