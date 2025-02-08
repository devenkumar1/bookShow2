// app/layout.js
"use client"; // This ensures the file is treated as a client component
import SideBar from "@/components/SideBar";

export default function HomeLayout({ children }) {
  return (
    <div className="md:min-h-screen w-full flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/5 bg-blue-500">
        <SideBar />
      </div>

      {/* Main content area */}
      <div className="w-full md:w-4/5 flex-1 overflow-auto">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
