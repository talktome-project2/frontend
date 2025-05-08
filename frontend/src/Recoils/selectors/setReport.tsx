import { reportedPersonType } from "../atoms/Report";
import { selector } from "recoil";

export const getReportedPerson = selector<reportedPersonType[]>({
  key: "getReportedPerson",
  get: async () => {
    const response = await fetch(
      "http://3.37.213.52:3000/manager/notify/index?page=1&size=20"
    );

    if (!response.ok) {
      throw new Error("데이터 불러오기에 실패했습니다");
    }

    const result = await response.json();
    return result.data as reportedPersonType[];
  },
});
