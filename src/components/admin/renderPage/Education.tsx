import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EducationSchema } from "@/lib/portfolioSchema";
import {
  fetchEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "@/services/education.service";
import { EducationType } from "@/types/education";

const Education = () => {
  const [educations, setEducations] = useState<EducationType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [stateChange, setStateChange] = useState(false);
  const [selectedEducation, setSelectedEducation] =
    useState<EducationType | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EducationType>({
    resolver: zodResolver(EducationSchema),
    defaultValues: {
      course: "",
      organisation: "",
      timeline: { from: "", to: "" },
      description: "",
    },
  });

  useEffect(() => {
    const getEducation = async () => {
      try {
        const resp = await fetchEducation();
        setEducations(Array.isArray(resp) ? resp : [resp]);
      } catch (error) {
        // Optionally handle error
      }
    };
    getEducation();
  }, [stateChange]);

  const onSubmit = async (data: EducationType) => {
    try {
      if (isEditing && selectedEducation?._id) {
        const updated = await updateEducation(selectedEducation._id, data);
        setEducations((prev) =>
          prev.map((edu) => (edu._id === updated._id ? updated : edu))
        );
      } else {
        const created = await createEducation(data);
        setEducations((prev) => [...prev, created]);
      }
      reset();
      setIsEditing(false);
      setSelectedEducation(null);
      setStateChange(!stateChange); // Trigger state change to re-fetch data
    } catch (error) {
      // Optionally handle error
    }
  };

  const handleEdit = (edu: EducationType) => {
    setIsEditing(true);
    setSelectedEducation(edu);
    reset(edu);
    setStateChange(!stateChange); // Reset state change to re-fetch data
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEducation(id);
      setEducations((prev) => prev.filter((edu) => edu._id !== id));
      setStateChange(!stateChange); // Trigger state change to re-fetch data
    } catch (error) {
      // Optionally handle error
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setSelectedEducation(null);
    setStateChange(!stateChange); // Reset state change to re-fetch data
  };

  return (
    <main className="w-full h-screen overflow-y-auto bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Education List */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Education</h2>
          {educations.map((edu) => (
            <div key={edu._id} className="mb-4">
              <div className="font-bold text-lg">{edu.course}</div>
              <div className="text-gray-400">{edu.organisation}</div>
              <div className="text-gray-400">
                {edu.timeline.from} - {edu.timeline.to}
              </div>
              <div className="text-gray-300 mb-2">{edu.description}</div>
              <button
                onClick={() => handleEdit(edu)}
                className="mr-2 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(edu._id!)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {/* Add / Edit Education */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">
            {isEditing ? "Edit Education" : "Add New Education"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Course"
              {...register("course")}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.course && (
              <p className="text-red-400 text-sm">{errors.course.message}</p>
            )}
            <input
              type="text"
              placeholder="Organisation"
              {...register("organisation")}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.organisation && (
              <p className="text-red-400 text-sm">
                {errors.organisation.message}
              </p>
            )}
            <input
              type="text"
              placeholder="Start Date"
              {...register("timeline.from")}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.timeline?.from && (
              <p className="text-red-400 text-sm">
                {errors.timeline.from?.message}
              </p>
            )}
            <input
              type="text"
              placeholder="End Date"
              {...register("timeline.to")}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.timeline?.to && (
              <p className="text-red-400 text-sm">
                {errors.timeline.to?.message}
              </p>
            )}
            <textarea
              placeholder="Description"
              {...register("description")}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {errors.description && (
              <p className="text-red-400 text-sm">
                {errors.description.message}
              </p>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
              >
                {isEditing ? "Update Education" : "Add Education"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded transition duration-300"
                >
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

export default Education;
