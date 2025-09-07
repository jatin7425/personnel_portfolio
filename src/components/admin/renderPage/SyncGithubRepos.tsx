"use client";
import { useCallback, useEffect, useState } from "react";

// --- TYPE DEFINITION ---
type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

// --- SVG ICONS FOR UI ENHANCEMENT ---
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const SpinnerIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
    <path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z" />
  </svg>
);

// --- MAIN COMPONENT ---
export default function SyncGithubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [message, setMessage] = useState("");

  // Step 1: grab token from URL or localStorage
  const fetchRepos = useCallback(async (accessToken: string) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        "https://api.github.com/user/repos",
        {
          headers: {
            Authorization: `token ${accessToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch repositories from GitHub.");
      }
      const repos = await res.json();
      setRepos(repos);
    } catch (error: any) {
      console.error("Error fetching repos:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchToken = useCallback(async (code: string) => {
    try {
      const res = await fetch(`/api/github/token?code=${code}`);
      if (!res.ok) {
        throw new Error("Failed to fetch GitHub token.");
      }
      const data = await res.json();
      const fetchedToken = data.accessToken;
      if (fetchedToken) {
        setToken(fetchedToken);
        localStorage.setItem("github_token", fetchedToken);
        fetchRepos(fetchedToken);
      } else {
        setMessage("Error: No access token received. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      setMessage(
        "Error: Could not authenticate with GitHub. Please try again."
      );
    }
  }, [fetchRepos]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetchToken(code);
    } else {
      const tokenFromLocalStorage = localStorage.getItem("github_token");
      if (tokenFromLocalStorage) {
        setToken(tokenFromLocalStorage);
        fetchRepos(tokenFromLocalStorage);
      }
    }
    // Clean up the URL to prevent re-fetching on refresh
    window.history.replaceState({}, document.title, window.location.pathname);
  }, [fetchToken, fetchRepos]);

  // Step 2: Fetch repositories from GitHub

  const handleSelect = (repoId: number) => {
    setSelected((prev) =>
      prev.includes(repoId)
        ? prev.filter((id) => id !== repoId)
        : [...prev, repoId]
    );
  };

  const handleSyncSelected = async () => {
    if (!token || syncing || selected.length === 0) return;
    const reposToSync = repos.filter((r) => selected.includes(r.id));
    setSyncing(true);
    setMessage("");
    try {
      const res = await fetch("/api/sync-selected-repos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repos: reposToSync, accessToken: token }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Syncing failed.");
      }
      setMessage(`Successfully synced ${reposToSync.length} repositories!`);
      setSelected([]);
      window.location.href = '/admin/projects'; // Reload to reflect changes
    } catch (err: any) {
      console.error(err);
      setMessage(`Error: ${err.message || "Failed to sync selected repos."}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleSwitchAccount = () => {
    localStorage.removeItem("github_token");
    setToken(null);
    setRepos([]);
    setSelected([]);
    setMessage("");
    window.location.href = "/api/github/login";
  };

  const renderContent = () => {
    if (!token) {
      return (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-100 mb-4">
            Sync Your GitHub Repositories
          </h1>
          <p className="text-slate-400 mb-8">
            Login with your GitHub account to get started.
          </p>
          <button
            onClick={() => (window.location.href = "/api/github/login")}
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            <GitHubIcon />
            Login with GitHub
          </button>
        </div>
      );
    }

    return (
      <div className="w-full max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Select Repos to Sync
          </h2>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-slate-300 bg-slate-700/50 px-3 py-1 rounded-full">
              {selected.length} / {repos.length} selected
            </p>
            <button
              onClick={() => fetchRepos(token)}
              disabled={loading}
              className="inline-flex items-center justify-center text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
            >
              {loading ? <SpinnerIcon /> : "Resync"}
            </button>
            <button
              onClick={handleSwitchAccount}
              className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              Switch Account
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <SpinnerIcon />
            <p className="mt-4 text-lg">Fetching your repositories...</p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-[50vh] pr-4 -mr-4 custom-scrollbar">
            <ul className="space-y-3">
              {repos.map((repo) => {
                const isSelected = selected.includes(repo.id);
                return (
                  <li key={repo.id}>
                    <label
                      htmlFor={`repo-${repo.id}`}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                        isSelected
                          ? "bg-cyan-500/10 border-cyan-500"
                          : "bg-slate-800/60 border-slate-700 hover:border-slate-500"
                      }`}
                    >
                      <div className="relative flex items-center">
                        <input
                          id={`repo-${repo.id}`}
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelect(repo.id)}
                          className="sr-only" // Hide default checkbox
                        />
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 border-2 ${
                            isSelected
                              ? "bg-cyan-500 border-cyan-400 text-white"
                              : "bg-slate-700 border-slate-600 text-transparent"
                          }`}
                        >
                          <CheckIcon />
                        </div>
                      </div>
                      <div className="ml-4">
                        <span
                          className={`font-semibold ${
                            isSelected ? "text-cyan-300" : "text-slate-200"
                          }`}
                        >
                          {repo.name}
                        </span>
                        <p className="text-sm text-slate-400 truncate max-w-md">
                          {repo.description || "No description"}
                        </p>
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleSyncSelected}
            className="w-full flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 font-semibold rounded-lg shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-700"
            disabled={syncing || selected.length === 0}
          >
            {syncing ? (
              <>
                <SpinnerIcon /> Syncing...
              </>
            ) : (
              `Sync ${selected.length} Selected Repos`
            )}
          </button>
          {message && (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                message.startsWith("Error") ? "text-red-400" : "text-green-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    );
  };

  // This is the main return that sets up the page background and centers the content
  return (
    <main className="min-h-screen w-full bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex items-center justify-center p-4">
      {renderContent()}
    </main>
  );
}