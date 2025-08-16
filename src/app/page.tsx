"use client";
import Header from "@/components/Header";
import Image from "next/image";
import Hero from "@/components/Hero";
import herobg from "@/assets/hero_bg.jpg";
import { ProfileDetails } from "@/types/basicDetails";
import { useEffect, useState } from "react";
import { fetchBasicDetails } from "@/services/basicDetails.service";
import LoadingPage from "@/components/ui/LoadingPage";
export default function Home() {
  const [basicData, setBasicData] = useState<ProfileDetails>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBasicDetails();
      setBasicData(data ?? undefined);
    }

    fetchData();
  }, []);
  if (!basicData) {
    return <LoadingPage />;
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
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
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {basicData && <Header basicData={basicData} />}
        {basicData && <Hero basicData={basicData} />}
      </div>
    </main>
  );
}
