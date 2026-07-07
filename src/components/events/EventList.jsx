import EventCard from "./EventCard";
import styles from "./events.module.css";

export default function EventList({ recommendations }) {
  if (recommendations.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyTitle}>조건에 맞는 행사가 아직 없어요</p>
        <p className={styles.emptyHint}>카테고리를 하나 더 선택하거나, 거리 범위를 "우리 구"로 넓혀보시겠어요?</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {recommendations.map(({ event, reason }) => (
        <EventCard key={event.id} event={event} reason={reason} />
      ))}
    </div>
  );
}
