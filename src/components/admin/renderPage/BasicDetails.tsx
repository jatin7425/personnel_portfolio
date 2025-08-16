import React, { useState } from "react";
import { ProfileDetails, SocialItem } from "@/types/basicDetails";
import ProfileCard from "./renderConponent/ProfileCard";
import DetailsForm from "./renderConponent/DetailsForm";
import { updateBasicDetails } from "@/services/basicDetails.service";

interface BasicDetailsPageProps {
  basicData: ProfileDetails;
}

const BasicDetailsPage: React.FC<BasicDetailsPageProps> = ({ basicData }) => {
  const [details, setDetails] = useState<ProfileDetails>(basicData);

  const handleDetailsChange = (field: keyof ProfileDetails, value: any) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (
    field: "TechField" | "Social",
    value: string[] | SocialItem[]
  ) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = async () => {
    console.log("Saving data:", details);
    // TODO: Add your API call here to save the details
    const res = await updateBasicDetails(details);
    if (res) {
      console.log("Data saved successfully:", res);
    }
  };

  return (
    <main className="w-full h-screen overflow-y-auto bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <ProfileCard details={details} onDetailsChange={handleDetailsChange} onSave={handleSaveChanges} />
        <DetailsForm
          details={details}
          onDetailsChange={handleDetailsChange}
          onArrayChange={handleArrayChange}
        />
      </div>
    </main>
  );
};

export default BasicDetailsPage;
