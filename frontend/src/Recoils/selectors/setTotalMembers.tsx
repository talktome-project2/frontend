import { selector, useRecoilValue } from "recoil";
import { selectedResult, Member } from "../atoms/MemberDBSelectAtom";
import { useEffect } from "react";

export const allMemberInfo = selector<Member[]>({
  key: "allMemberInfo",
  get: async ({ }) => {
    try {
      const numberData = await fetch(
        "http://3.37.213.52:3000/manager/count/member"
      );
      if (!numberData.ok) {
        throw new Error(`HTTP error! status: ${numberData.status}`);
      }
      const numberJson = await numberData.json();
      const totalNumber = numberJson.data[0].total;

      const response = await fetch(
        `http://3.37.213.52:3000/manager/feed?size=${totalNumber}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      const data = result.data;

      if (!Array.isArray(data)) {
        console.error("❌ API에서 받은 데이터가 배열이 아님:", data);
        return [];
      }

      return data.map((member) => ({
        id: member.id.toString(),
        email: member.email,
        age: member.age,
        nickname: member.nickname,
        gender: member.gender,
        region: member.region,
        platform: member.platform,
        joinDate: member.created_at.split("T")[0],
        friends: member.friend_count,
      }));
    } catch (error) {
      console.error("❌ API 요청 실패:", error);
      return [];
    }
  },
});

const isAgeMatch = (memberAge: number, filterAge: string): boolean => {
  if (filterAge === "전체") return true;
  if (filterAge === "20대") return memberAge >= 20 && memberAge < 30;
  if (filterAge === "30대") return memberAge >= 30 && memberAge < 40;
  if (filterAge === "40대") return memberAge >= 40 && memberAge < 50;
  if (filterAge === "50대") return memberAge >= 50 && memberAge < 60;
  if (filterAge === "60대") return memberAge >= 60;
  return false;
};

const isDateMatch = (
  memberJoinDate: string,
  startDate: string,
  endDate: string
): boolean => {
  if (startDate === "today") {
    const today = new Date().toISOString().split("T")[0];
    return memberJoinDate === today;
  }
  return memberJoinDate >= startDate && memberJoinDate <= endDate;
};

export const selectedMembers = selector<Member[]>({
  key: "selectedMembers",
  get: ({ get }) => {
    const members = get(allMemberInfo);
    const filters = get(selectedResult);

    return members.filter((member) => {
      const ageMatch = isAgeMatch(member.age, filters.age);
      const locationMatch =
        filters.location === "전체" || member.region === filters.location;
      const genderMatch =
        filters.gender === "전체" || member.gender === filters.gender;
      const platformMatch =
        filters.platform === "전체" || member.platform === filters.platform;
      const dateMatch = isDateMatch(
        member.joinDate,
        filters.startDate,
        filters.endDate
      );

      return (
        ageMatch && locationMatch && genderMatch && platformMatch && dateMatch
      );
    });
  },
});
