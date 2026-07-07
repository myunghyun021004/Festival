// 시/도 - 구/군 - 동 계층 데이터 (전국 단위 UI, 현재는 강북권만 활성화)
// active: true 인 구/군만 실제 행사 데이터 및 동 선택이 제공됨

export const ACTIVE_CITY = "서울특별시";
export const ACTIVE_DISTRICTS = ["노원구", "도봉구"];

const 노원구_동 = ["상계동", "중계동", "하계동", "공릉동", "월계동"];
const 도봉구_동 = ["방학동", "쌍문동", "창동", "도봉동"];

// 우리 동네 필터에서 "인접 동"으로 취급할 이웃 관계 (프로토타입용 단순 인접 매핑)
export const ADJACENT_DONG = {
  상계동: ["중계동"],
  중계동: ["상계동", "하계동"],
  하계동: ["중계동", "공릉동"],
  공릉동: ["하계동", "월계동"],
  월계동: ["공릉동"],
  방학동: ["쌍문동"],
  쌍문동: ["방학동", "창동"],
  창동: ["쌍문동", "도봉동"],
  도봉동: ["창동"],
};

const 서울_자치구 = [
  { name: "노원구", active: true, dongs: 노원구_동 },
  { name: "도봉구", active: true, dongs: 도봉구_동 },
  { name: "강남구", active: false, dongs: [] },
  { name: "강동구", active: false, dongs: [] },
  { name: "강북구", active: false, dongs: [] },
  { name: "강서구", active: false, dongs: [] },
  { name: "관악구", active: false, dongs: [] },
  { name: "광진구", active: false, dongs: [] },
  { name: "구로구", active: false, dongs: [] },
  { name: "금천구", active: false, dongs: [] },
  { name: "동대문구", active: false, dongs: [] },
  { name: "동작구", active: false, dongs: [] },
  { name: "마포구", active: false, dongs: [] },
  { name: "서대문구", active: false, dongs: [] },
  { name: "서초구", active: false, dongs: [] },
  { name: "성동구", active: false, dongs: [] },
  { name: "성북구", active: false, dongs: [] },
  { name: "송파구", active: false, dongs: [] },
  { name: "양천구", active: false, dongs: [] },
  { name: "영등포구", active: false, dongs: [] },
  { name: "용산구", active: false, dongs: [] },
  { name: "은평구", active: false, dongs: [] },
  { name: "종로구", active: false, dongs: [] },
  { name: "중구", active: false, dongs: [] },
  { name: "중랑구", active: false, dongs: [] },
];

// 전국 단위로 넓게 제공하되, 서울 외 지역은 대표 구/군만 배치 (전부 준비 중)
export const REGION_DATA = [
  { city: "서울특별시", districts: 서울_자치구 },
  {
    city: "경기도",
    districts: [
      { name: "수원시", active: false, dongs: [] },
      { name: "성남시", active: false, dongs: [] },
      { name: "고양시", active: false, dongs: [] },
      { name: "용인시", active: false, dongs: [] },
    ],
  },
  {
    city: "인천광역시",
    districts: [
      { name: "연수구", active: false, dongs: [] },
      { name: "남동구", active: false, dongs: [] },
      { name: "부평구", active: false, dongs: [] },
    ],
  },
  {
    city: "부산광역시",
    districts: [
      { name: "해운대구", active: false, dongs: [] },
      { name: "부산진구", active: false, dongs: [] },
      { name: "동래구", active: false, dongs: [] },
    ],
  },
  {
    city: "대구광역시",
    districts: [
      { name: "수성구", active: false, dongs: [] },
      { name: "중구", active: false, dongs: [] },
    ],
  },
  {
    city: "광주광역시",
    districts: [
      { name: "서구", active: false, dongs: [] },
      { name: "북구", active: false, dongs: [] },
    ],
  },
  {
    city: "대전광역시",
    districts: [
      { name: "유성구", active: false, dongs: [] },
      { name: "서구", active: false, dongs: [] },
    ],
  },
  {
    city: "울산광역시",
    districts: [
      { name: "남구", active: false, dongs: [] },
      { name: "중구", active: false, dongs: [] },
    ],
  },
  {
    city: "세종특별자치시",
    districts: [{ name: "세종시", active: false, dongs: [] }],
  },
  {
    city: "강원특별자치도",
    districts: [
      { name: "춘천시", active: false, dongs: [] },
      { name: "원주시", active: false, dongs: [] },
    ],
  },
  {
    city: "충청북도",
    districts: [
      { name: "청주시", active: false, dongs: [] },
      { name: "충주시", active: false, dongs: [] },
    ],
  },
  {
    city: "충청남도",
    districts: [
      { name: "천안시", active: false, dongs: [] },
      { name: "아산시", active: false, dongs: [] },
    ],
  },
  {
    city: "전북특별자치도",
    districts: [
      { name: "전주시", active: false, dongs: [] },
      { name: "군산시", active: false, dongs: [] },
    ],
  },
  {
    city: "전라남도",
    districts: [
      { name: "목포시", active: false, dongs: [] },
      { name: "여수시", active: false, dongs: [] },
    ],
  },
  {
    city: "경상북도",
    districts: [
      { name: "포항시", active: false, dongs: [] },
      { name: "경주시", active: false, dongs: [] },
    ],
  },
  {
    city: "경상남도",
    districts: [
      { name: "창원시", active: false, dongs: [] },
      { name: "김해시", active: false, dongs: [] },
    ],
  },
  {
    city: "제주특별자치도",
    districts: [
      { name: "제주시", active: false, dongs: [] },
      { name: "서귀포시", active: false, dongs: [] },
    ],
  },
];

export function getDistricts(cityName) {
  const city = REGION_DATA.find((c) => c.city === cityName);
  return city ? city.districts : [];
}

export function getDongs(cityName, districtName) {
  const district = getDistricts(cityName).find((d) => d.name === districtName);
  return district ? district.dongs : [];
}

export function isActiveDistrict(cityName, districtName) {
  const district = getDistricts(cityName).find((d) => d.name === districtName);
  return !!district?.active;
}
