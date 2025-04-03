import { atom } from "recoil";

export type IselctionType = {
  age: string;
  location: string;
  gender: string;
  platform: string;
  startDate: string;
  endDate: string;
};

export const selectedResult = atom<IselctionType>({
  key: "memberInfo",
  default: {
    age: "전체",
    location: "전체",
    gender: "전체",
    platform: "전체",
    startDate: "today",
    endDate: "today",
  },
});

export type Member = {
  id: string;
  email: string;
  nickname: string;
  age: number;
  gender: string;
  region: string;
  platform: string;
  joinDate: string;
  friends: number;
};

export const allMembers = atom<Member[]>({
  key: "allMembers",
  default: [],
});
