"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaCloud, FaDatabase, FaLaptopCode, FaSpider } from "react-icons/fa";

const stacks = [
    {
        title: "Full Stack Web Apps",
        description: [
            "React + TypeScript",
            "Node.js + Express",
            "MongoDB/PostgreSQL",
            "Docker + AWS",
        ],
        icon: <FaLaptopCode className="text-3xl text-white" />,
        gradient: "from-sky-500 to-blue-600",
    },
    {
        title: "Web Scraping Solutions",
        description: [
            "Python + Scrapy",
            "Selenium + Playwright",
            "Redis for Caching",
            "Elasticsearch for Search",
        ],
        icon: <FaSpider className="text-3xl text-white" />,
        gradient: "from-green-400 to-emerald-600",
    },
    {
        title: "Cloud Architecture",
        description: [
            "AWS/GCP Services",
            "Kubernetes Orchestration",
            "Microservices Design",
            "CI/CD Pipelines",
        ],
        icon: <FaCloud className="text-3xl text-white" />,
        gradient: "from-pink-400 to-purple-600",
    },
];

export default function TechStackVisualization() {
    return (
        // Reduced vertical padding on mobile, using standard Tailwind dark blue background
        <section className="py-12 sm:py-16 px-4 md:px-6 lg:px-8 bg-gray-900 text-white w-full">
            <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
                    Tech Stack Visualization ✨
                </h2>
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                    My preferred technology combinations for different project types.
                </p>
            </div>

            {/* Grid structure optimized for mobile: 1 column, then 2 columns on medium (tablet/large phone), then 3 columns on large screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
                {stacks.map((stack, idx) => (
                    <motion.div
                        key={idx}
                        // Added initial/animate for a subtle fade-in effect on load
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                        whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.5)" }} // Increased hover scale slightly

                        // Reduced padding on mobile (p-6) and added border for definition
                        className="p-6 sm:p-8 rounded-2xl bg-[#111936] shadow-xl border border-[#2A3458] hover:border-[#4B557A] transition-all duration-300"
                    >
                        <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl mb-4 sm:mb-6 bg-gradient-to-r ${stack.gradient} shadow-lg`}
                        >
                            {/* Ensured icon size is responsive */}
                            {React.cloneElement(stack.icon, { className: "text-2xl sm:text-3xl text-white" })}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{stack.title}</h3>
                        <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-sm sm:text-base">
                            {stack.description.map((line, i) => (
                                <li key={i} className="flex items-center">
                                    <span className="text-green-400 text-xs mr-2">{"\u2022"}</span> {/* Custom bullet point */}
                                    {line}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}