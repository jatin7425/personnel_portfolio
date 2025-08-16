import { EducationType } from '@/types/experience';
import React from 'react'

const EducationCard = ({education}:{education: EducationType}) => {
  return (
    <div className="border-l-4 border-purple-500 pl-6">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
        {education?.course}
      </h4>
      <p className="text-purple-600 dark:text-purple-400 font-medium">
        {education?.organisation} • {education?.timeline?.from} - {education?.timeline?.to ?? "Present"}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {education?.description}
      </p>
    </div>
  )
}

export default EducationCard;
