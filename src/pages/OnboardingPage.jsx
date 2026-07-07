import { useState } from "react";
import AgeGroupSelect from "../components/onboarding/AgeGroupSelect";
import RegionSelect from "../components/onboarding/RegionSelect";
import CompanionInput from "../components/onboarding/CompanionInput";
import InterestTags from "../components/onboarding/InterestTags";
import OptionalFields from "../components/onboarding/OptionalFields";
import ContactForm from "../components/common/ContactForm";
import { isActiveDistrict } from "../utils/regionData";
import styles from "./pages.module.css";

const initialProfile = {
  ageGroup: "",
  region: { city: "", district: "", dong: "" },
  companions: { hasCompanion: undefined, companionAgeGroups: [] },
  interests: [],
  optional: {},
};

export default function OnboardingPage({ onSubmit }) {
  const [profile, setProfile] = useState(initialProfile);

  const { ageGroup, region, companions, interests, optional } = profile;

  const isRegionComplete =
    !!region.city && !!region.district && isActiveDistrict(region.city, region.district) && !!region.dong;
  const isCompanionComplete =
    companions.hasCompanion === false || (companions.hasCompanion === true && companions.companionAgeGroups.length > 0);
  const isFormValid = !!ageGroup && isRegionComplete && isCompanionComplete && interests.length > 0;

  function handleSubmit() {
    if (!isFormValid) return;
    onSubmit({
      ageGroup,
      region,
      companions,
      interests,
      ...optional,
    });
  }

  return (
    <div className={styles.container}>
      <p className={styles.hero}>나와 우리 가족에게 맞는 동네 행사를 찾아드려요</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>본인 나이대</h2>
        <AgeGroupSelect value={ageGroup} onChange={(v) => setProfile((p) => ({ ...p, ageGroup: v }))} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>사는 지역</h2>
        <RegionSelect value={region} onChange={(v) => setProfile((p) => ({ ...p, region: v }))} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>동반자 여부</h2>
        <CompanionInput
          hasCompanion={companions.hasCompanion}
          companionAgeGroups={companions.companionAgeGroups}
          onChangeHasCompanion={(v) =>
            setProfile((p) => ({ ...p, companions: { ...p.companions, hasCompanion: v, companionAgeGroups: v ? p.companions.companionAgeGroups : [] } }))
          }
          onChangeCompanionAges={(v) => setProfile((p) => ({ ...p, companions: { ...p.companions, companionAgeGroups: v } }))}
        />
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>관심 카테고리 (최소 1개)</h2>
        <InterestTags value={interests} onChange={(v) => setProfile((p) => ({ ...p, interests: v }))} />
      </section>

      <section className={styles.section}>
        <OptionalFields value={optional} onChange={(v) => setProfile((p) => ({ ...p, optional: v }))} />
      </section>

      <button type="button" className={styles.ctaButton} disabled={!isFormValid} onClick={handleSubmit}>
        행사 추천받기
      </button>

      <ContactForm />
    </div>
  );
}
