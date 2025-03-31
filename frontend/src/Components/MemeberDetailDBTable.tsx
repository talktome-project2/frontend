import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";

type Friend = {
  id: string;
  email: string;
};

const rows: Friend[] = [
  {
    id: "1",
    email: "example1@email.com",
  },
  {
    id: "2",
    email: "example2@email.com",
  },
];

const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 100 },
  { field: "email", headerName: "email", width: 300 },
  { field: "detail", headerName: "상세보기", width: 100 },
];

const DBBoard = styled.div`
  height: 300;
  width: 95%;
`;

const MemberDetailDBTable = () => {
  return (
    <DBBoard>
      <DataGrid rows={rows} columns={columns} />
    </DBBoard>
  );
};

export default MemberDetailDBTable;
