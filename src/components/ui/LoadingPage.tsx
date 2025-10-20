"use client";
import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white w-full">
      {/* Glowing animated logo */}
      <div className="mb-8 animate-pulse">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg shadow-pink-500/50"></div>
      </div>

      {/* Typing dots */}
      <div className="flex space-x-2 mb-4">
        <span className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"></span>
        <span className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-150"></span>
        <span className="w-4 h-4 bg-indigo-500 rounded-full animate-bounce delay-300"></span>
      </div>

      {/* Fancy text */}
      <p className="text-lg font-mono tracking-widest animate-pulse text-center">
        Fetching the secrets of the universe...
      </p>
    </div>
  );
}
