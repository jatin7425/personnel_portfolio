import { ExperienceType } from "@/types/experience";
import React from "react";

const ExperienceCard = ({experience}: {experience: ExperienceType}) => {
  return (
    <div className="border-l-4 border-blue-500 pl-6">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        {experience?.position}
      </h4>
      <p className="text-blue-600 dark:text-blue-400 font-medium">
        {experience?.company} • {experience?.timeline?.from} - {experience?.timeline?.to ?? "Present"}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {experience?.description}
      </p>
    </div>
  );
};

export default ExperienceCard;
