import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { skillsAPI } from "@/lib/api-client";
import type { Skill } from "@/lib/types";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";

interface SkillsManagerProps {
  skills: Skill[];
  onRefresh: () => void;
}

export function SkillsManager({ skills, onRefresh }: SkillsManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    proficiency: 75,
  });
  const [toast, setToast] = useState<null | { type: "success" | "error" | "info"; message: string }>(null);
  const [confirmState, setConfirmState] = useState<{ show: boolean; id?: string }>({ show: false });

  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = (type: "success" | "error" | "info", message: string) => {
    setToast({ type, message });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    // auto hide
    // @ts-ignore
    toastTimer.current = window.setTimeout(() => setToast(null), 3000);
  };

  const handleOpenModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency || 75,
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: "",
        category: "Frontend",
        proficiency: 75,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const skillData = {
        name: formData.name,
        category: formData.category,
        proficiency: formData.proficiency,
      };

      if (editingSkill) {
        await skillsAPI.update(editingSkill._id, skillData);
        showToast("success", `Skill "${formData.name}" updated successfully!`);
      } else {
        await skillsAPI.create(skillData);
        showToast("success", `Skill "${formData.name}" created successfully!`);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (error: any) {
      console.error("Error saving skill:", error);
      showToast("error", `Error saving skill: ${error?.message || 'Unknown error'}`);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmState({ show: true, id });
  };

  const confirmDelete = async () => {
    const id = confirmState.id;
    if (!id) return;
    try {
      await skillsAPI.delete(id);
      showToast("success", "Skill deleted successfully!");
      onRefresh();
    } catch (error: any) {
      console.error("Error deleting skill:", error);
      showToast("error", `Error deleting skill: ${error?.message || 'Unknown error'}`);
    } finally {
      setConfirmState({ show: false });
    }
  };

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed right-6 top-6 z-60">
          <div
            className={`px-4 py-3 rounded-lg shadow-lg border ${
              toast.type === "success"
                ? "bg-emerald-600/95 border-emerald-400"
                : toast.type === "error"
                ? "bg-red-600/95 border-red-400"
                : "bg-slate-700/95 border-slate-500"
            } text-white max-w-xs`}
          >
            <div className="font-semibold">{toast.message}</div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {confirmState.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm bg-slate-900 rounded-lg p-5 shadow-xl border border-blue-800">
            <h4 className="text-lg font-bold mb-2">Confirm Delete</h4>
            <p className="text-sm text-slate-300 mb-4">Are you sure you want to delete this skill?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmState({ show: false })} className="px-3 py-2 rounded bg-slate-700 hover:bg-slate-600 transition">Cancel</button>
              <button onClick={confirmDelete} className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skills</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition"
        >
          <FiPlus /> Add Skill
        </button>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.keys(groupedSkills).map((category) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-3 text-blue-400">{category}</h3>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {groupedSkills[category].map((skill) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-panel rounded-lg p-4 flex items-start justify-between"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{skill.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 bg-blue-600/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold w-10 text-right">
                        {skill.proficiency}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleOpenModal(skill)}
                      className="p-1.5 hover:bg-blue-600/20 rounded transition"
                      title="Edit"
                    >
                      <FiEdit2 className="text-blue-600 w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="p-1.5 hover:bg-red-600/20 rounded transition"
                      title="Delete"
                    >
                      <FiTrash2 className="text-red-600 w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-full max-w-md bg-slate-900 rounded-lg p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {editingSkill ? "Edit Skill" : "Add New Skill"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-2xl">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Skill Name (e.g., React, Python)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500"
                required
              />

              <div className="relative">
                <Dropdown
                  value={formData.category}
                  onChange={(val: string) => setFormData({ ...formData, category: val })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm">
                  Proficiency: <span className="font-bold text-blue-400">{formData.proficiency}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) =>
                    setFormData({ ...formData, proficiency: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-blue-600/30 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded hover:from-blue-700 hover:to-cyan-600 transition"
                >
                  {editingSkill ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Simple custom dropdown with nice styling
function Dropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const options = ["Frontend", "Backend", "AI/ML", "Tools"];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full text-left px-3 py-2 bg-white/5 border border-blue-800 rounded flex items-center justify-between"
      >
        <span className="text-sm">{value}</span>
        <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-slate-800 rounded shadow-lg border border-blue-800 z-50">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-600/20 ${opt === value ? "bg-blue-600/10" : ""}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
