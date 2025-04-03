import { atom } from "recoil";

export type ImemberInfo = {
  id: string;
  email: string;
};

export const memberInfo = atom<ImemberInfo>({
  key: "memberInfo",
  default: {
    id: "",
    email: "",
  },
});
