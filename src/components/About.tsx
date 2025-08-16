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

type Tab = "experience" | "education" | "certifications";

const About = ({ basicData }: { basicData: ProfileDetails }) => {
  const [experiences, setExperiences] = useState<ExperienceType[] | null>(null);
  const [education, setEducation] = useState<EducationType[] | null>(null);
  const [certifications, setCertifications] = useState<
    CertificationType[] | null
  >(null);
  const [activeTab, setActiveTab] = useState<Tab>("experience");

  useEffect(() => {
    const getExperience = async () => {
      try {
        const resp = await fetchExperience();
        console.log("Fetched Experience:", resp);
        if (resp === null) {
          setExperiences([]);
        } else if (Array.isArray(resp)) {
          setExperiences(resp);
        } else {
          setExperiences([resp]);
        }
      } catch (error) {
        console.error("Failed to fetch experiences:", error);
        setExperiences([]);
      }
    };

    const getEducation = async () => {
      try {
        const resp = await fetchEducation();
        if (resp === null) {
          setEducation([]);
        } else if (Array.isArray(resp)) {
          setEducation(resp);
        } else {
          setEducation([resp]);
        }
      } catch (error) {
        console.error("Failed to fetch education:", error);
        setEducation([]);
      }
    };

    const getCertifications = async () => {
      try {
        const resp = await fetchCertifications();
        if (resp === null) {
          setCertifications([]);
        } else if (Array.isArray(resp)) {
          setCertifications(resp);
        } else {
          setCertifications([resp]);
        }
      } catch (error) {
        console.error("Failed to fetch certifications:", error);
        setCertifications([]);
      }
    };

    getExperience();
    getEducation();
    getCertifications();
  }, []);

  const renderTabContent = () => {
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
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 w-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate developer with 5+ years of experience building innovative
            solutions
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="relative">
              <img
                alt="Alex Johnson"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl object-cover object-top"
                src={basicData?.ProfilePic || "/default-profile.jpg"}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-600/20 to-transparent"></div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    50+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Projects Completed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    5+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Years Experience
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    100M+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Data Points Scraped
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    System Uptime
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I'm a passionate full-stack developer and web scraping
                specialist with a deep love for creating innovative digital
                solutions. My journey in tech began with curiosity about how
                websites work, which led me to explore both frontend magic and
                backend architecture.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you'll find me exploring the latest tech
                trends, contributing to open-source projects, or sharing
                knowledge with the developer community. I believe in building
                not just functional software, but experiences that make a
                difference.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <TabButton
                  label="Experience"
                  tab="experience"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <TabButton
                  label="Education"
                  tab="education"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <TabButton
                  label="Certifications"
                  tab="certifications"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
              <div className="p-6">
                <div className="space-y-6">{renderTabContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TabButton = ({
  label,
  tab,
  activeTab,
  setActiveTab,
}: {
  label: string;
  tab: Tab;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}) => {
  const isActive = activeTab === tab;
  const activeClasses =
    "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-b-2 border-blue-600 dark:border-blue-400";
  const inactiveClasses =
    "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white";
  return (
    <button
      className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer ${
        isActive ? activeClasses : inactiveClasses
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </button>
  );
};

const ExperienceTab = ({ experiences }: { experiences: ExperienceType[] }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {experiences?.length === 0 ? (
        <p className="text-gray-400 italic">No experiences added yet.</p>
      ) : (
        experiences?.map((exp) => (
          <div key={exp._id} className="group relative">
            <ExperienceCard experience={exp} />
          </div>
        ))
      )}
    </div>
  );
};

const EducationTab = ({ education }: { education: EducationType[] }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {education?.length === 0 ? (
        <p className="text-gray-400 italic">No education details added yet.</p>
      ) : (
        education?.map((edu) => (
          <div key={edu._id} className="group relative">
            <EducationCard education={edu} />
          </div>
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
    <div className="w-full flex flex-col gap-6">
      {certifications?.length === 0 ? (
        <p className="text-gray-400 italic">No certifications added yet.</p>
      ) : (
        certifications?.map((cert) => (
          <div key={cert._id} className="group relative">
            <CertificationCard certification={cert} />
          </div>
        ))
      )}
    </div>
  );
};

export default About;
