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

// Frontend-only icon resolution: normalize, alias, partial match
const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const iconAliases: Array<{ keys: string[]; icon: JSX.Element; color: string }> = [
  // --- Frontend ---
  { keys: ["react"], icon: <SiReact className="text-sky-400 text-2xl" />, color: "bg-sky-400" },
  { keys: ["nextjs", "next"], icon: <SiNextdotjs className="text-gray-200 text-2xl" />, color: "bg-gray-400" },
  { keys: ["typescript", "ts"], icon: <SiTypescript className="text-blue-400 text-2xl" />, color: "bg-blue-500" },
  { keys: ["tailwindcss", "tailwind"], icon: <SiTailwindcss className="text-cyan-400 text-2xl" />, color: "bg-cyan-400" },
  { keys: ["html", "html5"], icon: <SiHtml5 className="text-orange-500 text-2xl" />, color: "bg-orange-500" },
  { keys: ["vue", "vuejs"], icon: <SiVuedotjs className="text-green-500 text-2xl" />, color: "bg-green-500" },

  // --- Backend ---
  { keys: ["node", "nodejs"], icon: <SiNodedotjs className="text-green-500 text-2xl" />, color: "bg-green-500" },
  { keys: ["express"], icon: <SiExpress className="text-gray-300 text-2xl" />, color: "bg-gray-400" },
  { keys: ["django"], icon: <SiDjango className="text-emerald-500 text-2xl" />, color: "bg-emerald-500" },
  { keys: ["fastapi"], icon: <SiFastapi className="text-teal-400 text-2xl" />, color: "bg-teal-400" },
  { keys: ["spring", "springboot"], icon: <SiSpringboot className="text-green-600 text-2xl" />, color: "bg-green-600" },
  { keys: ["flask"], icon: <SiFlask className="text-gray-200 text-2xl" />, color: "bg-gray-600" },

  // --- Databases ---
  { keys: ["mongodb", "mongo"], icon: <SiMongodb className="text-green-500 text-2xl" />, color: "bg-green-500" },
  { keys: ["postgres", "postgresql"], icon: <SiPostgresql className="text-sky-500 text-2xl" />, color: "bg-sky-500" },
  { keys: ["mysql"], icon: <SiMysql className="text-blue-600 text-2xl" />, color: "bg-blue-600" },
  { keys: ["sql"], icon: <SiMysql className="text-blue-600 text-2xl" />, color: "bg-blue-600" },
  { keys: ["sqlite"], icon: <SiSqlite className="text-indigo-400 text-2xl" />, color: "bg-indigo-400" },
  { keys: ["redis"], icon: <SiRedis className="text-red-500 text-2xl" />, color: "bg-red-500" },

  // --- DevOps / Tools ---
  { keys: ["docker"], icon: <SiDocker className="text-sky-400 text-2xl" />, color: "bg-sky-400" },
  { keys: ["kubernetes", "k8s"], icon: <SiKubernetes className="text-blue-500 text-2xl" />, color: "bg-blue-500" },
  { keys: ["git"], icon: <SiGit className="text-orange-500 text-2xl" />, color: "bg-orange-500" },
  { keys: ["github"], icon: <SiGithub className="text-gray-200 text-2xl" />, color: "bg-gray-400" },
  { keys: ["jenkins"], icon: <SiJenkins className="text-red-500 text-2xl" />, color: "bg-red-500" },
  { keys: ["linux"], icon: <SiLinux className="text-yellow-400 text-2xl" />, color: "bg-yellow-400" },
  { keys: ["aws", "amazon", "amazonwebservices"], icon: <SiAmazon className="text-orange-400 text-2xl" />, color: "bg-orange-400" },

  // --- Scraping / Automation ---
  { keys: ["selenium"], icon: <SiSelenium className="text-green-400 text-2xl" />, color: "bg-green-400" },
  { keys: ["beautifulsoup", "BeutifulSoup"], icon: <GiSpiderWeb className="text-pink-400 text-2xl" />, color: "bg-pink-400" },
  { keys: ["bs4"], icon: <GiSpiderWeb className="text-pink-400 text-2xl" />, color: "bg-pink-400" },
  { keys: ["scraping"], icon: <GiSpiderWeb className="text-pink-400 text-2xl" />, color: "bg-pink-400" },
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

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    fetchSkills()
      .then((data) => {
        setSkills(data);
        if (data.length > 0) setActive(data[0].stack);
      })
      .catch(() => setSkills([]));
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

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-20 w-full min-h-[calc(80vh-100px)] bg-[#0f172a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Skills & Expertise</h2>
          <p className="text-gray-300">
            A comprehensive overview of my technical skills and proficiency levels
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${active === c
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(grouped[active] || []).map((s) => (
            <div
              key={`${s.stack}-${s.tech}`}
              className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition py-8"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getIconEntry(s.tech)?.icon || <span className="w-6 h-6 rounded bg-slate-600" />}
                  <h3 className="text-white font-semibold text-lg">{s.tech}</h3>
                </div>
                <span className="text-slate-300 text-sm">
                  {s.Proficiency}% Proficiency
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded overflow-hidden">
                <div
                  className={`h-2 rounded ${getIconEntry(s.tech)?.color || "bg-indigo-500"}`}
                  style={{ width: `${Number(String(s.Proficiency).replace("%", ""))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
