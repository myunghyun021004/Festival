import styles from "./Chip.module.css";

export default function Chip({ label, selected, onClick, disabled, size = "md" }) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${selected ? styles.selected : ""} ${styles[size] ?? ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
