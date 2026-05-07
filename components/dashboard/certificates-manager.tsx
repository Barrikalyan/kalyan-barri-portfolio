import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { certificatesAPI } from "@/lib/api-client";
import type { Certificate } from "@/lib/types";
import { FiPlus, FiTrash2, FiEdit2, FiX } from "react-icons/fi";

interface CertificatesManagerProps {
  certificates: Certificate[];
  onRefresh: () => void;
}

export function CertificatesManager({ certificates, onRefresh }: CertificatesManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    certificateUrl: "",
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

  const handleOpenModal = (certificate?: Certificate) => {
    if (certificate) {
      setEditingCertificate(certificate);
      setFormData({
        title: certificate.title,
        issuer: certificate.issuer,
        date: certificate.date,
        certificateUrl: certificate.certificateUrl || "",
      });
    } else {
      setEditingCertificate(null);
      setFormData({
        title: "",
        issuer: "",
        date: "",
        certificateUrl: "",
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const certificateData = {
        title: formData.title,
        issuer: formData.issuer,
        date: formData.date,
        certificateUrl: formData.certificateUrl,
      };

      if (editingCertificate) {
        await certificatesAPI.update(editingCertificate._id, certificateData);
        showToast("success", `Certificate "${formData.title}" updated successfully!`);
      } else {
        await certificatesAPI.create(certificateData);
        showToast("success", `Certificate "${formData.title}" created successfully!`);
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (error: any) {
      console.error("Error saving certificate:", error);
      showToast("error", `Error saving certificate: ${error?.message || 'Unknown error'}`);
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
      await certificatesAPI.delete(id);
      showToast("success", "Certificate deleted successfully!");
      onRefresh();
    } catch (error: any) {
      console.error("Error deleting certificate:", error);
      showToast("error", `Error deleting certificate: ${error?.message || 'Unknown error'}`);
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
            <p className="mb-4 text-sm text-slate-300">Are you sure you want to delete this certificate?</p>
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
        <h2 className="text-2xl font-bold">Certificates</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition"
        >
          <FiPlus /> Add Certificate
        </button>
      </div>

      {/* Certificates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <motion.div
            key={certificate._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{certificate.title}</h3>
                <p className="text-sm text-blue-400 mt-1">{certificate.issuer}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleOpenModal(certificate)}
                  className="p-2 hover:bg-blue-600/20 rounded transition"
                  title="Edit"
                >
                  <FiEdit2 className="text-blue-600 w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(certificate._id)}
                  className="p-2 hover:bg-red-600/20 rounded transition"
                  title="Delete"
                >
                  <FiTrash2 className="text-red-600 w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-[color:var(--muted)] mb-3">{certificate.date}</p>

            {certificate.certificateUrl && (
              <a
                href={certificate.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 underline"
              >
                View Certificate →
              </a>
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
            className="w-full max-w-md bg-slate-900 rounded-lg p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                {editingCertificate ? "Edit Certificate" : "Add New Certificate"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-2xl">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Certificate Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500"
                required
              />

              <div className="space-y-1">
                <label className="text-sm text-gray-400">Certificate Image {editingCertificate ? "(Leave blank to keep existing)" : "*"}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500 text-sm"
                  required={!editingCertificate && !imageFile}
                />
              </div>

              <input
                type="text"
                placeholder="Issuing Organization"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500"
                required
              />

              <input
                type="text"
                placeholder="Year (e.g., 2025, 2024)"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500"
              />

              <input
                type="url"
                placeholder="Certificate URL (optional)"
                value={formData.certificateUrl}
                onChange={(e) => setFormData({ ...formData, certificateUrl: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-blue-800 rounded focus:outline-none focus:border-blue-500"
              />

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded hover:from-blue-700 hover:to-cyan-600 transition disabled:opacity-50"
                >
                  {isUploading ? "Saving..." : editingCertificate ? "Update" : "Create"}
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
