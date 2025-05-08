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
import { getNoticeList } from "../../Recoils/selectors/setNotice";
import { NoticeType } from "../../Recoils/atoms/NoticeAtom";
const DBBoard = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoticeTable = () => {
  const reportedLoadable = useRecoilValueLoadable(getNoticeList);
  if (reportedLoadable.state === "loading") return <div>로딩 중...</div>;
  if (reportedLoadable.state === "hasError") return <div>에러 발생</div>;
  const data = reportedLoadable.contents;
  return (
    <DBBoard>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
      >
        공지사항
      </Typography>
      <Table>
        <TableHead>
          <TableCell>ID</TableCell>
          <TableCell>제목</TableCell>
          <TableCell>공지내용</TableCell>
          <TableCell>공개</TableCell>
          <TableCell>공지한 날짜</TableCell>
          <TableCell>상세 보기</TableCell>
          <TableCell>적용 토글</TableCell>
        </TableHead>
        <TableBody>
          {data.map((item: NoticeType) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.message}</TableCell>
              <TableCell>{item.open}</TableCell>
              <TableCell>{item.created_at}</TableCell>
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
  );
};

export default NoticeTable;
