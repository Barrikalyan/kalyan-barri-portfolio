import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { FiLogIn, FiAlertCircle } from "react-icons/fi";

interface LoginFormProps {
  onClose?: () => void;
}

export function LoginForm({ onClose }: LoginFormProps) {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError("Invalid credentials.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-panel rounded-[1.5rem] p-8 backdrop-blur-md">
        <div className="flex items-center justify-center mb-6">
          <FiLogIn className="text-2xl text-blue-600 dark:text-blue-400 mr-3" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Admin Login
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@portfolio.com"
              className="w-full px-4 py-2.5 bg-white/5 dark:bg-black/20 border border-blue-200 dark:border-blue-800 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full px-4 py-2.5 bg-white/5 dark:bg-black/20 border border-blue-200 dark:border-blue-800 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-3 bg-red-500/10 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg"
            >
              <FiAlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}


          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 mt-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        {onClose && (
          <button
            onClick={onClose}
            className="w-full mt-4 py-2 text-sm text-[color:var(--muted)] hover:text-white transition"
          >
            Close
          </button>
        )}
      </div>
    </motion.div>
  );
}
