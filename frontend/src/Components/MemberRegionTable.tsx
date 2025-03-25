import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";

const rows: GridRowsProp = [
  {
    id: 1,
    Seoul: 1,
    Busan: 2,
    Daegu: 3,
    Incheon: 4,
    Gwangju: 5,
    Daejeon: 6,
    Ulsan: 7,
    Sejong: 8,
    Gyeonggi: 9,
    Gangwon: 10,
    Chungbuk: 11,
    Chungnam: 12,
    Jeonbuk: 13,
    Jeonnam: 14,
    Gyeongbuk: 15,
    Gyeongnam: 16,
    Jeju: 17,
    Overseas: 18,
  },
];

const columns: GridColDef[] = [
  { field: "Seoul", headerName: "서울", width: 50 },
  { field: "Busan", headerName: "부산", width: 50 },
  { field: "Daegu", headerName: "대구", width: 50 },
  { field: "Incheon", headerName: "인천", width: 50 },
  { field: "Gwangju", headerName: "광주", width: 50 },
  { field: "Daejeon", headerName: "대전", width: 50 },
  { field: "Ulsan", headerName: "울산", width: 50 },
  { field: "Sejong", headerName: "세종", width: 50 },
  { field: "Gyeonggi", headerName: "경기", width: 50 },
  { field: "Gangwon", headerName: "강원", width: 50 },
  { field: "Chungbuk", headerName: "충북", width: 50 },
  { field: "Chungnam", headerName: "충남", width: 50 },
  { field: "Jeonbuk", headerName: "전북", width: 50 },
  { field: "Jeonnam", headerName: "전남", width: 50 },
  { field: "Gyeongbuk", headerName: "경북", width: 50 },
  { field: "Gyeongnam", headerName: "경남", width: 50 },
  { field: "Jeju", headerName: "제주", width: 50 },
  { field: "Overseas", headerName: "해외", width: 50 },
];

const DBBoard = styled.div`
  height: 300;
  width: 80%;
`;

const RegionStaticTable = () => {
  return (
    <DBBoard>
      <DataGrid rows={rows} columns={columns} />
    </DBBoard>
  );
};

export default RegionStaticTable;
