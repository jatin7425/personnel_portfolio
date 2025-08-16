import React from "react";
import {
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Folder,
  Mail,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Projects", value: 18, icon: Folder },
  { label: "Skills", value: 25, icon: Layers },
  { label: "Certifications", value: 7, icon: Award },
  { label: "Experience", value: 5, icon: Briefcase },
  { label: "Education", value: 3, icon: GraduationCap },
  { label: "Messages", value: 42, icon: Mail },
];

const recentActivity = [
  { type: "Project", name: "Portfolio Website", date: "2025-08-10" },
  { type: "Skill", name: "React", date: "2025-08-09" },
  { type: "Certification", name: "AWS Certified", date: "2025-08-08" },
  { type: "Message", name: "Contact from John Doe", date: "2025-08-07" },
];

const Dashboard = () => {
  return (
    <main className="w-full h-screen overflow-y-auto bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 sm:p-8 p-4">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold text-white mb-8">
            Admin Dashboard
          </h1>
          <Link
            href="/"
            className="text-blue-400 hover:underline mb-4 inline-block"
          >
            Visit Site
          </Link>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-gray-800 rounded-xl p-6 flex items-center space-x-4 shadow-lg"
            >
              <Icon className="w-10 h-10 text-indigo-400" />
              <div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <ul className="divide-y divide-gray-700">
            {recentActivity.map((activity, idx) => (
              <li
                key={idx}
                className="py-3 flex justify-between sm:items-center max-sm:flex-col"
              >
                <span className="text-gray-300">
                  {activity.type}:{" "}
                  <span className="font-semibold text-white">
                    {activity.name}
                  </span>
                </span>
                <span className="text-gray-500 text-sm">{activity.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
