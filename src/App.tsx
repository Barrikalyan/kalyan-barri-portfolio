import { useEffect, useState } from "react";
import { AuthProvider } from "@/lib/auth-context";
import { PortfolioClient } from "@/components/portfolio-client";
import { AdminPanel } from "@/components/auth/admin-panel";
import { getPortfolioData, type PortfolioData } from "@/lib/site-data";

export function App() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPortfolioData = () => {
      void getPortfolioData().then((portfolioData) => {
        if (isMounted) {
          setData(portfolioData);
        }
      });
    };

    loadPortfolioData();

    const handlePortfolioDataChanged = () => {
      loadPortfolioData();
    };

    window.addEventListener("portfolio-data-changed", handlePortfolioDataChanged);

    return () => {
      isMounted = false;
      window.removeEventListener("portfolio-data-changed", handlePortfolioDataChanged);
    };
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[color:var(--muted)]">
        Loading portfolio...
      </div>
    );
  }

  return (
    <AuthProvider>
      <PortfolioClient initialData={data} />
      <AdminPanel />
    </AuthProvider>
  );
}