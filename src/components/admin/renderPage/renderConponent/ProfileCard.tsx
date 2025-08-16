import React from "react";
import { FaCamera } from "react-icons/fa";
import { ProfileDetails } from "@/types/basicDetails";
import { EditableField } from "@/components/ui/EditableField";

interface ProfileCardProps {
  details: ProfileDetails;
  onDetailsChange: (field: keyof ProfileDetails, value: any) => void;
  onSave: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  details,
  onDetailsChange,
  onSave,
}) => {
  return (
    <aside
      className="w-full items-center md:items-start sticky top-0 lg:max-w-90
      md:gap-6 p-4 bg-gray-900 text-white rounded-2xl shadow-lg border border-indigo-700/50"
      style={{ height: "fit-content" }}
    >
      <div className="flex flex-col md:flex-row lg:flex-col justify-center md:justify-end gap-2">
        {/* Avatar Section */}
        <div className="w-full md:max-w-70 min-[400px]:max-w-64 mx-auto">
          <div className="relative mb-6 w-full aspect-square">
            <img
              src={details.ProfilePic}
              alt="Profile"
              className="w-full h-full rounded-2xl border-4 border-indigo-500 shadow-lg object-cover"
            />
            <label
              htmlFor="profile-pic-upload"
              className="absolute bottom-2 right-2 bg-white rounded-full p-2 
            text-indigo-600 cursor-pointer hover:bg-indigo-100 transition"
            >
              <FaCamera size={18} />
              <input id="profile-pic-upload" type="file" className="hidden" />
            </label>
          </div>
        </div>

        {/* Info Section */}
        <div
          className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-indigo-700/50 flex flex-col gap-4 w-full"
        >
          <EditableField
            value={details.FullName}
            onChange={(e) => onDetailsChange("FullName", e.target.value)}
            className="text-xl sm:text-2xl font-bold text-center md:text-left w-full"
            inputClassName="text-white bg-transparent focus:bg-gray-700/50 text-center md:text-left"
          />

          <EditableField
            as="textarea"
            value={details.ShortDescription}
            onChange={(e) =>
              onDetailsChange("ShortDescription", e.target.value)
            }
            className="text-gray-400 text-center md:text-left w-full"
            inputClassName="text-gray-300 bg-transparent resize-none focus:bg-gray-700/50 text-center md:text-left"
          />
        </div>
      </div>

      <div className="flex flex-col items-end w-full mt-6">
        <button
          onClick={onSave}
          className="mt-4 bg-green-600 text-white font-bold px-6 py-3 rounded-xl 
            hover:bg-green-500 transition-all duration-300 shadow-lg transform hover:scale-105 
            w-fitF sm:w-auto"
        >
          Save Changes
        </button>
      </div>
    </aside>
  );
};

export default ProfileCard;
