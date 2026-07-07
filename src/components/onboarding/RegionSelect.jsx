import { REGION_DATA, getDistricts, getDongs, isActiveDistrict, ACTIVE_CITY, ACTIVE_DISTRICTS } from "../../utils/regionData";
import styles from "./onboarding.module.css";

export default function RegionSelect({ value, onChange }) {
  const { city, district, dong } = value;
  const districts = city ? getDistricts(city) : [];
  const dongs = city && district ? getDongs(city, district) : [];
  const showInactiveNotice = district && !isActiveDistrict(city, district);

  function handleCity(newCity) {
    onChange({ city: newCity, district: "", dong: "" });
  }

  function handleDistrict(newDistrict) {
    onChange({ city, district: newDistrict, dong: "" });
  }

  function handleDong(newDong) {
    onChange({ city, district, dong: newDong });
  }

  function jumpToActiveRegion() {
    onChange({ city: ACTIVE_CITY, district: "", dong: "" });
  }

  return (
    <div className={styles.regionSelect}>
      <select className={styles.select} value={city} onChange={(e) => handleCity(e.target.value)}>
        <option value="" disabled>
          시/도 선택
        </option>
        {REGION_DATA.map((c) => (
          <option key={c.city} value={c.city}>
            {c.city}
          </option>
        ))}
      </select>

      {city && (
        <select className={styles.select} value={district} onChange={(e) => handleDistrict(e.target.value)}>
          <option value="" disabled>
            구/군 선택
          </option>
          {districts.map((d) => (
            <option key={d.name} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      )}

      {district && !showInactiveNotice && (
        <select className={styles.select} value={dong} onChange={(e) => handleDong(e.target.value)}>
          <option value="" disabled>
            동 선택
          </option>
          {dongs.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      )}

      {showInactiveNotice && (
        <div className={styles.notice}>
          <p>
            아직 이 지역 정보는 준비 중이에요.
            <br />
            {ACTIVE_DISTRICTS.join("·")} 지역 정보부터 만나보세요.
          </p>
          <button type="button" className={styles.noticeButton} onClick={jumpToActiveRegion}>
            {ACTIVE_CITY} 보기
          </button>
        </div>
      )}
    </div>
  );
}
