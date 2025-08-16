import React from "react";
import { ProfileDetails } from "@/types/basicDetails";
import { EditableField } from "@/components/ui/EditableField";
import TechFieldManager from "./TechFieldManager";
import SocialLinksManager from "./SocialLinksManager";

interface DetailsFormProps {
  details: ProfileDetails;
  onDetailsChange: (field: keyof ProfileDetails, value: any) => void;
  onArrayChange: (field: "TechField" | "Social", value: any[]) => void;
}

const formFields: {
  key: keyof ProfileDetails;
  label: string;
  type?: string;
}[] = [
  { key: "Email", label: "Email Address", type: "email" },
  { key: "Phone", label: "Phone Number", type: "tel" },
  { key: "Location", label: "Location" },
  { key: "DateOfBirth", label: "Date of Birth", type: "date" },
  { key: "Availability", label: "Availability" },
];

const DetailsForm: React.FC<DetailsFormProps> = ({
  details,
  onDetailsChange,
  onArrayChange,
}) => {
  return (
    <section className="w-full lg:w-2/3 flex flex-col gap-6">
      <div className="max-md:bg-gray-800/50 bg-gray-800 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-indigo-700/50">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formFields.map(({ key, label, type }) => (
            <EditableField
              key={key}
              label={label}
              type={type || "text"}
              id={key}
              value={details[key] as string}
              onChange={(e) => onDetailsChange(key, e.target.value)}
            />
          ))}
        </div>
      </div>

      <div className="max-md:bg-gray-800/50 bg-gray-800 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-indigo-700/50">
        {/* Tech Fields */}
        <TechFieldManager
          techFields={details.TechField}
          setTechFields={(newFields) => onArrayChange("TechField", newFields)}
        />
        <br />

        {/* Social Links */}
        <SocialLinksManager
          socialLinks={details.Social}
          setSocialLinks={(newLinks) => onArrayChange("Social", newLinks)}
        />
      </div>
    </section>
  );
};

export default DetailsForm;
