import Chip from "../common/Chip";
import { AGE_GROUPS } from "../../utils/constants";
import styles from "./onboarding.module.css";

export default function CompanionInput({ hasCompanion, companionAgeGroups, onChangeHasCompanion, onChangeCompanionAges }) {
  function toggleCompanionAge(age) {
    if (companionAgeGroups.includes(age)) {
      onChangeCompanionAges(companionAgeGroups.filter((a) => a !== age));
    } else {
      onChangeCompanionAges([...companionAgeGroups, age]);
    }
  }

  return (
    <div>
      <div className={styles.bigButtonRow}>
        <button
          type="button"
          className={`${styles.bigButton} ${hasCompanion === true ? styles.bigButtonSelected : ""}`}
          onClick={() => onChangeHasCompanion(true)}
        >
          있음
        </button>
        <button
          type="button"
          className={`${styles.bigButton} ${hasCompanion === false ? styles.bigButtonSelected : ""}`}
          onClick={() => onChangeHasCompanion(false)}
        >
          없음
        </button>
      </div>

      {hasCompanion && (
        <div className={styles.expandPanel}>
          <p className={styles.subLabel}>동반자 나이대 (중복 선택 가능)</p>
          <div className={styles.chipRow}>
            {AGE_GROUPS.map((age) => (
              <Chip
                key={age}
                label={age}
                selected={companionAgeGroups.includes(age)}
                onClick={() => toggleCompanionAge(age)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
