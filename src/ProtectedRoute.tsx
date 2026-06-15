import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch(`${API}/auth/me`, { credentials: "include" })
      .then((res) => {
        if (res.status === 401) navigate("/login");
        else setChecking(false);
      })
      .catch(() => navigate("/login"));
  }, []);

  if (checking) return null; // or a spinner
  return <>{children}</>;
}