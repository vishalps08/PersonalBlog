import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-ash/15">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link to="/" className="font-display text-xl font-600 text-ink">
          Personal Blog
        </Link>
      </div>
    </header>
  );
}