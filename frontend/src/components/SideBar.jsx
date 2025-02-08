'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBars } from 'react-icons/fa';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false); // To toggle the sidebar visibility
  const router = useRouter();

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:pt-12 pt-1">
      {/* Hamburger icon for mobile view */}
      <div className="md:hidden flex justify-between items-center">
        <button 
          onClick={toggleSidebar}
          className="text-white text-3xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar that will appear as a dropdown on mobile */}
      <aside className={`flex flex-col md:flex justify-center md:min-h-screen md:w-auto w-full md:h-auto ${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="flex flex-col gap-7 items-center md:items-start">
          <li></li>
          <li></li>
          <li className="w-full">
            <Link
              href="/home"
              className={`block text-center py-2 text-white 
                ${router.pathname === '/home' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                transition rounded-md`}
            >
              Home
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/media/movies"
              className={`block text-center py-2 text-white 
                ${router.pathname === '/media/movies' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                transition rounded-md`}
            >
              Movies
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/media/shows"
              className={`block text-center py-2 text-white 
                ${router.pathname === '/media/shows' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                transition rounded-md`}
            >
              Shows
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/user/tickets"
              className={`block text-center py-2 text-white 
                ${router.pathname === '/user/tickets' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                transition rounded-md`}
            >
              Booked Tickets
            </Link>
          </li>
          <li className="w-full">
            <Link
              href="/user/profile"
              className={`block text-center py-2 text-white 
                ${router.pathname === '/user/profile' ? 'bg-blue-700' : 'hover:bg-blue-600'} 
                transition rounded-md`}
            >
              Profile
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default SideBar;
