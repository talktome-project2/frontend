import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { useRecoilValueLoadable } from "recoil";
import { getReportedPerson } from "../../Recoils/selectors/setReport";
import { useNavigate } from "react-router-dom";
const DBBoard = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const handleApply = async (id: any) => {
  const confirmed = window.confirm("신고를 적용하시겠습니까?");
  if (!confirmed) return;
  try {
    const response = await fetch(
      
      `http://3.37.213.52:3000/manager/apply/notify/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const result = await response.json();
    alert("적용이 완료되었습니다.");
    console.log("서버 응답:", result);
  } catch (error) {
    console.error("적용 중 에러:", error);
    alert("적용 중 오류가 발생했습니다.");
  }
};

const ReportedMemberTable = () => {
  const reportedLoadable = useRecoilValueLoadable(getReportedPerson);
  const navigate = useNavigate();
  if (reportedLoadable.state === "loading") return <div>로딩 중...</div>;
  if (reportedLoadable.state === "hasError") return <div>에러 발생</div>;

  const data = reportedLoadable.contents;

  return (
    <>
      <DBBoard>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
        >
          신고 인원
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>신고한 사람</TableCell>
              <TableCell>신고당한 사람</TableCell>
              <TableCell>이유</TableCell>
              <TableCell>적용</TableCell>
              <TableCell>신고한 날짜</TableCell>
              <TableCell>상세보기</TableCell>
              <TableCell>적용하기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.request_id}</TableCell>
                <TableCell>{item.member_id}</TableCell>
                <TableCell>{item.reason}</TableCell>
                <TableCell>{item.apply === 1 ? "적용됨" : "미적용"}</TableCell>
                <TableCell>{item.blocked_at}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/reports/${item.id}`)}
                  >
                    상세보기
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleApply(item.request_id)}
                  >
                    적용하기
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DBBoard>
    </>
  );
};

export default ReportedMemberTable;
