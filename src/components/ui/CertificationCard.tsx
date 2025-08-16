import { CertificationType } from "@/types/certification";
import React from "react";

const CertificationCard = ({
  certification,
}: {
  certification: CertificationType;
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white">
          {certification?.Certificate}
        </h4>
        <p className="text-gray-600 dark:text-gray-300">
          {certification?.from}
        </p>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {certification?.year}
      </span>
    </div>
  );
};

export default CertificationCard;
