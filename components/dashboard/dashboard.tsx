"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { getPortfolioData, type PortfolioData } from "@/lib/site-data";
import { ProjectsManager } from "./projects-manager";
import { SkillsManager } from "./skills-manager";
import { CertificatesManager } from "./certificates-manager";
import { FiLogOut, FiSettings, FiCode, FiAward, FiTrendingUp } from "react-icons/fi";

interface DashboardProps {
  onClose?: () => void;
}

export function Dashboard({ onClose }: DashboardProps) {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "certificates">(
    "projects"
  );
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const portfolioData = await getPortfolioData();
      setData(portfolioData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleRefresh = async () => {
    const portfolioData = await getPortfolioData();
    setData(portfolioData);
    window.dispatchEvent(new Event("portfolio-data-changed"));
  };

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
  };

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-cyan-400 rounded-full mb-4 mx-auto" />
          <p>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: "projects" as const,
      label: "Projects",
      icon: FiCode,
      count: data.projects.length,
    },
    {
      id: "skills" as const,
      label: "Skills",
      icon: FiTrendingUp,
      count: data.skills.length,
    },
    {
      id: "certificates" as const,
      label: "Certificates",
      icon: FiAward,
      count: data.certificates.length,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-blue-800/30 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiSettings className="text-2xl text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition border border-red-600/30"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-blue-800/30 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                    : "bg-blue-600/10 text-white hover:bg-blue-600/20"
                }`}
              >
                <Icon className="text-lg" />
                {tab.label}
                <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full">
                  {tab.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "projects" && (
            <ProjectsManager projects={data.projects} onRefresh={handleRefresh} />
          )}
          {activeTab === "skills" && (
            <SkillsManager skills={data.skills} onRefresh={handleRefresh} />
          )}
          {activeTab === "certificates" && (
            <CertificatesManager
              certificates={data.certificates}
              onRefresh={handleRefresh}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
}
