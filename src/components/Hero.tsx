"use client";

import { ProfileDetails } from "@/types/basicDetails";
import React, { useEffect, useState } from "react";
// Assuming iconMap and FiChevronDown are correctly imported
import iconMap from "@/components/ui/iconMap";
import { FiChevronDown } from "react-icons/fi";

const Hero = ({ basicData }: { basicData: ProfileDetails }) => {
  const [profession, setProfession] = useState<string>("Loading...");
  const [professionKey, setProfessionKey] = useState(0);
  const [heroHeight, setHeroHeight] = useState("calc(100vh - 64px)"); // State for dynamic height

  useEffect(() => {
    const professions = basicData?.TechField ?? [];
    if (!professions.length) {
      setProfession("Full Stack Developer");
      return;
    }

    let index = 0;
    const changeProfession = () => {
      setProfession(professions[index]);
      setProfessionKey((p) => p + 1);
      index = (index + 1) % professions.length;
    };

    changeProfession();
    const interval = setInterval(changeProfession, 3500);
    return () => clearInterval(interval);
  }, [basicData]);

  // Dynamic Height Adjustment for Mobile Viewports (fixes 100vh issue)
  useEffect(() => {
    const headerHeight = 64; // Height of the fixed header
    const updateHeight = () => {
      // Use window.innerHeight (the visual viewport height)
      setHeroHeight(`${window.innerHeight - headerHeight}px`);
    };

    // Set initial height
    updateHeight();

    // Re-calculate on resize/orientation change (important for mobile toolbars)
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section
      id="hero"
      className="w-full pt-[64px] bg-slate-900/50 relative overflow-hidden"
      // Use dynamic heroHeight state instead of static calc(100vh - 64px)
      style={{ height: heroHeight }}
    >
      {/* background blobs (Good, already responsive with vw/vh units) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute -left-24 top-1/4 w-[55vw] h-[70vh] rounded-full blur-[120px] opacity-40 animate-blob-slow"
          style={{
            background:
              "radial-gradient(closest-side, rgba(99,102,241,0.18), rgba(79,70,229,0.05))",
            transform: "translateZ(0)",
          }}
        />
        <div
          className="absolute -right-24 bottom-0 w-[50vw] h-[65vh] rounded-full blur-[120px] opacity-30 animate-blob-slow delay-2000"
          style={{
            background:
              "radial-gradient(closest-side, rgba(56,189,248,0.12), rgba(99,102,241,0.03))",
            transform: "translateZ(0)",
          }}
        />
        {/* subtle overlay to make center darker */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center h-full text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="space-y-6 sm:space-y-8"> {/* Reduced space-y for mobile */}
            <div className="space-y-2 sm:space-y-4"> {/* Reduced space-y for mobile */}
              <p
                className="text-sm sm:text-lg md:text-xl text-indigo-400 font-medium tracking-widest uppercase opacity-0 animate-fade-in-up" // Reduced base text size
                style={{ animationDelay: "0.1s" }}
              >
                Hello, I&apos;m
              </p>

              <h1
                className="text-5xl sm:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg opacity-0 animate-fade-in-up" // Reduced base text size (6xl -> 5xl)
                style={{ animationDelay: "0.3s" }}
              >
                {basicData?.FullName ?? "Your Name"}
              </h1>

              {/* Profession H2 Container */}
              <div className="h-10 sm:h-12 md:h-16 flex items-center justify-center"> {/* Reduced height for mobile */}
                <h2
                  key={professionKey}
                  className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-300 opacity-0 profession-fade" // Reduced base text size
                  style={{ animationDuration: "700ms" }}
                >
                  {profession}
                </h2>
              </div>
            </div>

            <p
              className="text-base sm:text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-normal opacity-0 animate-fade-in-up px-2" // Reduced base text size and added horizontal padding for max-w
              style={{ animationDelay: "0.5s" }}
            >
              {basicData?.ShortDescription ?? "I build things that scale."}
            </p>

            {/* Buttons (Already good with sm:flex-row) */}
            <div
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center pt-6 sm:pt-8 opacity-0 animate-fade-in-up" // Reduced padding and gap slightly
              style={{ animationDelay: "0.7s" }}
            >
              <a
                href="#projects"
                className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-full transition-all duration-500 transform hover:scale-105 shadow-xl shadow-indigo-500/30 whitespace-nowrap tracking-wide"
              >
                View My Projects ✨
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg border-2 border-slate-600 text-white font-semibold rounded-full transition-all duration-500 hover:bg-slate-700 hover:border-slate-500 transform hover:scale-105 whitespace-nowrap tracking-wide"
              >
                Get In Touch 📧
              </a>
            </div>

            {/* Social Icons */}
            <div
              className="flex justify-center space-x-4 pt-8 opacity-0 animate-fade-in-up" // Reduced space-x and padding slightly
              style={{ animationDelay: "0.9s" }}
            >
              {basicData?.Social?.map((item, i) => (
                <a
                  key={i}
                  href={item?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-slate-800/50 border border-slate-700 text-white text-xl sm:text-2xl hover:bg-indigo-500 hover:border-indigo-500 transition-all duration-300 hover:scale-110 shadow-lg" // Reduced size
                  aria-label={item?.name}
                >
                  {iconMap[item?.name]}
                </a>
              ))}
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-opacity duration-500 opacity-80 hover:opacity-100">
            <FiChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" /> {/* Reduced size */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;