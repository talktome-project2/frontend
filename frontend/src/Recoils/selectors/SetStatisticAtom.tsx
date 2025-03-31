import { selector } from "recoil";
import {
  ageCount,
  genderCount,
  platformCount,
  regionCount,
} from "../atoms/StatisticAtom";

// 연령대별 값을 받아와서 ageCount atom을 업데이트하는 selector
export const ageGroupCount = selector({
  key: "ageGroupCount",
  get: async () => {
    const ageGroups = ["20대", "30대", "40대", "50대", "60대"];
    const counts: { [key: string]: number } = {}; // key: string, value: number 형태로 타입 정의
    // 각 연령대별 API 호출
    for (const ageGroup of ageGroups) {
      const response = await fetch(
        `http://54.180.234.254:3000/manager/count/age?age=${encodeURIComponent(
          ageGroup
        )}`
      );
      const result = await response.json();
      const count = result.data[0]["count(*)"];
      counts[ageGroup] = count; // counts 객체에 연령대별 카운트 저장
    }

    return counts; // 모든 연령대의 카운트를 포함한 객체 반환
  },
  set: ({ set }, newValue) => {
    // 반환된 counts를 받아서 ageCount atom에 업데이트
    set(ageCount, (prevAgeCount) => ({
      ...prevAgeCount, // 기존 값 유지
      ...newValue, // 새로운 값으로 업데이트
    }));
  },
});

export const genderGroupCount = selector({
  key: "genderGroupCount",
  get: async () => {
    const genderGroups = ["man", "woman"];
    const counts: { [key: string]: number } = {}; // key: string, value: number 형태로 타입 정의
    for (const genderGroup of genderGroups) {
      const response = await fetch(
        `http://54.180.234.254:3000/manager/count/${encodeURIComponent(
          genderGroup
        )}`
      );
      const result = await response.json();
      const count = result.data[0]["count(*)"];
      counts[genderGroup] = count; // counts 객체에 연령대별 카운트 저장
    }

    return counts; // 모든 연령대의 카운트를 포함한 객체 반환
  },
  set: ({ set }, newValue) => {
    // 반환된 counts를 받아서 ageCount atom에 업데이트
    set(genderCount, (prevGenderCount) => ({
      ...prevGenderCount, // 기존 값 유지
      ...newValue, // 새로운 값으로 업데이트
    }));
  },
});

export const platformGroupCount = selector({
  key: "platformGroupCount",
  get: async () => {
    const platformGroups = ["android", "ios"];
    const counts: { [key: string]: number } = {};

    for (const platform of platformGroups) {
      const response = await fetch(
        `http://54.180.234.254:3000/manager/count/${encodeURIComponent(
          platform
        )}`
      );
      const result = await response.json();
      const count = result.data[0]["count(*)"];
      counts[platform] = count; // counts 객체에 카운트 저장
    }

    return counts; // 모든 플랫폼에 대한 카운트 반환
  },
  set: ({ set }, newValue) => {
    // platformCount atom을 업데이트
    set(platformCount, (prevPlatformCount) => ({
      ...prevPlatformCount, // 기존 값 유지
      ...newValue, // 새로운 값으로 업데이트
    }));
  },
});

export const regionGroupCount = selector({
  key: "regionGroupCount",
  get: async () => {
    const regionGroups = [
      { atom: "Seoul", urlKey: "서울" },
      { atom: "Busan", urlKey: "부산" },
      { atom: "Daegu", urlKey: "대구" },
      { atom: "Incheon", urlKey: "인천" },
      { atom: "Gwangju", urlKey: "광주" },
      { atom: "Daejeon", urlKey: "대전" },
      { atom: "Ulsan", urlKey: "울산" },
      { atom: "Sejong", urlKey: "세종" },
      { atom: "Gyeonggi", urlKey: "경기" },
      { atom: "Gangwon", urlKey: "강원" },
      { atom: "Chungbuk", urlKey: "충북" },
      { atom: "Chungnam", urlKey: "충남" },
      { atom: "Jeonbuk", urlKey: "전북" },
      { atom: "Jeonnam", urlKey: "전남" },
      { atom: "Gyeongbuk", urlKey: "경북" },
      { atom: "Gyeongnam", urlKey: "경남" },
      { atom: "Jeju", urlKey: "제주" },
      { atom: "Overseas", urlKey: "해외" },
    ];

    const counts: { [key: string]: number } = {};
    for (const region of regionGroups) {
      const response = await fetch(
        `http://54.180.234.254:3000/manager/count/region?region=${encodeURIComponent(
          region.urlKey
        )}`
      );
      const result = await response.json();
      const count = result.data[0]["count(*)"];
      counts[region.atom] = count; // counts 객체에 연령대별 카운트 저장
    }

    return counts; // 모든 연령대의 카운트를 포함한 객체 반환
  },
  set: ({ set }, newValue) => {
    // 반환된 counts를 받아서 ageCount atom에 업데이트
    set(regionCount, (prevRegionCount) => ({
      ...prevRegionCount, // 기존 값 유지
      ...newValue, // 새로운 값으로 업데이트
    }));
  },
});
