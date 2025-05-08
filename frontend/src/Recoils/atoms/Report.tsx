import { atom } from "recoil";

export type reportedPersonType = {
  id: number;
  request_id: number;
  member_id: number;
  device_id: string | null;
  reason: string;
  apply: number | string;
  blocked_at: string;
};

export const reportedPersonList = atom<reportedPersonType[]>({
  key: "reportedPersonList",
  default: [],
});
