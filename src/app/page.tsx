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
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      {/* Background Image */}
      <div className="fixed top-0 inset-0 z-0">
        <Image
          src={herobg}
          alt="Background"
          fill
          className="object-cover w-full h-full"
          style={{ filter: "blur(8px) brightness(0.4)" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-900 to-purple-900 opacity-70"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 w-[99vw] mx-auto overflow-x-hidden flex flex-col items-center justify-center">
        {basicData && show('Header') && <Header basicData={basicData} />}
        {basicData && show('Hero') && <Hero basicData={basicData} />}
        {basicData && show('About') && <About basicData={basicData} />}
        {show('Skills') && <Skills />}
        {show('TechStackVisualization') && <TechStackVisualization />}
        {show('Projects') && <Projects />}
      </div>
    </main>
  );
}
