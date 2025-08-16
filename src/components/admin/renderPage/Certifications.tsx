import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CertificationSchema } from "@/lib/portfolioSchema";
import { fetchCertifications, createCertification, updateCertification, deleteCertification } from "@/services/certification.service";
import { CertificationType } from "@/types/certification";

const Certifications = () => {
  const [certifications, setCertifications] = useState<CertificationType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [stateChange, setStateChange] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<CertificationType | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CertificationType>({
    resolver: zodResolver(CertificationSchema),
    defaultValues: {
      Certificate: "",
      from: "",
      year: "",
    },
  });

  useEffect(() => {
    const getCertifications = async () => {
      try {
        const resp = await fetchCertifications();
        setCertifications(Array.isArray(resp) ? resp : [resp]);
      } catch (error) {}
    };
    getCertifications();
  }, [stateChange]);

  const onSubmit = async (data: CertificationType) => {
    try {
      if (isEditing && selectedCertification?._id) {
        const updated = await updateCertification(selectedCertification._id, data);
        setCertifications((prev) => prev.map((cert) => cert._id === updated._id ? updated : cert));
      } else {
        const created = await createCertification(data);
        setCertifications((prev) => [...prev, created]);
      }
      reset();
      setIsEditing(false);
      setSelectedCertification(null);
      setStateChange(!stateChange); // Trigger state change to re-fetch data
    } catch (error) {}
  };

  const handleEdit = (cert: CertificationType) => {
    setIsEditing(true);
    setSelectedCertification(cert);
    reset(cert);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCertification(id);
      setCertifications((prev) => prev.filter((cert) => cert._id !== id));
      setStateChange(!stateChange); // Trigger state change to re-fetch data
    } catch (error) {}
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setSelectedCertification(null);
    setStateChange(!stateChange); // Reset state change to re-fetch data
  };

  return (
    <main className="w-full h-screen overflow-y-auto bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Certifications List */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert._id} className="mb-4">
              <div className="font-bold text-lg">{cert.Certificate}</div>
              <div className="text-gray-400">{cert.from}</div>
              <div className="text-gray-400">{cert.year}</div>
              <button onClick={() => handleEdit(cert)} className="mr-2 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm">Edit</button>
              <button onClick={() => handleDelete(cert._id!)} className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm">Delete</button>
            </div>
          ))}
        </div>
        {/* Add / Edit Certification */}
        <div className="flex-1 bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">{isEditing ? "Edit Certification" : "Add New Certification"}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <input type="text" placeholder="Certificate" {...register("Certificate")} className="w-full p-2 rounded bg-gray-700 text-white" />
            {errors.Certificate && <p className="text-red-400 text-sm">{errors.Certificate.message}</p>}
            <input type="text" placeholder="From" {...register("from")} className="w-full p-2 rounded bg-gray-700 text-white" />
            {errors.from && <p className="text-red-400 text-sm">{errors.from.message}</p>}
            <input type="text" placeholder="Year" {...register("year")} className="w-full p-2 rounded bg-gray-700 text-white" />
            {errors.year && <p className="text-red-400 text-sm">{errors.year.message}</p>}
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300">{isEditing ? "Update Certification" : "Add Certification"}</button>
              {isEditing && <button type="button" onClick={handleCancel} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded transition duration-300">Cancel</button>}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Certifications;
