"use client";
import React, { useEffect, useState } from 'react';

type UiConfig = {
  renderAboutSection: boolean;
  renderSkillsSection: boolean;
  renderProjectsSection: boolean;
  renderTechStackVisualization: boolean;
};

export default function UIConfigEditor() {
  const [config, setConfig] = useState<UiConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/ui_config')
      .then((r) => r.json())
      .then((data) => {
        // api returns { UI_Config: [...] }
        const items = data?.UI_Config ?? [];
        if (items.length > 0) setConfig(items[0]);
      })
      .catch((e) => console.error(e));
  }, []);

  async function save() {
    if (!config) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/ui_config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');
      setMessage('Saved');
    } catch (e: any) {
      setMessage(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function refreshComponents() {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/refresh-components', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');
      setMessage(`Components: ${data.components}`);
    } catch (e: any) {
      setMessage(String(e?.message || e));
    } finally {
      setLoading(false);
    }
  }

  if (!config) return <div>Loading config...</div>;

  return (
    <div className="p-4 bg-gray-800 rounded text-white">
      <h3 className="text-lg font-semibold mb-2">UI Config</h3>
      <div className="flex flex-col gap-2">
        {Object.keys(config).map((k) => (
          <label key={k} className="flex items-center gap-2">
            <input type="checkbox" checked={(config as any)[k]} onChange={(e) => setConfig({ ...(config as any), [k]: e.target.checked })} />
            <span className="capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
          </label>
        ))}

        <div className="flex gap-2 mt-3">
          <button onClick={save} disabled={loading} className="px-3 py-1 bg-blue-600 rounded">Save</button>
          <button onClick={refreshComponents} disabled={loading} className="px-3 py-1 bg-green-600 rounded">Refresh Components Count</button>
        </div>

        {message && <div className="mt-2 text-sm">{message}</div>}
      </div>
    </div>
  );
}
