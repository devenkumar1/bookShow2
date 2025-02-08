'use client';
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, handleLogout } from "@/store/userSlice";
import { IoEnterOutline } from "react-icons/io5";
import Link from "next/link";
import { FloatingDock } from "./ui/floating-dock"; // Assuming you have this component
import { FiHelpCircle } from "react-icons/fi";
import { BiMoviePlay } from "react-icons/bi";
import { RiMovie2AiFill } from "react-icons/ri";
import { IconBrandGithub, IconHome } from "@tabler/icons-react";
import { getAllMovies } from "@/store/MovieSlice";
import toast from "react-hot-toast";

export function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false); // Manage client-side rendering

  const { userData, loading } = useSelector((state) => state.user);
  const { movies } = useSelector((state) => state.movies);

  // Ensure data fetching only on client-side
  useEffect(() => {
    // Fetch movies and user data on client-side
    if (movies.length === 0) {
      dispatch(getAllMovies());
    }


    if (!userData) {
      dispatch(getUserData());
    }

    setIsClient(true);
  }, [dispatch, userData, movies]);

  const logoutHandler = async () => {
    try {
      dispatch(handleLogout());
      toast.success("Logout successful");
      router.push('/login');
    } catch (error) {
      toast.error(error);
      console.error("Logout failed", error);
    }
  };

  // Navbar links
  const links = [
    { title: "Home", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/" },
    { title: "Book Shows", icon: <BiMoviePlay />, href: "#" },
    { title: "Theatres", icon: <RiMovie2AiFill />, href: "#" },
    { title: "Help", icon: <FiHelpCircle />, href: "#" },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "https://github.com/devenkumar1"
    },
  ];

  if (!isClient) return null;

  return (
    <div className="w-full h-full top-10 md:h-20 flex items-center  md:mt-15 mb-5 fixed md:top-5 z-50">
      <FloatingDock items={links} />

      {isClient && !userData ? (
        <div className="absolute md:right-10 md:top-5 right-2 top-0 space-x-2 md:space-x-4">
          <Link href="/signup" className="text-white px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">
            Sign Up
          </Link>
          <Link href="/login" className="text-white px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-900">
            Login
          </Link>
        </div>
      ) : (
        isClient && userData && (
          <div className="absolute right-10 top-5 text-white font-semibold  text-xs cursor-pointer hover:scale-125">
            <IoEnterOutline onClick={logoutHandler} className=" bg-red-400 text-4xl rounded-lg" />
            <span>Logout</span>
          </div>
        )
      )}
    </div>
  );
}
