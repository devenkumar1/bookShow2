"use client";

import { Carousel } from "./ui/carousel";
export function ShowCarsoule() {
  const slideData = [
    {
      title: "The Amazing Spider Man",
      button: "Explore Component",
      src: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Marvel collections",
      button: "Explore",
      src: "https://images.unsplash.com/photo-1650631968763-87098b86ff60?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fElyb24lMjBtYW58ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Need for Speed",
      button: "Explore ",
      src: "https://images.unsplash.com/photo-1575844611093-ed16474b4f44?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmVlZCUyMGZvciUyMHNwZWVkfGVufDB8fDB8fHww",
    },
    {
      title: "Desert Whispers",
      button: "Explore ",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    (<>
    <h1 className="text-3xl md:text-5xl font-bold text-center dark:text-white pt-12 ">Trending worldwide</h1>
    <div className="relative overflow-hidden w-full md:h-full min-w-full py-20  sm:overflow-auto md:overflow-hidden ">
      <Carousel slides={slideData} />
    </div>
    </>)
  );
}
