"use client";
import { useEffect } from "react";

export default function SyncGithubButton() {
  const handleLogin = () => {
    window.location.href = "/api/github/login"; // start OAuth flow
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      // Call your backend API to sync private repos
      fetch("/api/sync-github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: token }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Repos synced:", data));
    }
  }, []);

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Sync GitHub Repos
    </button>
  );
}
