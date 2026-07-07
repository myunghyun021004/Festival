import Chip from "../common/Chip";
import { INTEREST_CATEGORIES } from "../../utils/constants";
import styles from "./onboarding.module.css";

export default function InterestTags({ value, onChange }) {
  function toggle(category) {
    if (value.includes(category)) {
      onChange(value.filter((c) => c !== category));
    } else {
      onChange([...value, category]);
    }
  }

  return (
    <div className={styles.chipRow}>
      {INTEREST_CATEGORIES.map((category) => (
        <Chip key={category} label={category} selected={value.includes(category)} onClick={() => toggle(category)} />
      ))}
    </div>
  );
}
