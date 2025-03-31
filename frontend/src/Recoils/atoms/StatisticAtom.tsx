import { atom } from "recoil";

export type platform = {
  android: number;
  ios: number;
};

export type gender = {
  male: number;
  female: number;
};

export type IAge = {
  "20대": number;
  "30대": number;
  "40대": number;
  "50대": number;
  "60대": number;
};

export type Region = {
  Seoul: number;
  Busan: number;
  Daegu: number;
  Incheon: number;
  Gwangju: number;
  Daejeon: number;
  Ulsan: number;
  Sejong: number;
  Gyeonggi: number;
  Gangwon: number;
  Chungbuk: number;
  Chungnam: number;
  Jeonbuk: number;
  Jeonnam: number;
  Gyeongbuk: number;
  Gyeongnam: number;
  Jeju: number;
  Overseas: number;
};

export const platformCount = atom<platform>({
  key: "platformCount",
  default: {
    android: 0,
    ios: 0,
  },
});

export const genderCount = atom<gender>({
  key: "genderCount",
  default: {
    male: 0,
    female: 0,
  },
});

export const ageCount = atom<IAge>({
  key: "ageCount",
  default: {
    "20대": 0,
    "30대": 0,
    "40대": 0,
    "50대": 0,
    "60대": 0,
  },
});

export const regionCount = atom<Region>({
  key: "regionCount",
  default: {
    Seoul: 0,
    Busan: 0,
    Daegu: 0,
    Incheon: 0,
    Gwangju: 0,
    Daejeon: 0,
    Ulsan: 0,
    Sejong: 0,
    Gyeonggi: 0,
    Gangwon: 0,
    Chungbuk: 0,
    Chungnam: 0,
    Jeonbuk: 0,
    Jeonnam: 0,
    Gyeongbuk: 0,
    Gyeongnam: 0,
    Jeju: 0,
    Overseas: 0,
  },
});
