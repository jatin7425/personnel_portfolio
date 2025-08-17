// LoadingWrapper.tsx (Client Component)
"use client";

import LoadingPage from "@/components/ui/LoadingPage";
import { useState, useEffect, ReactNode } from "react";

export default function LoadingWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return <>{loading ? <LoadingPage /> : children}</>;
}
