import { Link } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="mb-2 font-mono text-sm text-ash">404</p>
      <h1 className="mb-4 font-display text-3xl font-700 text-ink dark:text-paper">
        Page not found
      </h1>
      <p className="mb-6 text-ash">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="font-mono text-sm text-safelight hover:underline">
        &larr; Back home
      </Link>
    </div>
  );
}
