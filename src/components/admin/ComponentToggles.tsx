"use client";
import React, { useEffect, useState } from 'react';

type ComponentItem = { key: string; name: string; enabled: boolean };

export default function ComponentToggles() {
  const [items, setItems] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/components');
      const data = await res.json();
      setItems(data.components || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggle(item: ComponentItem) {
    try {
      const res = await fetch('/api/admin/components', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: item.key, enabled: !item.enabled }) });
      if (!res.ok) throw new Error('Failed');
      setItems((prev) => prev.map((p) => (p.key === item.key ? { ...p, enabled: !p.enabled } : p)));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="p-4 bg-gray-900 rounded text-white">
      <h3 className="text-lg font-semibold mb-2">Component Toggles</h3>
      {loading && <div>Loading...</div>}
      <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
        {items.map((it) => (
          <label key={it.key} className="flex items-center justify-between gap-2 bg-gray-800 p-2 rounded">
            <div className="truncate">{it.name} <span className="text-sm text-gray-400">({it.key})</span></div>
            <button onClick={() => toggle(it)} className={`px-3 py-1 rounded ${it.enabled ? 'bg-green-600' : 'bg-red-600'}`}>{it.enabled ? 'On' : 'Off'}</button>
          </label>
        ))}
      </div>
    </div>
  );
}
