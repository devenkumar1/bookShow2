// app/layout.js
"use client"; // This ensures the file is treated as a client component
import SideBar from "@/components/SideBar";
export default function HomeLayout({ children }) {
  return (
    <div className="min-h-screen  antialiased">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/5 bg-blue-500 ">
          <SideBar />
        </div>

        {/* Main content area */}
        <div className="w-full md:4/5 border">
          
    
          <main>{children}</main>
        </div>
      </div>

      
    </div>
  );
}
