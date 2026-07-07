import { DISTANCE_FILTERS } from "../../utils/constants";
import styles from "./events.module.css";

export default function DistanceFilter({ value, onChange }) {
  return (
    <div className={styles.tabRow}>
      {DISTANCE_FILTERS.map((f) => (
        <button
          key={f.key}
          type="button"
          className={`${styles.tab} ${value === f.key ? styles.tabActive : ""}`}
          onClick={() => onChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
