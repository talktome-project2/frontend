import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";
import { Typography, CircularProgress } from "@mui/material";
import { useRecoilValue } from "recoil";
import { selectedResult } from "../../Recoils/atoms/MemberDBSelectAtom";
import { allMemberInfo } from "../../Recoils/selectors/setTotalMembers";

type Member = {
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

const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 100 },
  { field: "email", headerName: "email", width: 150 },
  { field: "nickname", headerName: "닉네임", width: 150 },
  { field: "age", headerName: "나이", width: 80 },
  { field: "gender", headerName: "성별", width: 80 },
  { field: "region", headerName: "지역", width: 80 },
  { field: "platform", headerName: "platform", width: 80 },
  { field: "joinDate", headerName: "가입날짜", width: 100 },
  { field: "friends", headerName: "친구 수", width: 80 },
];

const DBBoard = styled.div`
  height: 300;
  width: 95%;
`;

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

const MemberDBTable = () => {
  const filters = useRecoilValue(selectedResult);
  const totalMember = useRecoilValue(allMemberInfo);
  console.log("totalMembers : ", totalMember);

  // 로딩 상태 확인
  if (totalMember.length === 0) {
    return <CircularProgress />; // 로딩 중 표시
  }

  const filteredMembers = totalMember.filter((member) => {
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

  console.log("filtered members : ", filteredMembers);

  return (
    <>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        전체 인원 (총 {totalMember.length}명)
      </Typography>
      <DBBoard>
        <DataGrid rows={filteredMembers} columns={columns} />
      </DBBoard>
    </>
  );
};

export default MemberDBTable;
