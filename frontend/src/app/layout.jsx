// app/layout.js
"use client"; // This ensures the file is treated as a client component
import { Provider } from "react-redux";
import store from "@/store";
import { Toaster } from "react-hot-toast";

// Import your icons (if you are using react-icons)
import "./globals.css"; // Include global styles if needed
import { Navbar } from "@/components/Navbar";
import FooterComponent from "@/components/FooterComponent";

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <Provider store={store}>
          <Toaster/>
          <Navbar />

          {children} 

          {/* Footer component */}
          <FooterComponent />
        </Provider>
      </body>
    </html>
  );
}
