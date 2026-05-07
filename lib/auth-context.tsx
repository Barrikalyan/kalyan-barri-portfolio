import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default credentials - change these to your own
const DEFAULT_CREDENTIALS: AdminCredentials = {
  email: "kalyanbarri4@gmail.com",
  password: "Kalyan@006",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check credentials
      if (email === DEFAULT_CREDENTIALS.email && password === DEFAULT_CREDENTIALS.password) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_auth", "true");
        return true;
      } else {
        setIsAuthenticated(false);
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  // Check if user was previously authenticated on mount
  useEffect(() => {
    const wasAuthenticated = localStorage.getItem("admin_auth") === "true";
    if (wasAuthenticated) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
