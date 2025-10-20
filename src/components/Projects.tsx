import { ProjectType } from '@/types/project';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import ProjectCard from './ui/ProjectCard'; // Assuming this path is correct
import { fetchAllProjects } from '@/services/projects.service';

const Projects = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [active, setActive] = useState<string>(""); // Stores the currently selected category
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // 1. Fetch Projects on Mount
    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        try {
            // NOTE: The original code was missing 'await' on the first line of the try block.
            const data = await fetchAllProjects();
            setProjects(data || []);
            // Set the first category as active by default, or an empty string if no projects
            if (data && data.length > 0) {
                // Initial filter: only show projects that are set to render: true
                const renderableProjects = data.filter(p => p.render !== false);
                if (renderableProjects.length > 0) {
                    setActive(renderableProjects[0].category);
                }
            }
        } catch (e) {
            console.error('Failed to load projects', e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]); // Dependency array should include fetchProjects if it's a memoized function

    // 2. Compute Unique Categories (Memoized)
    const categories = useMemo(() => {
        // Only include categories from projects that are set to render: true
        const renderableProjects = projects.filter(p => p.render !== false);
        const set = new Set<string>();
        renderableProjects.forEach((p) => set.add(p.category));
        
        // Convert Set to Array and add an "All" category at the start
        return ["All", ...Array.from(set)];
    }, [projects]);
    
    // Set "All" as active on initial load if projects exist
    useEffect(() => {
        if (projects.length > 0 && active === "") {
            setActive("All");
        }
    }, [projects, active]);


    // 3. Filter Projects based on Active Category (Memoized)
    const filteredProjects = useMemo(() => {
        const renderableProjects = projects.filter(p => p.render !== false);
        if (active === "All" || active === "") {
            return renderableProjects;
        }
        return renderableProjects.filter((p) => p.category === active);
    }, [projects, active]);


    // Helper to handle category click
    const handleCategoryClick = (category: string) => {
        setActive(category);
    };

    return (
        <section id="projects" className="py-20 w-full min-h-[calc(80vh-100px)] bg-[#0f172a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Featured Projects</h2>
                    <p className="text-gray-300">
                        A showcase of my latest work spanning full-stack development, web scraping, and innovative solutions
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => handleCategoryClick(c)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer 
                                ${active === c
                                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50"
                                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        // Loading State (basic spinner/text)
                        <div className="col-span-full text-center py-10">
                            <svg className="animate-spin h-8 w-8 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className="text-gray-400 mt-3">Loading projects...</p>
                        </div>
                    ) : filteredProjects.length > 0 ? (
                        // Render filtered projects
                        filteredProjects.map((project) => (
                            // Ensure you use a key prop when mapping React elements
                            <ProjectCard key={project._id || project.title} Project={project} />
                        ))
                    ) : (
                        // No Projects State
                        <div className="col-span-full text-center py-10">
                            <p className="text-xl text-gray-400">No projects found for the category: <span className="text-indigo-400 font-semibold">{active}</span></p>
                            <p className="text-gray-500 mt-2">Try selecting "All" to view everything.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;