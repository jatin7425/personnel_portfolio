import { fetchExperience } from "@/services/experience.services";
import { ProfileDetails } from "@/types/basicDetails";
import { EducationType, ExperienceType } from "@/types/experience";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ExperienceCard from "./ui/ExperienceCard";
import EducationCard from "./ui/EducationCard";
import CertificationCard from "./ui/CertificationCard";
import { fetchEducation } from "@/services/education.service";
import { fetchCertifications } from "@/services/certification.service";
import { CertificationType } from "@/types/certification";
import { fetchStats } from "@/services/stats.services";
import { Briefcase, GraduationCap, Award } from "lucide-react";

type Tab = "experience" | "education" | "certifications";

type StatTitle =
  | "Years Experience"
  | "Months Experience"
  | "Projects Completed"
  | "Data Points Scraped"
  | "Age";

type StatsProps = {
  title: StatTitle;
  value: string | number;
};

// --- Main About Component ---

const About = ({ basicData }: { basicData: ProfileDetails }) => {
  const [experiences, setExperiences] = useState<ExperienceType[] | null>(null);
  const [education, setEducation] = useState<EducationType[] | null>(null);
  const [certifications, setCertifications] = useState<
    CertificationType[] | null
  >(null);
  const [devStats, setDevStats] = useState<StatsProps[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("experience");
  const [exp, setExp] = useState<string>("");

  // Unified data fetching logic (No changes needed here)
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Experience
      try {
        const resp = await fetchExperience();
        setExperiences(Array.isArray(resp) ? resp : resp ? [resp] : []);
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
        setExperiences([]);
      }

      // Fetch Education
      try {
        const resp = await fetchEducation();
        setEducation(Array.isArray(resp) ? resp : resp ? [resp] : []);
      } catch (error) {
        console.error("Failed to fetch education:", error);
        setEducation([]);
      }

      // Fetch Certifications
      try {
        const resp = await fetchCertifications();
        setCertifications(Array.isArray(resp) ? resp : resp ? [resp] : []);
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
        setCertifications([]);
      }

      // Fetch Stats
      try {
        const stats = await fetchStats();

        const mappedStats: StatsProps[] = stats.map(
          (stat: { title: string; value: string | number }) => ({
            ...stat,
            title: stat.title as StatTitle,
          })
        );
        setDevStats(mappedStats);

        const yearsStat = mappedStats.find(s => s.title === "Years Experience");
        const monthsStat = mappedStats.find(s => s.title === "Months Experience");

        if (yearsStat) {
          setExp(`${yearsStat.value}+ years`);
        } else if (monthsStat) {
          setExp(`${monthsStat.value}+ months`);
        } else {
          setExp("many");
        }

      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchData();
  }, []);

  const renderTabContent = () => {
    if (
      (activeTab === "experience" && experiences === null) ||
      (activeTab === "education" && education === null) ||
      (activeTab === "certifications" && certifications === null)
    ) {
      return <div className="text-center py-8 text-gray-500 dark:text-gray-400">Loading...</div>;
    }

    switch (activeTab) {
      case "experience":
        return <ExperienceTab experiences={experiences ?? []} />;
      case "education":
        return <EducationTab education={education ?? []} />;
      case "certifications":
        return <CertificationsTab certifications={certifications ?? []} />;
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 w-full transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate developer with <span className="text-blue-600 dark:text-blue-400 font-semibold">{exp}</span> of experience building innovative
            solutions
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">

          {/* Left/Top Column (Image and Stats) */}
          {/* REMOVED sticky TOP-4 for mobile responsiveness */}
          <div className="space-y-8 lg:space-y-10">

            {/* Profile Image Card */}
            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl dark:shadow-blue-500/10 transform transition-transform duration-500 lg:hover:scale-[1.01]">
              <Image
                alt="Alex Johnson"
                className="w-full max-w-sm mx-auto rounded-lg sm:rounded-xl aspect-square object-cover object-center"
                src={basicData?.ProfilePic || "/default-profile.jpg"}
                width={800}
                height={800}
                unoptimized
              />
            </div>

            {/* Quick Stats Card (Appears after Image, before Bio, on mobile) */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl lg:shadow-2xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 border-b pb-3 border-gray-200 dark:border-gray-700">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-6 sm:gap-8">
                {devStats.map((stat, idx) => (
                  <Stats key={idx} stats={stat} />
                ))}
              </div>
            </div>
          </div>

          {/* Right/Bottom Column (Bio and Tabs) */}
          <div className="space-y-8 lg:space-y-10">

            {/* Bio Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl lg:shadow-2xl dark:shadow-purple-500/10 border border-gray-100 dark:border-gray-700">
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-5 border-l-4 border-blue-500 pl-4">
                I&apos;m a passionate full-stack developer and web scraping
                specialist with a deep love for creating innovative digital
                solutions. My journey in tech began with curiosity about how
                websites work, which led me to explore both frontend magic and
                backend architecture.
              </p>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring the latest tech
                trends, contributing to open-source projects, or sharing
                knowledge with the developer community. I believe in building
                not just functional software, but experiences that make a
                difference.
              </p>
            </div>

            {/* Tabs & Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="flex border-b border-gray-200 dark:border-gray-700/50">
                <TabButton label="Experience" icon={Briefcase} tab="experience" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton label="Education" icon={GraduationCap} tab="education" activeTab={activeTab} setActiveTab={setActiveTab} />
                <TabButton label="Certifications" icon={Award} tab="certifications" activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-6 sm:space-y-8">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Tab Button Component ---
// Minor text size adjustments for smaller screens
const TabButton = ({
  label,
  tab,
  activeTab,
  setActiveTab,
  icon: Icon,
}: {
  label: string;
  tab: Tab;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  icon: React.ElementType;
}) => {
  const isActive = activeTab === tab;
  const activeClasses =
    "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50/50 dark:bg-gray-900";
  const inactiveClasses =
    "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-700/50";
  return (
    <button
      className={`flex flex-col items-center flex-1 px-2 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${isActive ? activeClasses : inactiveClasses
        }`}
      onClick={() => setActiveTab(tab)}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 mb-0 sm:mb-1" /> {/* Reduced icon size/margin */}
      {label}
    </button>
  );
};

// --- Tab Content Components (Minimal changes to spacing/padding) ---

const ExperienceTab = ({ experiences }: { experiences: ExperienceType[] }) => {
  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      {experiences?.length === 0 ? (
        <p className="text-gray-400 italic text-center py-4">No experiences added yet. Time to build something!</p>
      ) : (
        experiences?.map((exp, index) => (
          <ExperienceCard key={exp._id || index} experience={exp} />
        ))
      )}
    </div>
  );
};

const EducationTab = ({ education }: { education: EducationType[] }) => {
  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      {education?.length === 0 ? (
        <p className="text-gray-400 italic text-center py-4">No education details added yet. Learning never stops!</p>
      ) : (
        education?.map((edu, index) => (
          <EducationCard key={edu._id || index} education={edu} />
        ))
      )}
    </div>
  );
};

const CertificationsTab = ({
  certifications,
}: {
  certifications: CertificationType[];
}) => {
  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      {certifications?.length === 0 ? (
        <p className="text-gray-400 italic text-center py-4">No certifications added yet. Keep on validating your skills!</p>
      ) : (
        certifications?.map((cert, index) => (
          <CertificationCard key={cert._id || index} certification={cert} />
        ))
      )}
    </div>
  );
};

// --- Stats Component Configuration ---

// (colorMap remains the same)
const colorMap: Record<StatTitle, { title: string; value: string }> = {
  "Years Experience": {
    title: "text-gray-600 dark:text-gray-400",
    value: "text-blue-600 dark:text-blue-400",
  },
  "Months Experience": {
    title: "text-gray-600 dark:text-gray-400",
    value: "text-blue-600 dark:text-blue-400",
  },
  "Projects Completed": {
    title: "text-gray-600 dark:text-gray-400",
    value: "text-purple-600 dark:text-purple-400",
  },
  "Data Points Scraped": {
    title: "text-gray-600 dark:text-gray-400",
    value: "text-green-600 dark:text-green-400",
  },
  Age: {
    title: "text-gray-600 dark:text-gray-400",
    value: "text-orange-600 dark:text-orange-400",
  },
};

const Stats = ({ stats }: { stats: StatsProps }) => {
  const colors = colorMap[stats.title] || {
    title: "text-gray-600 dark:text-gray-400",
    value: "text-gray-600 dark:text-gray-400",
  };
  return (
    // Reduced text size for better fit on small screens
    <div className="text-center transition-transform hover:scale-105 duration-300">
      <div className={`text-3xl sm:text-4xl font-extrabold ${colors.value} mb-1`}>
        {stats.value}+
      </div>
      <div className={`text-xs sm:text-sm font-medium ${colors.title}`}>{stats.title}</div>
    </div>
  );
};

export default About;