"use client";
import React, { useEffect, useMemo, useState } from "react";
import { SkillItem } from "@/types/skills";
import { createSkill, deleteSkill, fetchSkills, updateSkill } from "@/services/skills.service";

const emptyForm: Omit<SkillItem, "_id"> = { stack: "Frontend", tech: "", Proficiency: "0" };

const Skills = () => {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [active, setActive] = useState<string>("Frontend");
  const [form, setForm] = useState<Omit<SkillItem, "_id">>(emptyForm);
  const [stackOption, setStackOption] = useState<string>("Frontend");
  const [customStack, setCustomStack] = useState<string>("");
  const [editing, setEditing] = useState<SkillItem | null>(null);

  const refresh = async () => setSkills(await fetchSkills());

  useEffect(() => {
    refresh();
  }, []);

  const categories = useMemo(() => {
    const base = ["Frontend", "Backend", "Database", "Scraping", "Tools"];
    const set = new Set<string>();
    for (const b of base) set.add(b);
    if (skills.length === 0) set.add("Frontend");
    skills.forEach((s) => set.add(s.stack));
    return Array.from(set);
  }, [skills]);

  const grouped = useMemo(() => {
    const map: Record<string, SkillItem[]> = {};
    for (const s of skills) {
      if (!map[s.stack]) map[s.stack] = [];
      map[s.stack].push(s);
    }
    return map;
  }, [skills]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure form.stack reflects the selected option or custom input
    const finalStack = stackOption === "__custom" ? (customStack || "Custom") : stackOption;
    if (form.stack !== finalStack) {
      setForm((p) => ({ ...p, stack: finalStack }));
    }
    if (editing) {
      await updateSkill({ ...editing, ...form, stack: finalStack });
      setEditing(null);
    } else {
      await createSkill({ ...form, stack: finalStack });
    }
    setForm(emptyForm);
    setStackOption("Frontend");
    setCustomStack("");
    setActive(finalStack);
    await refresh();
  };

  const onCancelEdit = () => {
    setEditing(null);
    setForm(emptyForm);
    setStackOption("Frontend");
    setCustomStack("");
  };

  const onEdit = (s: SkillItem) => {
    setEditing(s);
    setForm({ stack: s.stack, tech: s.tech, Proficiency: s.Proficiency });
    if (["Frontend", "Backend", "Database", "Scraping", "Tools"].includes(s.stack)) {
      setStackOption(s.stack);
      setCustomStack("");
    } else {
      setStackOption("__custom");
      setCustomStack(s.stack);
    }
  };

  const onDelete = async (id: string) => {
    if (confirm("Delete this skill?")) {
      await deleteSkill(id);
      await refresh();
    }
  };

  return (
    <div className="p-6 bg-slate-900 w-full">
      <h1 className="text-3xl font-bold text-white mb-6">Manage Skills</h1>

      <form onSubmit={onSubmit} className="bg-slate-800 rounded-xl p-5 mb-6 grid md:grid-cols-4 gap-3">
        {editing && (
          <div className="md:col-span-4 -mb-1 text-sm text-amber-300">
            Editing: <span className="font-semibold">{editing.tech}</span>
          </div>
        )}
        <select
          value={stackOption}
          onChange={(e) => {
            const v = e.target.value;
            setStackOption(v);
            if (v !== "__custom") {
              setForm((p) => ({ ...p, stack: v }));
            } else {
              setForm((p) => ({ ...p, stack: customStack || "" }));
            }
          }}
          className="bg-slate-700 text-white p-3 rounded"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
          <option value="__custom">Custom</option>
        </select>
        {stackOption === "__custom" && (
          <input
            value={customStack}
            onChange={(e) => {
              const v = e.target.value;
              setCustomStack(v);
              setForm((p) => ({ ...p, stack: v }));
            }}
            placeholder="Custom category"
            className="bg-slate-700 text-white p-3 rounded"
          />
        )}
        <input
          value={form.tech}
          onChange={(e) => setForm((p) => ({ ...p, tech: e.target.value }))}
          placeholder="Technology"
          className="bg-slate-700 text-white p-3 rounded"
        />
        <input
          type="number"
          min={0}
          max={100}
          value={form.Proficiency}
          onChange={(e) => setForm((p) => ({ ...p, Proficiency: e.target.value }))}
          placeholder="Proficiency (0-100)"
          className="bg-slate-700 text-white p-3 rounded"
        />
        <div className="flex items-stretch gap-2">
          <button type="submit" className="bg-indigo-600 text-white rounded px-4 py-2">
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button type="button" onClick={onCancelEdit} className="bg-slate-600 text-white rounded px-4 py-2">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex gap-3 mb-6 flex-wrap">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full ${active === c ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-200"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(grouped[active] || []).map((s) => (
          <div key={s._id} className="bg-slate-800 rounded-xl p-5">
            <div className="text-white font-semibold">{s.tech}</div>
            <div className="text-slate-300 text-sm">{s.Proficiency}% Proficiency</div>
            <div className="mt-3 h-2 bg-slate-700 rounded">
              <div className="h-2 bg-indigo-500 rounded" style={{ width: `${s.Proficiency}%` }} />
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => onEdit(s)} className="text-amber-400">Edit</button>
              {s._id && (
                <button onClick={() => onDelete(s._id!)} className="text-red-400">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;


