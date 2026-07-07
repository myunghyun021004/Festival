import Chip from "../common/Chip";
import { AGE_GROUPS } from "../../utils/constants";
import styles from "./onboarding.module.css";

export default function AgeGroupSelect({ value, onChange }) {
  return (
    <div className={styles.chipRow}>
      {AGE_GROUPS.map((age) => (
        <Chip key={age} label={age} selected={value === age} onClick={() => onChange(age)} size="lg" />
      ))}
    </div>
  );
}
