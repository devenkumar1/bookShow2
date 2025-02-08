'use client'
import { BlurredTextDiv } from "@/components/BlurredTextDiv";
import { NonStopScroll } from "@/components/NonStopScrool";
import { PlayNoise } from "@/components/PlayNoise";
import { ShowCarsoule } from "@/components/ShowCarsoule";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "@/store/userSlice";

function LandingPage() {
  const navigate = useRouter();
  const{userData} = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      navigate.push('/home');
    }
  }, [userData, navigate]);

  if (!userData) {
    return (
      <div>
        {/* A div with background image and Text */}
        <div className="relative w-full md:h-screen h-[60vh] bg-black bg-opacity-30">
          {/* Background Image with blur */}
          <div className="absolute inset-0 z-0 bg-blur-lg bg-opacity-50">
            <Image
              src="https://images.pexels.com/photos/436413/pexels-photo-436413.jpeg"
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 z-0"
            />
          </div>

          {/* Glassmorphism Effect */}
          <div className="absolute inset-0 z-10 bg-white bg-opacity-20 gap-2 backdrop-blur-lg flex flex-col items-center justify-center">
            {/* Main Heading */}
            <h1 className="text-white font-extrabold text-3xl md:text-6xl lg:text-8xl text-center px-4 md:px-8">
              Welcome to the Show Stoppers
            </h1>
            <p className="text-white text-xl md:text-3xl pt-2  text-center px-4">
              A place where we share your favorite shows
            </p>
          </div>
        </div>

        <BlurredTextDiv />

        <ShowCarsoule />
        <NonStopScroll />
        <div className="overflow-hidden"><PlayNoise /></div>
      </div>
    );
  }


  return null;
}

export default LandingPage;
