import { useState } from "react";
import Chip from "../common/Chip";
import { PREFERRED_TIMES, COST_PREFERENCES, TRANSPORTS } from "../../utils/constants";
import styles from "./onboarding.module.css";

export default function OptionalFields({ value, onChange }) {
  const [open, setOpen] = useState(false);

  function update(patch) {
    onChange({ ...value, ...patch });
  }

  return (
    <div className={styles.accordion}>
      <button type="button" className={styles.accordionHeader} onClick={() => setOpen((o) => !o)}>
        <span>더 정확한 추천을 원하시면 (선택)</span>
        <span className={styles.accordionIcon}>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className={styles.accordionBody}>
          <div className={styles.optionalRow}>
            <p className={styles.subLabel}>선호 요일/시간대</p>
            <div className={styles.chipRow}>
              {PREFERRED_TIMES.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  selected={value.preferredTime === t}
                  onClick={() => update({ preferredTime: value.preferredTime === t ? undefined : t })}
                  size="sm"
                />
              ))}
            </div>
          </div>

          <div className={styles.optionalRow}>
            <p className={styles.subLabel}>비용 선호</p>
            <div className={styles.chipRow}>
              {COST_PREFERENCES.map((c) => (
                <Chip
                  key={c}
                  label={c}
                  selected={value.costPreference === c}
                  onClick={() => update({ costPreference: value.costPreference === c ? undefined : c })}
                  size="sm"
                />
              ))}
            </div>
          </div>

          <div className={styles.optionalRow}>
            <p className={styles.subLabel}>이동 수단</p>
            <div className={styles.chipRow}>
              {TRANSPORTS.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  selected={value.transport === t}
                  onClick={() => update({ transport: value.transport === t ? undefined : t })}
                  size="sm"
                />
              ))}
            </div>
          </div>

          <div className={styles.optionalRow}>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={!!value.withPet}
                onChange={(e) => update({ withPet: e.target.checked })}
              />
              반려동물과 함께 해요
            </label>
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={!!value.accessibilityNeeded}
                onChange={(e) => update({ accessibilityNeeded: e.target.checked })}
              />
              거동이 불편하거나 유모차 접근성이 필요해요
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
