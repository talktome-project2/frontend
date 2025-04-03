import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Typography, CircularProgress } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { memberInfo } from "../../Recoils/atoms/MemberDeatilAtom";
import { useRecoilValue } from "recoil";

type Friend = {
  id: string;
  email: string;
};

const rows: Friend[] = [
  { id: "1", email: "example1@email.com" },
  { id: "2", email: "example2@email.com" },
];

const DBBoard = styled.div`
  height: 300px;
  width: 60vh;
  margin: auto;
`;

const BlockedMe = () => {
  const navigate = useNavigate();
  const memberInformation = useRecoilValue(memberInfo);
  const [rows, setRows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!memberInformation.id) {
      console.log("memberInformation.id 없음, 데이터 요청 취소");
      return;
    }

    console.log("memberInformation Id : " + memberInformation.id);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://54.180.234.254:3000/manager/friend/block/other/${encodeURIComponent(
            memberInformation.id
          )}`
        );
        const data = await response.json();
        const result = data.data;
        console.log("받은 데이터 BlockedMe  :", result);

        if (Array.isArray(result)) {
          const formattedRows = result.map((item, index) => ({
            id: item.id, // ✅ member_id가 없으면 `temp-index` 사용
            email: item.email,
          }));
          setRows(formattedRows);
        } else {
          setRows([]);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memberInformation]); // ✅ memberInformation이 변경될 때마다 실행

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "detail",
      headerName: "상세보기",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate(`/friend/${params.row.id}`)}
        >
          상세
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        내가 차단한 사람 (총 {rows.length}명)
      </Typography>

      <DBBoard>
        {isLoading ? (
          <CircularProgress sx={{ display: "block", margin: "auto" }} />
        ) : (
          <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} />
        )}
      </DBBoard>
    </div>
  );
};

export default BlockedMe;
