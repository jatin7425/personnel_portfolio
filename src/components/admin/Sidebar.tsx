// components/admin/Sidebar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Folder,
  Mail,
  BarChart3,
  Settings,
} from "lucide-react";
import Link from "next/link";

const BASE_ADMIN_ROUTE: string | undefined =
  process.env.NEXT_PUBLIC_BASE_ADMIN_ROUTE;

const navItems = [
  { name: "Dashboard", href: `/${BASE_ADMIN_ROUTE}`, icon: Home },
  {
    name: "Basic Details",
    href: `/${BASE_ADMIN_ROUTE}/basic-details`,
    icon: Settings,
  },
  {
    name: "Experience",
    href: `/${BASE_ADMIN_ROUTE}/experience`,
    icon: Briefcase,
  },
  {
    name: "Education",
    href: `/${BASE_ADMIN_ROUTE}/education`,
    icon: GraduationCap,
  },
  {
    name: "Certifications",
    href: `/${BASE_ADMIN_ROUTE}/certifications`,
    icon: Award,
  },
  { name: "Skills", href: `/${BASE_ADMIN_ROUTE}/skills`, icon: Layers },
  { name: "Projects", href: `/${BASE_ADMIN_ROUTE}/projects`, icon: Folder },
  {
    name: "Contact Messages",
    href: `/${BASE_ADMIN_ROUTE}/contact`,
    icon: Mail,
  },
  {
    name: "Analytics",
    href: `/${BASE_ADMIN_ROUTE}/analytics`,
    icon: BarChart3,
  },
];

const Sidebar = ({ selected_option }: { selected_option: string }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 720) {
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="xl:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`
          bg-gray-900 text-white w-64 p-4 space-y-2 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          ${
            typeof window !== "undefined" && window.innerWidth <= 1280
              ? "fixed top-0 left-0 h-full z-40 overflow-y-auto"
              : "xl:relative fixed h-screen"
          }
        `}
      >
        <div className="text-2xl font-bold mb-6">Portfolio Admin</div>
        <nav className="space-y-1">
          {navItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-colors
                ${
                  href.includes(selected_option)
                    ? "bg-gray-700"
                    : "hover:bg-gray-800"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
