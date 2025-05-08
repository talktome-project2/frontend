import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { memberInfo } from "../../Recoils/atoms/MemberDeatilAtom";

type Friend = {
  id: string;
  email: string;
};
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* 요소 사이 간격 */
`;
const DBBoard = styled.div`
  height: 300px;

  margin: auto;
`;
type Props = {
  SearchId?: string;
};
const MemberDetailDBTable = ({ SearchId }: Props) => {
  const navigate = useNavigate();
  const memberInformation = useRecoilValue(memberInfo);
  const [rows, setRows] = useState<Friend[]>([]);
  const [totalFriends, setTotalFriends] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const targetId = SearchId || memberInformation.id;

    if (!targetId) return;
    let response;
    const fetchData = async () => {
      try {
        if (SearchId) {
          response = await fetch(
            `http://3.37.213.52:3000/manager/friend/accept/${encodeURIComponent(
              SearchId
            )}`
          );
        } else {
          response = await fetch(
            `http://3.37.213.52:3000/manager/friend/accept/${encodeURIComponent(
              memberInformation.id
            )}`
          );
        }
        const data = await response.json();
        const result = data.data;
        console.log(result);

        if (Array.isArray(result)) {
          console.log("result " + result);
          const formattedRows = result.map((item) => ({
            id: item.member_id,
            email: item.email,
          }));
          setRows(formattedRows);
        } else {
          setRows([]);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setRows([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memberInformation, SearchId]);

  useEffect(() => {
    setTotalFriends(rows.length);
  }, [rows]); // ✅ rows 변경 시 친구 수 업데이트

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 100 },
    { field: "email", headerName: "email", width: 300 },
    {
      field: "detail",
      headerName: "상세보기",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate(`/memberDetail/${params.row.id}`)}
        >
          상세
        </Button>
      ),
    },
  ];

  return (
    <PageContainer>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        친구 리스트 (총 {totalFriends}명)
      </Typography>
      <DBBoard>
        {isLoading ? (
          <Typography sx={{ textAlign: "center", color: "gray" }}>
            친구 리스트 정보가 없습니다
          </Typography>
        ) : (
          <DataGrid rows={rows} columns={columns} loading={isLoading} />
        )}
      </DBBoard>
    </PageContainer>
  );
};

export default MemberDetailDBTable;
