import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";

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

const rows: Member[] = [
  {
    id: "a",
    email: "example1@gmail.com",
    nickname: "nick1",
    age: 20,
    gender: "남",
    region: "서울",
    platform: "ios",
    joinDate: "2024.03.02",
    friends: 20,
  },
  {
    id: "b",
    email: "example2@gmail.com",
    nickname: "nick2",
    age: 20,
    gender: "남",
    region: "경기",
    platform: "ios",
    joinDate: "2024.03.04",
    friends: 20,
  },
];

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
const MemberDBTable = () => {
  return (
    <DBBoard>
      <DataGrid rows={rows} columns={columns} />
    </DBBoard>
  );
};

export default MemberDBTable;
