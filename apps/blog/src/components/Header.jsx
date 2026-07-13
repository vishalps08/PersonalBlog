import { Link, NavLink } from "react-router-dom";
import { Aperture } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-ash/15 dark:border-ash/25">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-600 text-ink dark:text-paper">
          <Aperture size={20} strokeWidth={1.5} className="text-safelight" />
          Personal Blog
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex gap-6 font-mono text-xs uppercase tracking-wide text-ash">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "text-ink dark:text-paper" : "hover:text-ink dark:hover:text-paper"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-ink dark:text-paper" : "hover:text-ink dark:hover:text-paper"
              }
            >
              About
            </NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}