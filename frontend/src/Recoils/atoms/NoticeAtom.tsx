import { atom } from "recoil";

export type NoticeType = {
  id: number;
  title: String;
  content: String;
  open: number;
  created_at: String;
};

export const NoticeList = atom<NoticeType[]>({
  key: "NoticeList",
  default: [],
});
