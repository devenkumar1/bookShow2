import React from "react";
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation";

export function GradientBackground() {
  return (
    (<BackgroundGradientAnimation>
      <div
        className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl ">
            <h1>Login to continue</h1>
        <p
          className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          please fill the required fields
        </p>
      
      </div>
    </BackgroundGradientAnimation>)
  );
}
