import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="sprocket-divider hidden lg:block" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center border-b border-ash/15 bg-paper px-4 py-3 lg:hidden dark:border-ash/25 dark:bg-night">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-ash transition-colors hover:bg-ash/10 hover:text-ink dark:hover:text-paper"
          >
            <Menu size={20} />
          </button>
          <span className="ml-3 font-display text-sm font-600 text-ink dark:text-paper">
            The Safelight
          </span>
        </div>
        <main className="flex-1 overflow-y-auto bg-paper px-4 py-6 sm:px-8 sm:py-8 lg:px-10 dark:bg-night">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
