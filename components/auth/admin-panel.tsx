import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoginForm } from "./login-form";
import { Dashboard } from "@/components/dashboard/dashboard";
import { useAuth } from "@/lib/auth-context";
import { FiLogIn, FiX, FiLogOut } from "react-icons/fi";

export function AdminPanel() {
  const { isAuthenticated, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleDashboardClose = () => {
    setShowDashboard(false);
  };

  const handleLogout = () => {
    logout();
    setShowDashboard(false);
  };

  return (
    <>
      {/* Floating Login/Dashboard Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {isAuthenticated && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition bg-gradient-to-r from-red-600 to-rose-500 text-white hover:shadow-red-600/50"
            title="Logout"
          >
            <FiLogOut className="text-lg" />
            <span className="text-sm font-semibold text-white">Logout</span>
          </motion.button>
        )}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (isAuthenticated) {
              setShowDashboard(!showDashboard);
            } else {
              setShowLogin(true);
            }
          }}
          className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition text-white ${
            isAuthenticated
              ? "bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-green-600/50"
              : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-blue-600/50"
          }`}
          title={isAuthenticated ? "Open Dashboard" : "Admin Login"}
        >
          <FiLogIn className="text-lg" />
          <span className="text-sm font-semibold">{isAuthenticated ? "Dashboard" : "Admin"}</span>
        </motion.button>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLogin(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition"
              >
                <FiX className="w-6 h-6" />
              </button>
              <LoginForm onClose={() => setShowLogin(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Modal/Overlay */}
      <AnimatePresence>
        {showDashboard && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950 overflow-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleDashboardClose}
              className="fixed top-6 right-6 z-60 p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Dashboard Content */}
            <Dashboard />

            {/* Logout Button in Dashboard Header is handled by Dashboard component */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
