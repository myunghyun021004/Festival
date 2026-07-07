import { useState } from "react";
import OnboardingPage from "./pages/OnboardingPage";
import RecommendationPage from "./pages/RecommendationPage";

export default function App() {
  const [profile, setProfile] = useState(null);

  if (!profile) {
    return <OnboardingPage onSubmit={setProfile} />;
  }

  return <RecommendationPage profile={profile} onEdit={() => setProfile(null)} />;
}
