import { NavLink } from "react-router-dom";
import { Newspaper, PenSquare, LogOut, Sun, Moon, X, Aperture } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const navItems = [
  { to: "/", label: "Posts", icon: Newspaper, end: true },
  { to: "/posts/new", label: "New Post", icon: PenSquare },
];

export default function Sidebar({ open, onClose }) {
  const { admin, logout } = useAuth();
  const { dark, toggle } = useTheme();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/50 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col justify-between bg-ink px-4 py-6 text-paper transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Aperture size={20} strokeWidth={1.5} className="text-safelight" />
              <h1 className="font-display text-lg font-600 tracking-tight">
                The Safelight
              </h1>
            </div>
            <button
              onClick={onClose}
              className="rounded p-1 text-ash transition-colors hover:text-paper lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mb-4 px-3 font-mono text-[10px] uppercase tracking-widest text-ash/60">
            Dashboard
          </p>
          <nav className="flex flex-col gap-1">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-safelight/15 text-safelight"
                      : "text-ash hover:bg-graphite hover:text-paper"
                  }`
                }
              >
                <Icon size={16} strokeWidth={1.75} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="space-y-1 border-t border-graphite pt-4">
          <p className="mb-2 truncate px-3 font-mono text-xs text-ash">
            {admin?.email}
          </p>
          <button
            onClick={toggle}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ash transition-colors hover:bg-graphite hover:text-paper"
          >
            {dark ? (
              <Sun size={16} strokeWidth={1.75} />
            ) : (
              <Moon size={16} strokeWidth={1.75} />
            )}
            {dark ? "Light mode" : "Dark mode"}
          </button>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ash transition-colors hover:bg-graphite hover:text-paper"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
