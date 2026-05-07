import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projectsAPI } from "@/lib/api-client";
import type { Project } from "@/lib/types";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";

interface ProjectsManagerProps {
  projects: Project[];
  onRefresh: () => void;
}

export function ProjectsManager({ projects, onRefresh }: ProjectsManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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
    toastTimer.current = window.setTimeout(() => setToast(null), 3000);
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(", "),
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
        featured: false,
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        githubUrl: formData.githubUrl,
        liveUrl: formData.liveUrl,
        featured: formData.featured,
      };

      if (editingProject) {
        await projectsAPI.update(editingProject._id, projectData);
        showToast("success", `Project "${formData.title}" updated successfully!`);
      } else {
        await projectsAPI.create(projectData);
        showToast("success", `Project "${formData.title}" created successfully!`);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (error: any) {
      console.error("Error saving project:", error);
      showToast("error", `Error saving project: ${error?.message || 'Unknown error'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: string) => {
    setConfirmState({ show: true, id });
  };

  const confirmDelete = async () => {
    const id = confirmState.id;
    if (!id) return;

    try {
      await projectsAPI.delete(id);
      showToast("success", "Project deleted successfully!");
      onRefresh();
    } catch (error: any) {
      console.error("Error deleting project:", error);
      showToast("error", `Error deleting project: ${error?.message || 'Unknown error'}`);
    } finally {
      setConfirmState({ show: false });
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed right-6 top-6 z-60">
          <div
            className={`max-w-xs rounded-lg border px-4 py-3 shadow-lg text-white ${
              toast.type === "success"
                ? "border-emerald-400 bg-emerald-600/95"
                : toast.type === "error"
                ? "border-red-400 bg-red-600/95"
                : "border-slate-500 bg-slate-700/95"
            }`}
          >
            <div className="font-semibold">{toast.message}</div>
          </div>
        </div>
      )}

      {confirmState.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-lg border border-blue-800 bg-slate-900 p-5 shadow-xl">
            <h4 className="mb-2 text-lg font-bold">Confirm Delete</h4>
            <p className="mb-4 text-sm text-slate-300">Are you sure you want to delete this project?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmState({ show: false })}
                className="rounded bg-slate-700 px-3 py-2 transition hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded bg-red-600 px-3 py-2 text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel rounded-lg p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-lg">{project.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(project)}
                  className="p-2 hover:bg-blue-600/20 rounded transition"
                  title="Edit"
                >
                  <FiEdit2 className="text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-2 hover:bg-red-600/20 rounded transition"
                  title="Delete"
                >
                  <FiTrash2 className="text-red-600" />
                </button>
              </div>
            </div>

            <p className="text-sm text-[color:var(--muted)] mb-3 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-3">
              {project.technologies.slice(0, 3).map((tech, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-blue-600/20 rounded">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs px-2 py-1 bg-blue-600/20 rounded">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {project.featured && (
              <span className="inline-block text-xs px-2 py-1 bg-amber-600/20 text-amber-600 rounded mb-2">
                Featured
              </span>
            )}
          </motion.div>
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
            className="w-full max-w-2xl bg-slate-900 rounded-lg p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-2xl">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500"
                required
              />

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Project Image {editingProject ? "(Leave blank to keep existing)" : "*"}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500 text-sm"
                  required={!editingProject && !imageFile}
                />
              </div>

              <textarea
                placeholder="Project Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500 resize-none h-24"
                required
              />

              <input
                type="text"
                placeholder="Technologies (comma-separated)"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500"
              />

              <input
                type="url"
                placeholder="GitHub URL"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500"
              />

              <input
                type="url"
                placeholder="Live URL"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Featured Project</span>
              </label>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded hover:from-blue-700 hover:to-cyan-600 transition disabled:opacity-50"
                >
                  {isUploading ? "Saving..." : editingProject ? "Update" : "Create"}
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
