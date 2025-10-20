"use client";
import React, { useEffect, useMemo, useState, JSX } from "react";
import { fetchSkills } from "@/services/skills.service";
import { SkillItem } from "@/types/skills";
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiHtml5, SiVuedotjs,
  SiNodedotjs, SiExpress, SiDjango, SiFastapi, SiSpringboot,
  SiMongodb, SiPostgresql, SiMysql, SiSqlite, SiRedis, SiFlask, SiSelenium,
  SiDocker, SiKubernetes, SiGit, SiGithub, SiJenkins, SiLinux, SiAmazon
} from "react-icons/si";
import { GiSpiderWeb } from "react-icons/gi";
import { FiZap } from "react-icons/fi"; // Added a general category icon

// --- Icon Resolution (Kept for functionality) ---

// Frontend-only icon resolution: normalize, alias, partial match
const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const iconAliases: Array<{ keys: string[]; icon: JSX.Element; color: string }> = [
  // --- Frontend ---
  { keys: ["react"], icon: <SiReact className="text-sky-400 text-3xl" />, color: "bg-sky-400" },
  { keys: ["nextjs", "next"], icon: <SiNextdotjs className="text-gray-200 text-3xl" />, color: "bg-gray-400" },
  { keys: ["typescript", "ts"], icon: <SiTypescript className="text-blue-400 text-3xl" />, color: "bg-blue-500" },
  { keys: ["tailwindcss", "tailwind"], icon: <SiTailwindcss className="text-cyan-400 text-3xl" />, color: "bg-cyan-400" },
  { keys: ["html", "html5"], icon: <SiHtml5 className="text-orange-500 text-3xl" />, color: "bg-orange-500" },
  { keys: ["vue", "vuejs"], icon: <SiVuedotjs className="text-green-500 text-3xl" />, color: "bg-green-500" },

  // --- Backend ---
  { keys: ["node", "nodejs"], icon: <SiNodedotjs className="text-green-500 text-3xl" />, color: "bg-green-500" },
  { keys: ["express"], icon: <SiExpress className="text-gray-300 text-3xl" />, color: "bg-gray-400" },
  { keys: ["django"], icon: <SiDjango className="text-emerald-500 text-3xl" />, color: "bg-emerald-500" },
  { keys: ["fastapi"], icon: <SiFastapi className="text-teal-400 text-3xl" />, color: "bg-teal-400" },
  { keys: ["spring", "springboot"], icon: <SiSpringboot className="text-green-600 text-3xl" />, color: "bg-green-600" },
  { keys: ["flask"], icon: <SiFlask className="text-gray-200 text-3xl" />, color: "bg-gray-600" },

  // --- Databases ---
  { keys: ["mongodb", "mongo"], icon: <SiMongodb className="text-green-500 text-3xl" />, color: "bg-green-500" },
  { keys: ["postgres", "postgresql"], icon: <SiPostgresql className="text-sky-500 text-3xl" />, color: "bg-sky-500" },
  { keys: ["mysql"], icon: <SiMysql className="text-blue-600 text-3xl" />, color: "bg-blue-600" },
  { keys: ["sql"], icon: <SiMysql className="text-blue-600 text-3xl" />, color: "bg-blue-600" },
  { keys: ["sqlite"], icon: <SiSqlite className="text-indigo-400 text-3xl" />, color: "bg-indigo-400" },
  { keys: ["redis"], icon: <SiRedis className="text-red-500 text-3xl" />, color: "bg-red-500" },

  // --- DevOps / Tools ---
  { keys: ["docker"], icon: <SiDocker className="text-sky-400 text-3xl" />, color: "bg-sky-400" },
  { keys: ["kubernetes", "k8s"], icon: <SiKubernetes className="text-blue-500 text-3xl" />, color: "bg-blue-500" },
  { keys: ["git"], icon: <SiGit className="text-orange-500 text-3xl" />, color: "bg-orange-500" },
  { keys: ["github"], icon: <SiGithub className="text-gray-200 text-3xl" />, color: "bg-gray-400" },
  { keys: ["jenkins"], icon: <SiJenkins className="text-red-500 text-3xl" />, color: "bg-red-500" },
  { keys: ["linux"], icon: <SiLinux className="text-yellow-400 text-3xl" />, color: "bg-yellow-400" },
  { keys: ["aws", "amazon", "amazonwebservices"], icon: <SiAmazon className="text-orange-400 text-3xl" />, color: "bg-orange-400" },

  // --- Scraping / Automation ---
  { keys: ["selenium"], icon: <SiSelenium className="text-green-400 text-3xl" />, color: "bg-green-400" },
  { keys: ["beautifulsoup", "BeutifulSoup", "bs4", "scraping"], icon: <GiSpiderWeb className="text-pink-400 text-3xl" />, color: "bg-pink-400" },
];

const getIconEntry = (tech: string | undefined | null) => {
  const key = normalize(String(tech ?? ""));
  if (!key) return undefined;
  // exact alias hit
  for (const entry of iconAliases) {
    if (entry.keys.includes(key)) return entry;
  }
  // partial includes
  for (const entry of iconAliases) {
    if (entry.keys.some((k) => key.includes(k))) return entry;
  }
  return undefined;
};

// --- Main Component ---

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [active, setActive] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSkills()
      .then((data) => {
        setSkills(data);
        if (data.length > 0) setActive(data[0].stack);
      })
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const s = new Set<string>();
    skills.forEach((k) => s.add(k.stack));
    return Array.from(s);
  }, [skills]);

  const grouped = useMemo(() => {
    const map: Record<string, SkillItem[]> = {};
    for (const s of skills) {
      if (!map[s.stack]) map[s.stack] = [];
      map[s.stack].push(s);
    }
    return map;
  }, [skills]);

  if (loading) {
    return (
      <section id="skills" className="py-20 w-full bg-slate-900 min-h-[300px] flex items-center justify-center">
        <FiZap className="animate-pulse text-indigo-400 text-4xl" />
        <p className="ml-3 text-indigo-400 text-lg">Loading Skills...</p>
      </section>
    );
  }

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-20 w-full bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial gradient for a modern feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[300px] relative z-10">
        <div className="text-center mb-12">
          <p className="text-indigo-400 font-semibold mb-2 uppercase tracking-wider flex items-center justify-center">
            <FiZap className="mr-2" /> My Technical Arsenal
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of the technologies I master, categorized by stack proficiency.
          </p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-indigo-500/10 w-full p-8 md:p-10 border border-slate-700/50">

          {/* Category Tabs with enhanced styling */}
          <div className="flex flex-wrap gap-4 justify-center mb-10 border-b border-slate-700 pb-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`
                  px-6 py-2 rounded-full text-base font-medium transition-all duration-300
                  shadow-md hover:scale-[1.03] active:scale-[0.98]
                  ${active === c
                    ? "bg-indigo-500 text-white shadow-indigo-500/40"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }
                `}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Skill Cards Grid with transition and hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(grouped[active] || []).map((s) => (
              <div
                key={`${s.stack}-${s.tech}`}
                className="bg-slate-800/70 border border-slate-700 rounded-xl p-6 transition-all duration-300 transform hover:scale-[1.02] hover:bg-slate-700/80 cursor-default group"
              >
                <div className="flex flex-col items-start">

                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-4">
                    {getIconEntry(s.tech)?.icon || (
                      <div className="w-8 h-8 rounded-lg bg-slate-600 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">?</span>
                      </div>
                    )}
                    <h3 className="text-white font-extrabold text-xl tracking-tight transition-colors group-hover:text-indigo-300">
                      {s.tech}
                    </h3>
                  </div>

                  {/* Proficiency Bar and Text */}
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm font-medium">
                        Proficiency
                      </span>
                      <span className="text-white font-bold text-sm">
                        {s.Proficiency}%
                      </span>
                    </div>

                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${getIconEntry(s.tech)?.color || "bg-indigo-500"}`}
                        style={{ width: `${Number(String(s.Proficiency).replace("%", ""))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;