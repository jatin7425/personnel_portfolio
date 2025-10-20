import { ProjectType } from '@/types/project';
import React, { useState, useMemo } from 'react'

const Projects = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [active, setActive] = useState<string>("");

    const categories = useMemo(() => {
        const set = new Set<string>();
        projects.forEach((p) => set.add(p.category));
        return Array.from(set);
    }, [projects]);

    return (
        <section id="skills" className="py-20 w-full min-h-[calc(80vh-100px)] bg-[#0f172a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Featured Projects</h2>
                    <p className="text-gray-300">
                        A showcase of my latest work spanning full-stack development, web scraping, and innovative solutions
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setActive(c)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${active === c
                                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects