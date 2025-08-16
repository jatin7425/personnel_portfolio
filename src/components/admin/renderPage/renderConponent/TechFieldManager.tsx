import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IconButton } from "@/components/ui/IconButton";

interface TechFieldManagerProps {
  techFields: string[];
  setTechFields: (fields: string[]) => void;
}

const TechFieldManager: React.FC<TechFieldManagerProps> = ({
  techFields,
  setTechFields,
}) => {
  const [newTech, setNewTech] = useState("");

  const addTech = () => {
    if (newTech.trim() && !techFields.includes(newTech.trim())) {
      setTechFields([...techFields, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTech = (index: number) => {
    setTechFields(techFields.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full border-b border-gray-700 pb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Specializations</h3>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {techFields.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center bg-indigo-600 text-white pl-3 pr-2 py-1 rounded-full text-sm font-medium"
          >
            {tech}
            <IconButton
              icon={<FaTrash />}
              onClick={() => removeTech(idx)}
              className="ml-2 hover:text-red-300"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add new skill"
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTech()}
          className="bg-gray-700 text-white rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addTech}
          className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-400 transition-colors"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default TechFieldManager;
