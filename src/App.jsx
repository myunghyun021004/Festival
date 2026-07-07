import { useEffect, useState } from "react";
import OnboardingPage from "./pages/OnboardingPage";
import RecommendationPage from "./pages/RecommendationPage";
import AuthBar from "./components/auth/AuthBar";

const AUTH_STORAGE_KEY = "festival_auth";

function loadStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [profile, setProfile] = useState(null);
  const [auth, setAuth] = useState(loadStoredAuth);

  useEffect(() => {
    if (!auth?.token) return;
    fetch("/api/me", { headers: { Authorization: `Bearer ${auth.token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(({ user }) => setAuth((prev) => (prev ? { ...prev, user } : prev)))
      .catch(() => {
        setAuth(null);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAuthSuccess(user, token) {
    const next = { user, token };
    setAuth(next);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
  }

  function handleLogout() {
    setAuth(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <>
      <AuthBar user={auth?.user} onAuthSuccess={handleAuthSuccess} onLogout={handleLogout} />
      {!profile ? (
        <OnboardingPage onSubmit={setProfile} />
      ) : (
        <RecommendationPage profile={profile} onEdit={() => setProfile(null)} />
      )}
    </>
  );
}
