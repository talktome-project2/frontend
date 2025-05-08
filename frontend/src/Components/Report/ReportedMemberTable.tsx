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
const DBBoard = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ReportedMemberTable = () => {
  const reportedLoadable = useRecoilValueLoadable(getReportedPerson);

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
                  <Button variant="outlined" color="primary" size="small">
                    상세보기
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" size="small">
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
