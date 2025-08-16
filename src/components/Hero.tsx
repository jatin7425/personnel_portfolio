"use client";

import { ProfileDetails } from "@/types/basicDetails";
import React, { useEffect, useState } from "react";
import iconMap from "@/components/ui/iconMap";

const Hero = ({ basicData }: { basicData: ProfileDetails }) => {
  const [profesion, setProfesion] = useState<string>();

  useEffect(() => {
    if (basicData) {
      const professions = [...(basicData?.TechField ?? [])];
      let index = 0;
      const changeProfession = () => {
        setProfesion(professions[index]);
        index = (index + 1) % professions.length;
      };
      changeProfession();
      const interval = setInterval(changeProfession, 3000);
      return () => clearInterval(interval);
    }
  }, [basicData]);

  return (
    <section
      className="w-screen mt-[64px]"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center h-full text-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-blue-300 font-medium tracking-wide">
                Hello, I'm
              </p>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {basicData?.FullName}
              </h1>
              <div className="h-16 flex items-center justify-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 transition-all duration-500">
                  {profesion || "Loading..."}
                </h2>
              </div>
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {basicData?.ShortDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl whitespace-nowrap cursor-pointer">
                View My Work
              </button>
              <button className="px-8 py-4 border-2 border-white/30 hover:border-white/50 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 whitespace-nowrap cursor-pointer">
                Get In Touch
              </button>
            </div>
            <div className="flex justify-center space-x-6 pt-8">
              {basicData &&
                basicData?.Social?.map((item, i) => (
                  <a
                    key={i}
                    href={item?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer"
                    aria-label="GitHub"
                  >
                    {iconMap[item?.name]}
                  </a>
                ))}
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
