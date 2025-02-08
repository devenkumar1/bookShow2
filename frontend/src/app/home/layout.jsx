// app/layout.js
"use client"; // This ensures the file is treated as a client component
import { Provider } from "react-redux";
import store from "@/store";
import { FloatingDock } from "@/components/ui/floating-dock"; // Import the FloatingDock component (replace with correct import)
import { TiHome, TiInfo } from "react-icons/ti";
import { FaUser } from "react-icons/fa"; // Import your icons (if you are using react-icons)

import { Navbar } from "@/components/Navbar";
import FooterComponent from "@/components/FooterComponent";
import SideBar from "@/components/SideBar";

export default function HomeLayout({ children }) {
  return (
    <div className="md:min-h-screen  antialiased">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/5 bg-blue-500  ">
          <SideBar />
        </div>

        {/* Main content area */}
        <div className="w-full md:4/5 p-4">
          
    
          <main>{children}</main>
        </div>
      </div>

      
    </div>
  );
}
