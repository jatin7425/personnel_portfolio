"use client";

import ExperienceCard from "@/components/ui/ExperienceCard";
import {
  fetchExperience,
  createExperience,
  updateExperience,
} from "@/services/experience.services";
import { ExperienceType } from "@/types/experience";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperienceSchema } from "@/lib/portfolioSchema";
import { FaPlus, FaSave, FaEdit, FaTimes } from "react-icons/fa";
import LoadingPage from "@/components/ui/LoadingPage";

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceType[] | null>(null);
  const [StateChange, setStateChange] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceType | null>(null);

  // 👇 Hydration guard
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExperienceType>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      position: "",
      company: "",
      timeline: { from: "", to: "" },
      description: "",
    },
  });

  useEffect(() => {
    const getExperience = async () => {
      try {
        const resp = await fetchExperience();
        console.log("Fetched Experience:", resp);
        if (resp === null) {
          setExperiences([]);
        } else if (Array.isArray(resp)) {
          setExperiences(resp);
        } else {
          setExperiences([resp]);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
        setExperiences([]);
      }
    };

    getExperience();
  }, [StateChange]);

  const onSubmit = async (data: ExperienceType) => {
    try {
      if (isEditing && selectedExperience?._id) {
        // Update existing experience
        const updated = await updateExperience({
          ...selectedExperience,
          ...data,
        });
        if (updated) {
          setStateChange(!StateChange);
        }
      } else {
        // Create new experience
        const created = await createExperience(data);
        if (created) {
          setStateChange(!StateChange);
        }
      }

      reset();
      setIsEditing(false);
      setSelectedExperience(null);
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  const handleEdit = (exp: ExperienceType) => {
    setIsEditing(true);
    setSelectedExperience(exp);
    reset(exp);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setSelectedExperience(null);
  };

  // 👇 Ensure consistent HTML on server vs client
  if (!isClient) {
    return (
      <LoadingPage />
    );
  }

  return (
    <main className="w-full min-h-screen overflow-y-auto  bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Experience List */}
        <div className="flex-1 bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800 transition-all duration-300">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
            Work Experience 💼
          </h2>
          <div className="space-y-6">
            {experiences?.length === 0 ? (
              <p className="text-gray-400 italic">No experiences added yet.</p>
            ) : (
              experiences?.map((exp) => (
                <div key={exp._id} className="group relative">
                  <ExperienceCard experience={exp} />
                  <button
                    onClick={() => handleEdit(exp)}
                    className="absolute top-4 right-4 p-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100"
                    title="Edit Experience"
                  >
                    <FaEdit />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add / Edit Experience */}
        <div className="flex-1 bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800 transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-6">
            {isEditing ? "Edit Experience" : "Add New Experience"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Position"
              {...register("position")}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.position && (
              <p className="text-red-400 text-sm mt-1 animate-pulse">
                {errors.position.message}
              </p>
            )}

            <input
              type="text"
              placeholder="Company"
              {...register("company")}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.company && (
              <p className="text-red-400 text-sm mt-1 animate-pulse">
                {errors.company.message}
              </p>
            )}

            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Start Date (e.g., Jan 2020)"
                  {...register("timeline.from")}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.timeline?.from && (
                  <p className="text-red-400 text-sm mt-1 animate-pulse">
                    {errors.timeline.from.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="End Date (e.g., Present)"
                  {...register("timeline.to")}
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <textarea
              placeholder="Description (Key achievements and responsibilities)"
              rows={4}
              {...register("description")}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1 animate-pulse">
                {errors.description.message}
              </p>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
              >
                {isEditing ? <FaSave /> : <FaPlus />}
                {isEditing ? "Update Experience" : "Add Experience"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition duration-300"
                >
                  <FaTimes />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Experience;
