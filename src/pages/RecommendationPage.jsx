import { useMemo, useState } from "react";
import DistanceFilter from "../components/events/DistanceFilter";
import EventList from "../components/events/EventList";
import Chip from "../components/common/Chip";
import ContactForm from "../components/common/ContactForm";
import { mockEvents } from "../data/mockEvents";
import { getRecommendations } from "../utils/matchScore";
import { INTEREST_CATEGORIES } from "../utils/constants";
import styles from "./pages.module.css";

export default function RecommendationPage({ profile, onEdit }) {
  const [distanceKey, setDistanceKey] = useState("neighborhood");
  const [categories, setCategories] = useState(profile.interests);

  const recommendations = useMemo(
    () => getRecommendations(mockEvents, profile, { distanceKey, categories }),
    [profile, distanceKey, categories]
  );

  function toggleCategory(category) {
    setCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
  }

  return (
    <div className={styles.container}>
      <div className={styles.recHeader}>
        <p className={styles.summaryLine}>
          {profile.region.district}·{profile.region.dong} 근처 행사 {recommendations.length}건
        </p>
        <button type="button" className={styles.editLink} onClick={onEdit}>
          내 정보 수정
        </button>
      </div>

      <section className={styles.section}>
        <DistanceFilter value={distanceKey} onChange={setDistanceKey} />
      </section>

      <section className={styles.section}>
        <div className={styles.chipRow}>
          {INTEREST_CATEGORIES.map((category) => (
            <Chip
              key={category}
              label={category}
              selected={categories.includes(category)}
              onClick={() => toggleCategory(category)}
              size="sm"
            />
          ))}
        </div>
      </section>

      <EventList recommendations={recommendations} />

      <ContactForm />
    </div>
  );
}
