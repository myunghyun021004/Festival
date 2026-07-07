// 프로필 vs 행사 매칭 로직 (Phase 1: 규칙 기반 필터 + 가중치 점수)
import { ADJACENT_DONG } from "./regionData";

function getCompanionAgeGroups(profile) {
  if (!profile.companions?.hasCompanion) return [];
  return profile.companions.companionAgeGroups ?? [];
}

function ageMatches(event, ageGroup) {
  if (!ageGroup) return false;
  return event.targetAges?.includes("전연령") || event.targetAges?.includes(ageGroup);
}

// 1차 필터: 거리 (도보 / 우리 동네 / 우리 구)
export function filterByDistance(events, profile, distanceKey) {
  const { district, dong } = profile.region ?? {};
  if (!district) return [];

  return events.filter((event) => {
    if (event.district !== district) return false;
    if (distanceKey === "district") return true;
    if (distanceKey === "neighborhood") {
      if (event.dong === dong) return true;
      return (ADJACENT_DONG[dong] ?? []).includes(event.dong);
    }
    // walk (도보 거리): 같은 동만
    return event.dong === dong;
  });
}

// 1차 필터: 관심 카테고리
export function filterByCategories(events, categories) {
  if (!categories || categories.length === 0) return events;
  return events.filter((event) => categories.includes(event.category));
}

// 2차 점수: 소프트 스코어링
export function scoreEvent(profile, event) {
  let score = 0;

  if (ageMatches(event, profile.ageGroup)) score += 2;

  const companionAges = getCompanionAgeGroups(profile);
  const matchedCompanionAges = companionAges.filter((age) => ageMatches(event, age));
  score += matchedCompanionAges.length * 2;

  if (profile.costPreference === "무료만" && event.isFree) score += 1;
  if (profile.costPreference === "유료포함") score += 0.5;
  if (profile.withPet && event.petFriendly) score += 1;
  if (profile.accessibilityNeeded && event.accessibilityInfo) score += 1;

  return score;
}

// 조합별 추천 배지 문구
const COMBO_REASONS = {
  "60대이상+어린이": "손자·손녀와 함께 가기 좋아요",
  "60대이상+영유아": "손주와 함께 나들이하기 좋아요",
  "20-30대+영유아": "어린 자녀와 함께하기 좋아요",
  "20-30대+어린이": "아이와 함께하기 좋은 행사예요",
  "40-50대+청소년": "자녀와 함께하기 좋은 행사예요",
  "40-50대+어린이": "자녀와 함께하기 좋은 행사예요",
};

function comboKey(ageA, ageB) {
  return [ageA, ageB].sort().join("+");
}

export function getMatchReason(profile, event) {
  const companionAges = getCompanionAgeGroups(profile);
  const selfMatch = ageMatches(event, profile.ageGroup);
  const matchedCompanionAges = companionAges.filter((age) => ageMatches(event, age));

  if (selfMatch && matchedCompanionAges.length > 0) {
    for (const companionAge of matchedCompanionAges) {
      const key = comboKey(profile.ageGroup, companionAge);
      if (COMBO_REASONS[key]) return COMBO_REASONS[key];
    }
    return "우리 일행 모두에게 잘 맞는 행사예요";
  }

  if (matchedCompanionAges.length > 0) {
    return "동반자와 함께 가기 좋아요";
  }

  if (selfMatch) {
    return `${profile.ageGroup}에게 잘 맞는 행사예요`;
  }

  if (event.targetAges?.includes("전연령")) {
    return "누구와 함께해도 좋은 행사예요";
  }

  return null;
}

// 최종 추천 리스트: 필터 + 정렬
export function getRecommendations(events, profile, { distanceKey, categories }) {
  const filtered = filterByCategories(filterByDistance(events, profile, distanceKey), categories);

  return filtered
    .map((event) => ({
      event,
      score: scoreEvent(profile, event),
      reason: getMatchReason(profile, event),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.event.startDate) - new Date(b.event.startDate);
    });
}
