import { NavLink } from "react-router-dom";
import { Newspaper, PenSquare, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/", label: "Posts", icon: Newspaper, end: true },
  { to: "/posts/new", label: "New Post", icon: PenSquare },
];

export default function Sidebar() {
  const { admin, logout } = useAuth();

  return (
    <aside className="flex h-screen w-56 flex-col justify-between bg-ink px-4 py-6 text-paper">
      <div>
        <h1 className="mb-8 font-display text-xl font-600 tracking-tight">
          Personal Blog
        </h1>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-graphite text-paper"
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

      <div className="border-t border-graphite pt-4">
        <p className="mb-2 truncate font-mono text-xs text-ash">{admin?.email}</p>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded px-3 py-2 text-sm text-ash transition-colors hover:bg-graphite hover:text-paper"
        >
          <LogOut size={16} strokeWidth={1.75} />
          Log out
        </button>
      </div>
    </aside>
  );
}