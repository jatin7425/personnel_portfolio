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
        <section className="py-16 px-6 md:px-12 lg:px-20 bg-[#0B1120] text-white w-screen">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Tech Stack Visualization
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    My preferred technology combinations for different project types
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stacks.map((stack, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="p-8 rounded-2xl bg-gradient-to-br from-[#111936] to-[#0F172A] shadow-lg"
                    >
                        <div
                            className={`w-14 h-14 flex items-center justify-center rounded-xl mb-6 bg-gradient-to-r ${stack.gradient}`}
                        >
                            {stack.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-4">{stack.title}</h3>
                        <ul className="space-y-2 text-gray-300">
                            {stack.description.map((line, i) => (
                                <li key={i}>{line}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
