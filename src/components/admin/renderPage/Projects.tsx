"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchAllProjects,
  updateProject,
  deleteProject,
} from "@/services/projects.service";
import { ProjectType } from "@/types/project";

// Reusable form for editing project details
const ProjectForm = ({
  project,
  onSave,
  onCancel,
}: {
  project: ProjectType;
  onSave: (data: ProjectType) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<ProjectType>(project);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      tech_used: value.split(",").map((tech) => tech.trim()),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.form
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          Edit Project Details
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Project Title"
            className="w-full p-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="text"
            name="tech_used"
            value={formData.tech_used.join(", ")}
            onChange={handleTechChange}
            placeholder="Technologies (comma-separated)"
            className="w-full p-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="Thumbnail URL"
            className="w-full p-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="url"
            name="visitLink"
            value={formData.visitLink}
            onChange={handleChange}
            placeholder="Visit Link"
            className="w-full p-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
          <input
            type="url"
            name="repoLink"
            value={formData.repoLink}
            onChange={handleChange}
            placeholder="Repo Link"
            className="w-full p-3 rounded bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-cyan-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-cyan-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </motion.form>
    </div>
  );
};

// ProjectCard component with an "Edit Details" button
const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}: {
  project: ProjectType;
  onEdit: (project: ProjectType) => void;
  onDelete: (id: string) => void;
}) => {
  const isComplete =
    project.category &&
    project.tech_used?.length > 0 &&
    project.thumbnail &&
    project.visitLink;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden ${
        isComplete ? "bg-slate-800" : "bg-red-900/40 border border-red-500"
      }`}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 mb-4">{project.description}</p>
        {!isComplete && (
          <p className="text-red-300 text-sm font-medium mb-4">
            Incomplete: Please add details.
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_used?.map((tech, index) => (
            <span
              key={index}
              className="text-xs font-medium text-purple-400 bg-purple-900/50 px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onEdit(project)}
            className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
          >
            Edit Details
          </button>
          <button
            onClick={() => onDelete(project._id as string)}
            className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectType | null>(
    null
  );

  const getProjects = async () => {
    setLoading(true);
    const fetchedProjects = await fetchAllProjects();
    // Ensure repoId is number | undefined
    const normalizedProjects = Array.isArray(fetchedProjects)
      ? fetchedProjects.map((proj) => ({
          ...proj,
          repoId:
            typeof proj.repoId === "number"
              ? String(proj.repoId)
              : proj.repoId,
        }))
      : [];
    setProjects(normalizedProjects);
    setLoading(false);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleUpdate = async (updatedData: ProjectType) => {
    const dataToUpdate = {
      ...updatedData,
      repoId:
        updatedData.repoId !== undefined
          ? String(updatedData.repoId)
          : undefined,
    };
    await updateProject(updatedData._id as string, dataToUpdate);
    setShowForm(false);
    setCurrentProject(null);
    await getProjects(); // Refresh the list
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      await getProjects(); // Refresh the list
    }
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-white">
          Manage Synced Projects
        </h1>
      </div>

      <AnimatePresence>
        {showForm && currentProject && (
          <ProjectForm
            project={currentProject}
            onSave={handleUpdate}
            onCancel={() => {
              setShowForm(false);
              setCurrentProject(null);
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
      >
        {loading ? (
          <div className="col-span-full text-center text-slate-400">
            Loading projects...
          </div>
        ) : projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <ProjectCard
                project={project}
                onEdit={() => {
                  setCurrentProject(project);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center text-slate-400">
            No synced projects found.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Projects;
