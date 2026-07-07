import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="sprocket-divider" />
      <main className="flex-1 overflow-y-auto bg-paper px-10 py-8">
        <Outlet />
      </main>
    </div>
  );
}