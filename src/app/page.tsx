"use client";
import Header from "@/components/Header";
import Image from "next/image";
import Hero from "@/components/Hero";
import herobg from "@/assets/hero_bg.jpg";
import { ProfileDetails } from "@/types/basicDetails";
import { useEffect, useState } from "react";
import { fetchBasicDetails } from "@/services/basicDetails.service";
import LoadingPage from "@/components/ui/LoadingPage";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import TechStackVisualization from "@/components/TechStackVisualization";

export default function Home() {
  const [basicData, setBasicData] = useState<ProfileDetails>();
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBasicDetails();
      setBasicData(data ?? undefined);
    }

    fetchData();

    // fetch component toggles
    (async () => {
      try {
        const res = await fetch('/api/admin/components');
        const json = await res.json();
        const map: Record<string, boolean> = {};
        (json.components || []).forEach((c: any) => {
          // key is relative path like 'Hero.tsx' or 'admin/Sidebar.tsx'
          map[c.name] = c.enabled;
          map[c.key] = c.enabled;
        });
        setToggles(map);
      } catch (e) {
        console.error('Failed to load component toggles', e);
      }
    })();
  }, []);

  if (!basicData) {
    return <LoadingPage />;
  }

  const show = (componentName: string) => {
    // default to true if not set
    return toggles[componentName] ?? true;
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center">
      {/* Background Image Container - Optimized for responsiveness and fixed positioning */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
        <Image
          src={herobg}
          alt="Background"
          fill
          priority // Load quickly since it's the main background
          className="object-cover w-full h-full"
          style={{ filter: "blur(8px) brightness(0.4)" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-900 to-purple-900 opacity-70"></div>
      </div>

      {/* Content Wrapper - Use w-full and remove w-[99vw] for better device compatibility */}
      <div className="relative z-10 w-full mx-auto flex flex-col items-center">
        {/*
          NOTE: Components like Header, Hero, About, Skills, Projects, and Footer
          must contain their own max-width wrappers (e.g., max-w-7xl mx-auto px-4)
          to manage internal content width and padding responsively.
        */}

        {basicData && show('Header') && <Header basicData={basicData} />}
        {basicData && show('Hero') && <Hero basicData={basicData} />}
        {basicData && show('About') && <About basicData={basicData} />}
        {show('Skills') && <Skills />}
        {show('TechStackVisualization') && <TechStackVisualization />}
        {show('Projects') && <Projects />}
        {show('Footer') && <Footer />}

        {/* Custom Copyright/Back to Top Section */}
        <div className="py-6 pt-20 border-t bg-[#0f172a] border-slate-800 text-center text-gray-400 w-full">
          <p className="text-sm mb-2">
            © 2025 {basicData.FullName}. Built with Next.js & Tailwind CSS.
          </p>
          <a
            href="#top"
            className="text-sm hover:text-white transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to Top
          </a>
        </div>
      </div>
    </main>
  );
}