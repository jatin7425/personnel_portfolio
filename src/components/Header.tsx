"use client";
import React, { useEffect, useState } from "react";
import { ProfileDetails } from "@/types/basicDetails";
import { Menu, X, Sun, Moon, Github } from "lucide-react"; // Import necessary icons

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header({ basicData }: { basicData: ProfileDetails }) {
  const [GitHubLink, setGitHubLink] = useState<string>();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // 1. Fetch GitHub Link from basicData
  useEffect(() => {
    if (basicData?.Social) {
      // Use find for efficiency instead of map
      const gitHubSocial = basicData.Social.find(
        (link) => link?.name.toLowerCase() === "github"
      );
      setGitHubLink(gitHubSocial?.link);
    }
  }, [basicData]);

  // 2. Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Simple dark mode toggle placeholder (since the logic isn't provided)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    // In a real application, you'd add/remove 'dark' class on the HTML tag here
    setIsDarkMode(!isDarkMode);
    console.log("Dark mode toggled!");
  };

  const handleLinkClick = () => {
    // Close the mobile menu when a link is clicked
    setIsMenuOpen(false);
  };

  // Base classes for a navigation item
  const linkClasses =
    "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer";
  return (
    <header
      id="header"
      // Default classes for mobile (solid/semi-solid background)
      // md:bg-transparent for desktop ONLY when not scrolled.
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        
        // 1. Base (Mobile Default - Solid)
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm 
        shadow-md

        // 2. Desktop Non-Scrolled State (Transparent)
        md:bg-transparent md:shadow-none

        // 3. Scrolled State (Overrides all previous BGs)
        ${scrolled
          ? // Scrolled: Keep solid/blur on all screens
          "shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
          : // Not Scrolled: On desktop (md:), it will use md:bg-transparent from above.
          // On mobile, it will use the default solid bg from above.
          ""
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Name */}
          <div className="flex items-center flex-shrink-0">
            <span className={`text-2xl font-['Pacifico'] transition-colors ${scrolled ? 'text-blue-600 dark:text-blue-400' : 'text-white dark:text-blue-400'}`}>
              DevPortfolio
            </span>
          </div>

          {/* Desktop Navigation Links (Hidden on small screens) */}
          <nav className="hidden md:block">
            <div className="flex items-baseline space-x-6 lg:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-lg ${linkClasses}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Right side: Toggles, GitHub, and Mobile Menu Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* GitHub Link */}
            {GitHubLink && (
              <a
                href={GitHubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hidden sm:flex"
                aria-label="View GitHub profile"
              >
                <Github className="w-5 h-5" />
              </a>
            )}

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 transition-colors cursor-pointer duration-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (Appears only on small screens) */}
      <div
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out ${isMenuOpen
          ? "max-h-screen opacity-100 py-2"
          : "max-h-0 opacity-0 overflow-hidden"
          } 'bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700'`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={handleLinkClick}
              className={`block w-full text-center px-3 py-2 rounded-md text-base ${linkClasses} hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
              {item.name}
            </a>
          ))}
          {/* Mobile-only GitHub link, if hidden above */}
          {GitHubLink && (
            <a
              href={GitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className={`block w-full text-center px-3 py-2 rounded-md text-base ${linkClasses} hover:bg-gray-100 dark:hover:bg-gray-800 sm:hidden`}
            >
              View GitHub
            </a>
          )}
        </div>
      </div>
    </header>
  );
}