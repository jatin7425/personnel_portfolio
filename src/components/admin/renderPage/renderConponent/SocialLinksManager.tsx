import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { SocialItem } from "@/types/basicDetails";
import { IconButton } from "@/components/ui/IconButton";
import iconMap from "@/components/ui/iconMap";
import PlatformDropdown from "@/components/ui/PlatformDropdown";

interface SocialLinksManagerProps {
  socialLinks: SocialItem[];
  setSocialLinks: (links: SocialItem[]) => void;
}

const SocialLinksManager: React.FC<SocialLinksManagerProps> = ({
  socialLinks,
  setSocialLinks,
}) => {
  const [newSocial, setNewSocial] = useState<Omit<SocialItem, "icon">>({
    name: "",
    link: "",
  });

  const addSocial = () => {
    if (newSocial.name && newSocial.link) {
      // No icon is added here directly. The component will derive it from the name.
      setSocialLinks([...socialLinks, { ...newSocial }]);
      setNewSocial({ name: "", link: "" });
    }
  };

  const removeSocial = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleNewSocialChange = (
    field: keyof typeof newSocial,
    value: string
  ) => {
    setNewSocial((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-white mb-4">Social Profiles</h3>
      <div className="flex flex-col gap-3">
        {socialLinks.map((s, idx) => (
          <div key={idx} className="flex gap-2 items-center text-gray-300">
            <span className="text-indigo-400 text-2xl w-8">
              {iconMap[s.name]}
            </span>

            <a
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-300 transition-colors"
            >
              {s.name}
            </a>
            <div className="flex-grow" />
            <IconButton
              icon={<FaTrash />}
              onClick={() => removeSocial(idx)}
              className="text-gray-500 hover:text-red-400"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-700">
        <PlatformDropdown
          value={newSocial.name}
          onChange={(val) => handleNewSocialChange("name", val)}
        />

        <input
          type="text"
          placeholder="Full Link"
          value={newSocial.link}
          onChange={(e) => handleNewSocialChange("link", e.target.value)}
          className="bg-gray-700 text-sm p-2 rounded-md focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addSocial}
          className="bg-indigo-500 mt-2 text-white p-2 rounded-md hover:bg-indigo-400 transition-colors flex items-center justify-center gap-2"
        >
          <FaPlus /> Add Profile
        </button>
      </div>
    </div>
  );
};

export default SocialLinksManager;
