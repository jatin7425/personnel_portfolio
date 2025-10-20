import React from 'react';
import { ProjectType } from '@/types/project'; // Assuming ProjectType is the inferred type from ProjectSchema

// Helper function to dangerously set inner HTML for the SVG icons
// NOTE: Use this with caution. Only use it if you trust the source of the SVG string (e.g., your own database).
const SVGIcon = ({ svgString }) => (
    <span
        dangerouslySetInnerHTML={{ __html: svgString }}
        className="w-5 h-5 inline-block align-middle mr-1"
    />
);

const ProjectCard = ({ Project }) => {
    // Destructure the necessary properties from the Project object
    const {
        title,
        description,
        category,
        tech_used,
        thumbnail,
        visitLink,
        repoLink,
        stats,
        status,
    } = Project;

    return (
        <div className={`
      bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl 
      transition-all duration-300 overflow-hidden border 
      ${status === "Completed" ? 'border-green-500' : 'border-yellow-500'}
      flex flex-col
    `}>
            {/* Thumbnail Image */}
            <div className="relative h-48 sm:h-56 w-full">
                <img
                    src={thumbnail}
                    alt={`Thumbnail for ${title}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Status Badge */}
                <span className={`
          absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full
          ${status === "Completed" ? 'bg-green-600 text-white' : 'bg-yellow-500 text-gray-900'}
        `}>
                    {status}
                </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">{category}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
                    {description}
                </p>

                {/* Tech Used Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tech_used.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                    {tech_used.length > 4 && (
                        <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-300 rounded-full">
                            +{tech_used.length - 4} more
                        </span>
                    )}
                </div>

                {/* Dynamic Stats */}
                {Object.keys(stats).length > 0 && (
                    <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300 mb-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                        {Object.entries(stats).map(([key, stat]) => (
                            <div key={key} className="flex items-center">
                                <SVGIcon svgString={stat.iconSvg} />
                                <span className="font-semibold capitalize mr-1">{key}:</span>
                                <span>{stat.value}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                    <a
                        href={visitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
                    >
                        Visit Project
                    </a>
                    <a
                        href={repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                        View Repo
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;