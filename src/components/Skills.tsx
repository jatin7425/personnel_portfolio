"use client";
import React, { useEffect, useMemo, useState } from "react";
import { fetchSkills } from "@/services/skills.service";
import { SkillItem } from "@/types/skills";

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
    <section id="skills" className="py-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Skills & Expertise</h2>
          <p className="text-gray-300">A comprehensive overview of my technical skills and proficiency levels</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-medium ${active === c ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-200"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(grouped[active] || []).map((s) => (
            <div key={`${s.stack}-${s.tech}`} className="bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-lg">{s.tech}</h3>
                <span className="text-slate-300 text-sm">{s.Proficiency}% Proficiency</span>
              </div>
              <div className="h-2 bg-slate-700 rounded">
                <div
                  className="h-2 rounded bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${Number(String(s.Proficiency).replace('%',''))}%` }}
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


