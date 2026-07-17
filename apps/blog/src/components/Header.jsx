import { Link, NavLink } from "react-router-dom";
import { Aperture } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ash/15 bg-paper/80 backdrop-blur-lg dark:border-ash/25 dark:bg-night/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link
          to="/"
          className="group flex items-center gap-2 font-display text-lg font-600 text-ink dark:text-paper sm:gap-2.5 sm:text-xl"
        >
          <Aperture
            size={20}
            strokeWidth={1.5}
            className="text-safelight transition-transform duration-300 group-hover:rotate-45 sm:h-[22px] sm:w-[22px]"
          />
          <span className="hidden min-[400px]:inline">The Safelight</span>
          <span className="min-[400px]:hidden">Safelight</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="flex gap-4 font-mono text-[11px] uppercase tracking-wide text-ash sm:gap-6 sm:text-xs">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative transition-colors ${
                  isActive
                    ? "text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-safelight dark:text-paper"
                    : "hover:text-ink dark:hover:text-paper"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `relative transition-colors ${
                  isActive
                    ? "text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-safelight dark:text-paper"
                    : "hover:text-ink dark:hover:text-paper"
                }`
              }
            >
              About
            </NavLink>
          </nav>
          <div className="hidden h-4 w-px bg-ash/20 dark:bg-ash/30 sm:block" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
