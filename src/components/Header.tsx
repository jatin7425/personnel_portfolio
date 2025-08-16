import React, { useEffect, useState } from "react";
import { ProfileDetails } from "@/types/basicDetails";

export default function Header({ basicData }: { basicData: ProfileDetails }) {
  const [GitHubLink, setGitHubLink] = useState<string>();

  useEffect(() => {
    if (basicData) {
      const SocialLinks = basicData?.Social;
      SocialLinks.map((SocialLink) => {
        if (SocialLink?.name.toLowerCase() == "GitHub".toLowerCase()) {
          setGitHubLink(SocialLink?.link);
        }
      });
    }
  }, [basicData]);

  return (
    <header
      id="hero"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-['Pacifico'] text-blue-600 dark:text-blue-400">
              DevPortfolio
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#hero"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-sun-line text-2xl"></i>
              </div>
            </button>
            <a
              href={GitHubLink as string}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-github-fill text-2xl"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
