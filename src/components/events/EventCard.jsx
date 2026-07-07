import { CATEGORY_COLORS } from "../../utils/constants";
import styles from "./events.module.css";

function formatDateRange(startDate, endDate) {
  const start = startDate.slice(5).replace("-", ".");
  if (startDate === endDate) return start;
  const end = endDate.slice(5).replace("-", ".");
  return `${start} - ${end}`;
}

export default function EventCard({ event, reason }) {
  const color = CATEGORY_COLORS[event.category] ?? "var(--primary)";

  return (
    <div className={styles.card}>
      <span className={styles.categoryTag} style={{ backgroundColor: color }}>
        {event.category}
      </span>
      <h3 className={styles.title}>{event.title}</h3>
      <p className={styles.meta}>
        {formatDateRange(event.startDate, event.endDate)} · {event.location.address.split(" ").slice(0, 2).join(" ")} ·{" "}
        {event.isFree ? "무료" : event.cost}
      </p>
      {reason && <span className={styles.badge}>{reason}</span>}
    </div>
  );
}
